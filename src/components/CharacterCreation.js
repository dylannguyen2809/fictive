import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import Box from '@mui/material/Box';

import Form from './CharacterCreationForm';

function CharacterCreation() {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };


    const handleSubmit = (formData) => {
        console.log('Form Data:', formData); 
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
               

               <Form handleSubmit={handleSubmit} />
      

            </Box>
            

        </ThemeProvider>
      </div>
    );
}

export default CharacterCreation;
