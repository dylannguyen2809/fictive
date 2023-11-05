import time
import json
import os
import re
import openai
from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = 'new'  # Replace with your actual secret key for session management
openai.api_key = os.getenv("DALLE_API_KEY")

if not openai.api_key:
    print (('error: API key not found'), 403)

@app.route('/')
def index():
    session.pop('chat_log', None)  # Reset the chat session for the user
    return render_template('index.html')

@app.route('/start_adventure', methods=['POST'])
def start_adventure():
    data = request.get_json()  # Use request.get_json() to parse JSON data
    print(data)
    name = data.get('name')
    gender = data.get('gender')
    genre = data.get('genre')
    appearance = data.get('appearance')
    language = data.get('language')
    purpose = data.get('purpose')

    # The first message to the model setting up the context
    system_message = {
        "role": "system",
    "content": "You are a helpful AI creating a story in the genre of {genre}, with the purpose of {purpose}. Please format your response with the chapter name, then newline  followed by the story text. Then 'Choices:' followed by the list of choices. End with 'End.' Use 100 words or less per chapter."
    }

    # The user message with the initial story setup
    user_message = {
        "role": "user",
        "content": f"Start a story about a character named {name} whose gender is {gender} in the genre {genre}. They are {appearance}. Please create a story in the specified genre. Please format your response with the chapter name,  followed by the story text. Then 'Choices:' followed by the list of choices. End with 'End."
    }

    messages = [system_message, user_message]

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages
    )

    session['chat_log'] = response['choices'][0]['message']['content']
    return jsonify(parse_story(session['chat_log']))

@app.route('/continue_adventure', methods=['POST'])
def continue_adventure():
    data = request.get_json()
    print(data)
    user_input = data.get('choice')

    # Retrieve the full chat log from the session
    chat_log = session.get('chat_log')

    # Construct a new user message with the user's input
    user_message = {
        "role": "user",
        "content": user_input
    }

    # Send the full chat log along with the new user message to GPT
    response = openai.ChatCompletion.create(
        model="gpt-4",  # make sure to use "gpt-4" if that's what you've been using
        messages=[{"role": "system", "content": "You are a helpful AI creating a story in the genre of {genre}, with the purpose of {purpose}. Please format your response with the chapter name, then newline  followed by the story text. Then 'Choices:' followed by the list of choices. End with 'End.' Use 100 words or less per chapter."}, {"role": "user", "content": chat_log}, user_message]
    )

    # Append the new content to the chat log in the session
    session['chat_log'] += "\n" + response['choices'][0]['message']['content']

    # Instead of sending the entire chat log to the frontend, send only the new content
    # We parse this new content to extract the story, choices etc.
    return jsonify(parse_story(response['choices'][0]['message']['content']))

@app.route('/end_adventure', methods=['POST'])
def end_adventure():
    # Construct the message for the epilogue
    user_message = {
        "role": "user",
        "content": "Write the epilogue."
    }
    
    # Retrieve the full chat log from the session if needed for context
    chat_log = session.get('chat_log', '')  # Get the chat log or empty string if it doesn't exist

    # Send the epilogue command to GPT along with the chat log for context
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "You are a helpful AI creating a story in the genre of {genre}, with the purpose of {purpose}. Please format your response with the chapter name, then newline followed by the story text. Use 100 words or less per chapter."}, {"role": "user", "content": chat_log}, user_message]
    )

    # Append the epilogue to the chat log in the session
    session['chat_log'] += "\n" + response['choices'][0]['message']['content']

    # Return the epilogue text to the frontend
    return jsonify({'epilogue': response['choices'][0]['message']['content']})


def parse_story(text):
    # Regex pattern to extract the chapter title, assuming the format "Chapter X: Title"
    chapter_match = re.search(r'(Chapter \d+): (.+)', text)
    chapter_number_title = chapter_match.group(0) if chapter_match else "Chapter Unknown"

    # Assuming the story part is always before "Choices:"
    parts = text.split('Choices:')
    story_part = parts[0].strip() if len(parts) > 1 else text
    
    # If we have a chapter match, remove it from the story part
    if chapter_match:
        story_part = story_part.replace(chapter_match.group(0), '').strip()
        story_part = story_part.replace('Story:', '')

    # Extract choices, general pattern assuming each choice starts with a digit followed by a period
    choices = re.findall(r'\d+\.\s(.+?)(?=\d+\.|$)', text, re.DOTALL)

    # Clean the choices by removing any leading/trailing whitespace and newlines
    choices = [choice.strip().replace('\n', ' ') for choice in choices]
    choices = [choice.replace(' End.', '') for choice in choices]

    
    diction = {
        'chapter': chapter_number_title,
        'story': story_part,
        'choices': choices
    }
    print(diction)

    return {
        'chapter': chapter_number_title,
        'story': story_part,
        'choices': choices
    }

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


#DALL-E STUFF---------------------
promptdefault = "detailed image"

@app.route('/prompt', methods =["POST", "GET"])
def prompting():
    if request.method == "POST":
       story_prompt = request.form.get("sprompt")
       # getting input with name = name in HTML form 
       character_name = request.form.get("cname")
       promptdefault = story_prompt
       img_url = generate_image()
       return render_template("testing.html", image_url=img_url)
    return render_template("prompting.html")

@app.route('/testing', methods=['POST', 'GET'])
def loading():
    return render_template('testing.html')

@app.route('/generate-image', methods=['POST', 'GET'])
def generate_image():
    data = request.get_json()  # Use request.get_json() to parse JSON data
    request_prompt = data.get('prompt')+", "+data.get('theme')+", digital art"

    try:
        # Call the OpenAI API to generate an image
        response = openai.Image.create(
            prompt=request_prompt,
            n=3,
            size="1024x1024"
        )

        # Extract the image URL(s) from the response
        # Adjust the following line according to the actual response structure
        image_urls = [data['url'] for data in response['data']]
        print(image_urls)
        # Send back the image URLs in the response
        return jsonify({'images': image_urls})

    except openai.error.OpenAIError as e:
        # Handle OpenAI specific errors
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        # Handle other possible errors
        return jsonify({'error': 'An error occurred while generating the image'}), 500
        #return render_template('prompting.html', image_url=website_url)

if __name__ == '__main__':
    app.run(debug=True, port=8001)
