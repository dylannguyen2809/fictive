import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Header from './Header';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; // import Button component

function Home() {
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

    components: {
      // Add your overrides here
      MuiCssBaseline: {
        styleOverrides: `
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `,
      },
    },

    }); // Create a theme instance
    
    const welcomeStyle = {
      fontSize: '4rem', // Big size for the text
      fontWeight: 'bold', // Make it bold
      fontStyle: 'italic', // Optional: if you want an italic style
      color: 'grey', // Use the secondary color from the theme
      whiteSpace: 'nowrap', // Prevent the text from wrapping to a new line
      overflow: 'hidden', // Hide the overflowed text
      display: 'block', // Make the element a block to occupy its own space
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for the fancy look
      animation: '$scroll 10s linear infinite', // Apply the scrolling animation
    };

    const paragraphStyle = {
      color: theme.palette.secondary.main, // Use the secondary color from the theme
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // A subtle white translucent background
      padding: '20px',
      borderRadius: '10px',
      margin: '20px 0', // Margin to give space above and below the paragraph
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // A gentle shadow for depth
      maxWidth: '800px', // Maximum width of the paragraph box
      textAlign: 'left', // Center align the text
      lineHeight: '1.6', // Line height for better readability
      fontSize: '1rem', // Font size can be adjusted as needed
    };
    
    const formContainerStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: 'auto',
      width: '80%',
      // Add other styles as needed
    };
    return (
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
          {/* Translucent background box */}

          <Box style={formContainerStyle}>

           <h1 style={welcomeStyle}>Welcome to Fictive</h1>
           <p style={paragraphStyle}>
              Dive into the realm of AI-driven creativity with Fictive, where your words shape the canvas. Fictive harnesses the transformative power of OpenAI's DALL-E to bring your imagination to life in vivid imagery. Our sleek interface is built for accessibility, allowing you to effortlessly translate ideas into art. Revel in the magic of machine learning and neural networks as they render your prompts into stunning, high-resolution visuals. At Fictive, we celebrate the fusion of human creativity and AI innovation, delivering a seamless experience for both visionaries and visual storytellers.

              Begin your creative exploration with Fictive, where every prompt is a portal to new possibilities.
            </p>
            {/* Big fancy buttons */}
            <Button
              component={Link}
              to="/story"
              variant="contained"
              color="primary"
              size="large"
              style={{ fontSize: '1.5rem', margin: '10px' }}
            >
              Story
            </Button>
            <Button
              component={Link}
              to="/character-creation"
              variant="contained"
              color="secondary"
              size="large"
              style={{ fontSize: '1.5rem', margin: '10px' }}
            >
              Character Creation
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
  
  export default Home;