import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import Box from '@mui/material/Box';
import Chapter from './Chapter';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Form from './CharacterCreationForm';

function CharacterCreation() {
    const [currentTime, setCurrentTime] = useState('');
    const [chapterName, setChapterName] = useState('Chapter 1: A New Discovery');
    const [chapterContent, setChapterContent] = useState("One sunny afternoon, while he was exploring the attic of his grandmother's house, he stumbled upon an old, dusty book. As he opened it, a strange symbol caught his eye. Before he could react, the symbol glowed brightly and a shimmering portal appeared in front of him.");
    const [choice1, setChoice1] = useState("Step through the portal and explore the unknown.");
    const [choice2, setChoice2] = useState("Open the book to discover its secrets");

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission here
    // extract the values from the form fields
    // and do something with them
    handleClose();
    };

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
               

                <Form></Form>
      

            </Box>
            

        </ThemeProvider>
      </div>
    );
}

export default CharacterCreation;
