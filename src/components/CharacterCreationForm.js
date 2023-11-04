import {React, useState} from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';


const formContainerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: 'auto',
    width: '80%',
    // Add other styles as needed
  };
  const inputStyle = {
    color: 'white', // This sets the text color to white
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // This sets a semi-transparent black background to the inputs
    borderColor: 'white', // Optional: if you want to change the border color to white
    // ... other styles
  };

  
  
const CharacterCreationForm = ({ handleSubmit }) => {
    // State variables for each input
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [character, setCharacter] = useState('');
    const [language, setLanguage] = useState('');
    const [theme, setTheme] = useState('');
    const [purpose, setPurpose] = useState('');

    // Handle change for each input
    const handleNameChange = (event) => setName(event.target.value);
    const handleGenderChange = (event) => setGender(event.target.value);
    const handleCharacterChange = (event) => setCharacter(event.target.value);
    const handleLanguageChange = (event) => setLanguage(event.target.value);
    const handleThemeChange = (event) => setTheme(event.target.value);
    const handlePurposeChange = (event) => setPurpose(event.target.value);

    
    const handleFormSubmission = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Collect form data
        const formData = {
            name,
            gender,
            character,
            language,
            theme,
            purpose
        };

        // Call the handleSubmit prop with formData
        handleSubmit(formData);
    };


  return (
    <div style={formContainerStyle}>{
    <form onSubmit={handleFormSubmission}>
      <TextField
        InputProps={{
            style: { color: 'white' }, // This changes the input text color
        }}
        InputLabelProps={{
            style: { color: 'white' } // This changes the label color
        }}
        autoFocus
        margin="dense"
        id="kid-name"
        label="Character's name"
        type="text"
        fullWidth
        variant="outlined"
        value={name}  // Bind value to state
        onChange={handleNameChange}  // Set onChange handler
        />

      <FormControl fullWidth margin="dense">
       
        <InputLabel id="kid-gender-label">Character's Gender</InputLabel>
        <Select
            labelId="kid-gender-label"
            id="kid-gender"
            label="Character's Gender"
            value={gender}  // Bind value to state
            onChange={handleGenderChange}  // Set onChange handler
            defaultValue=""
            style={{ color: 'white' }} // Set text color of the select
            inputProps={{
            style: { color: 'white' } // Set text color of the select input
            }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        InputProps={{
            style: { color: 'white' }, // This changes the input text color
        }}
        InputLabelProps={{
            style: { color: 'white' } // This changes the label color
        }}
        autoFocus
        margin="dense"
        id="kid-character"
        label="Character's race (optional)"
        type="text"
        fullWidth
        variant="outlined"
      />

      <FormControl fullWidth margin="dense">
        <InputLabel id="story-language-label" style={{ color: 'white' }}>Story language</InputLabel>
        <Select
          labelId="story-language-label"
          id="story-language"
          label="Story language"
          defaultValue=""
          style={{ color: 'white' }} // Set text color of the select
        inputProps={{
        style: { color: 'white' } // Set text color of the select input
        }}
        MenuProps={{
        PaperProps: {
            style: {
            backgroundColor: 'darkgrey', // You can choose a dark background or any other preferred color
            color: 'white', // Set text color of the dropdown options
            },
        },
        }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {/* Populate with languages */}
          <MenuItem value={'english'}>English</MenuItem>
          <MenuItem value={'spanish'}>Spanish</MenuItem>
          {/* ... other languages */}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel id="story-theme-label" style={{ color: 'white' }}>Story theme</InputLabel>
        <Select
            labelId="story-theme-label"
            id="story-theme"
            label="Story theme"
            defaultValue=""
            style={{ color: 'white' }} // Set text color of the select
            inputProps={{
            style: { color: 'white' } // Set text color of the select input
            }}
            MenuProps={{
            PaperProps: {
                style: {
                backgroundColor: 'darkgrey', // You can choose a dark background or any other preferred color
                color: 'white', // Set text color of the dropdown options
                },
            },
            }}
        >
            <MenuItem value="" style={{ color: 'white' }}><em>None</em></MenuItem>
            {/* Populate with themes */}
            <MenuItem value={'adventure'} style={{ color: 'white' }}>Adventure</MenuItem>
            <MenuItem value={'fantasy'} style={{ color: 'white' }}>Fantasy</MenuItem>
            <MenuItem value={'sci-fi'} style={{ color: 'white' }}>Science Fiction</MenuItem>
            {/* ... other themes */}
        </Select>
        </FormControl>

      <TextField
        InputProps={{
            style: { color: 'white' }, // This changes the input text color
        }}
        InputLabelProps={{
            style: { color: 'white' } // This changes the label color
        }}
        autoFocus
        margin="dense"
        id="story-purpose"
        label="Story purpose (optional)"
        type="text"
        fullWidth
        variant="outlined"
      />

      <Button type="submit" variant="contained" color="primary">
        Create Character
      </Button>
    </form>
    }</div>
  );
};

export default CharacterCreationForm;
