import React, {useState, useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Chapter from './Chapter';

function Story() {
    const [currentTime, setCurrentTime] = useState('');
    const [chapterName, setChapterName] = useState('Chapter 1: A New Discovery');
    const [chapterContent, setChapterContent] = useState("One sunny afternoon, while he was exploring the attic of his grandmother's house, he stumbled upon an old, dusty book. As he opened it, a strange symbol caught his eye. Before he could react, the symbol glowed brightly and a shimmering portal appeared in front of him.");
    const [choice1, setChoice1] = useState("Step through the portal and explore the unknown.");
    const [choice2, setChoice2] = useState("Open the book to discover its secrets");
    const [selectedChoice, setSelectedChoice] = useState("Step through the portal and explore the unknown.");
    const [currentChapter, setCurrentChapter] = useState(false);

    const [chapters, setChapters] = useState([
      {
        chapterName: "Chapter 1: A New Discovery",
        chapterContent: "One sunny afternoon, while he was exploring the attic of his grandmother's house, he stumbled upon an old, dusty book. As he opened it, a strange symbol caught his eye. Before he could react, the symbol glowed brightly and a shimmering portal appeared in front of him.",
        choice1: "Step through the portal and explore the unknown.",
        choice2: "Open the book to discover its secrets",
        selectedChoice: "Step through the portal and explore the unknown.",
        currentChapter: false,
      },
      {
        chapterName: "Chapter 2: The Enchanted Forest",
        chapterContent: "With curiosity and excitement, Dylan decided to step through the portal. As he crossed the threshold, he found himself in a lush, enchanted forest. The trees were colossal, and the air was filled with the sweet scent of exotic flowers. Strange creatures flitted about, and everything seemed to glisten with magic.",
        choice1: "Approach the nearest creature to try and communicate with it.",
        choice2: "Wander deeper into the forest to discover its secrets.",
        selectedChoice: "Wander deeper into the forest to discover its secrets.",
        currentChapter: false,
      },
      {
        chapterName: "Chapter 3: The Secret Grove",
        chapterContent: "As Dylan wandered deeper into the forest, he encountered even more enchanting sights. He stumbled upon a hidden grove, bathed in the soft glow of bioluminescent plants. In the center of the grove, a magnificent ancient tree stood, its bark adorned with intricate carvings and symbols.",
        choice1: "Approach the ancient tree and examine its carvings.",
        choice2: "Explore the surrounding area to see if there are any other hidden secrets in the grove.",
        selectedChoice: null,
        currentChapter: true,
      },
    ]);

    const theme = createTheme({
        palette: {
            primary: {
              main: '#176273', // Change the primary color
            },
            secondary: {
              main: '#D4BF80', // Change the secondary color
            },
            lighttext: {
                main: '#F2F3D4',
            }
          },
        typography: {
            fontFamily: 'Henny Penny, sans-serif', // Set the font-family for all text
            allVariants: {
                color: 'white', // Set the text color to white for all typography variants
                textShadow: '2px 2px 4px rgba(0, 0, 0, 1)', // Add a black text shadow
            },
        },
    }); // Create a theme instance

    useEffect(() => {
      fetch('/time', {
        method: 'GET'
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was not ok (status: ${response.status})`);
            }
            return response.json();
          })
          .then(data => setCurrentTime(data.time))
          .catch(error => {
            console.error('Error fetching data:', error);
            if (error.response) {
              error.response.text().then(text => {
                console.error('Response content:', text);
              });
            }
          });
      }, []);
  
    const chapterArr = chapters.map((data) => 
    <Chapter 
      chapterName={data.chapterName}
      chapterContent={data.chapterContent}
      choice1={data.choice1}
      choice2={data.choice2}
      currentChapter={data.currentChapter}
      selectedChoice={data.selectedChoice}
    />);


    return (
      <div className="Story">
        <ThemeProvider theme={theme}>
            <Header />
            <Box
                style={{
                    background: `url('/background.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '-1',
                    width: '100%',
                }}
                >
                  {chapterArr}
                <p>The current time is {currentTime}.</p>
            </Box>
        </ThemeProvider>
      </div>
    );
}

export default Story;
