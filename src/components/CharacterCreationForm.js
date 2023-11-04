import React from 'react';
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

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass state variables back to parent component
        onSubmit({ name, gender, character, language, theme, purpose });
    };
    
  return (
    <div style={formContainerStyle}>{
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        id="kid-name"
        label="Character's name"
        type="text"
        fullWidth
        variant="outlined"
      />

      <FormControl fullWidth margin="dense">
        <InputLabel id="kid-gender-label">Character's Gender</InputLabel>
        <Select
          labelId="kid-gender-label"
          id="kid-gender"
          label="Character's Gender"
          defaultValue=""
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        margin="dense"
        id="kid-character"
        label="Character's race (optional)"
        type="text"
        fullWidth
        variant="outlined"
      />

      <FormControl fullWidth margin="dense">
        <InputLabel id="story-language-label">Story language</InputLabel>
        <Select
          labelId="story-language-label"
          id="story-language"
          label="Story language"
          defaultValue=""
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {/* Populate with languages */}
          <MenuItem value={'english'}>English</MenuItem>
          <MenuItem value={'spanish'}>Spanish</MenuItem>
          {/* ... other languages */}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel id="story-theme-label">Story theme</InputLabel>
        <Select
          labelId="story-theme-label"
          id="story-theme"
          label="Story theme"
          defaultValue=""
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {/* Populate with themes */}
          <MenuItem value={'adventure'}>Adventure</MenuItem>
          <MenuItem value={'fantasy'}>Fantasy</MenuItem>
          <MenuItem value={'sci-fi'}>Science Fiction</MenuItem>
          {/* ... other themes */}
        </Select>
      </FormControl>

      <TextField
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
