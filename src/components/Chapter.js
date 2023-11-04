import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Button, Container, TextField, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles'; // Import createTheme

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  imageContainer: {
    position: 'relative',
    width: '100%', // Set the width to make it wider
    maxHeight: '500px', // Limit the height
    overflow: 'hidden', // Hide overflowing content
    borderRadius: '10px', // Add rounded corners to the image container
  },
  image: {
    width: '100%',
    height: 'auto', // Set height to 'auto' for aspect ratio preservation
    objectFit: 'cover',
    objectPosition: 'center top', // Position the center of the image
    transform: 'translateY(-25%)',
  },
  chapterText: {
    position: 'absolute',
    top: '5%', // Vertically center the text
    left: '-30%', // Horizontally center the text
    //transform: 'translate(-50%, -50%)',
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '95%',
  },
  imageText: {
    position: 'absolute',
    top: '70%', // Vertically center the text
    left: '50%', // Horizontally center the text
    transform: 'translate(-50%, -50%)',
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '95%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(2),
  },
  squareButton: {
    width: 'calc(50% - 8px)', // To fit two buttons side-by-side with spacing
    height: '300px', // Set the height of the buttons
    transition: 'transform 1s, box-shadow 1s', // Add a smooth transition for button hover
    transform: 'scale(1)', // Set the default scale
    '&:hover': {
      transition: 'transform 1s', // Add a smooth transition for button hover
      transform: 'scale(1.03)', // Enlarge the button on hover
      transition: 'transform 1s', // Add a smooth transition for button hover
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
    },
    '&:focus': {
      transition: 'transform 1s',
      outline: '2px solid gold', // Outline the button on focus
    },
  },
  button1: {
    backgroundImage: 'url("/default1.png")', // Replace with the button 1 image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  button2: {
    backgroundImage: 'url("/default2.png")', // Replace with the button 2 image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  textBoxContainer: {
    marginTop: theme.spacing(2),
    padding: '0px',
  },
  textField: {
    width: '90%',
    backgroundColor: theme.palette.secondary.main, // Use secondary theme color
  },
  submitButton: {
    marginLeft: theme.spacing(1),
  },
  // Set the background color for the card
  cardBackground: {
    margin: '0px',
    padding: '0px',
    backgroundColor: theme.palette.secondary.main, // Use secondary theme color
  },
}));

function Chapter(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img
          src="/defaultmain.png" // Replace with the image URL
          alt="Sample Image"
          className={classes.image}
        />
        <div className={classes.chapterText}><Typography variant="h4">{props.chapterName}</Typography></div>
        <div className={classes.imageText}>
          <Typography variant="h6">{props.chapterContent}</Typography>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          className={`${classes.squareButton} ${classes.button1}`}
        >
            <Typography variant="h5">{props.choice1}</Typography>
        </Button>
        <Button
          variant="contained"
          className={`${classes.squareButton} ${classes.button2}`}
        >
            <Typography variant="h5">{props.choice2}</Typography>
        </Button>
      </div>

      <Container className={classes.textBoxContainer} disableGutters maxWidth={false}>
        <Card className={classes.cardBackground}>
          <CardContent className={classes.cardBackground}>
            <Typography variant="h6" gutterBottom>
              🪶 MAKE YOUR OWN CHOICE!
            </Typography>
            <Box display="flex">
              <TextField
                className={classes.textField}
                label="Input Text"
                variant="outlined"
              />
              <Button
                variant="contained"
                className={classes.submitButton}
              >
                CONTINUE...
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Chapter;
