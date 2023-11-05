import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Header from './Header';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Import Typography component
import Button from '@mui/material/Button'; // Import Button component

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
      },
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
    color: theme.palette.secondary.main, // Use the secondary color from the theme
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for the fancy look
    paddingTop: '100px',
    display: 'block',
    textAlign: 'center', // Center-align text
  };

  const paragraphStyle = {
    fontSize: '18px', // Big size for the text
    fontWeight: 'bold', // Make it bold
    color: theme.palette.secondary.main, // Use the secondary color from the theme
    overflow: 'hidden', // Hide the overflowed text
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for the fancy look
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
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '-1',
          width: '100%',
        }}
      >
        <div>
          <Typography variant="h1" style={welcomeStyle}>
            Welcome to Fictive!
          </Typography>
        </div>
        <br /> {/* Add a line break */}
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column', // Stack the elements vertically
            alignItems: 'center',
            padding: '20px',
            margin: 'auto',
            width: '80%',
            color: theme.palette.secondary.main,
          }}
        >
          <Box
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%', // Take the full width
              marginBottom: '20px', // Add space below the text box
            }}
          >
            <Typography variant="body1" style={paragraphStyle}>
              Dive into the realm of AI-driven creativity with Fictive, where your words shape the canvas. Fictive harnesses the transformative power of OpenAI's DALL-E to bring your imagination to life in vivid imagery. Our sleek interface is built for accessibility, allowing you to effortlessly translate ideas into art. Revel in the magic of machine learning and neural networks as they render your prompts into stunning, high-resolution visuals. At Fictive, we celebrate the fusion of human creativity and AI innovation, delivering a seamless experience for both visionaries and visual storytellers. Begin your creative exploration with Fictive, where every prompt is a portal to new possibilities.
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/character-creation"
            variant="contained"
            color="secondary"
            size="large"
            style={{ fontSize: '1.5rem', width: '100%', maxWidth: '400px' }}
          >
            Begin your Story!
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;