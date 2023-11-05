import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Button, Container, TextField, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles'; // Import createTheme
import Typed from 'react-typed';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    width: '90%',
  },
  imageContainer: {
    position: 'relative',
    width: '100%', // Set the width to make it wider
    maxHeight: '500px', // Limit the height
    borderRadius: '10px', // Add rounded corners to the image container
    overflow: 'hidden', // Hide overflowing content
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
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '95%',
  },
  imageText: {
    position: 'absolute',
    height: '80%',
    top: '80%', // Vertically center the text
    left: '50%', // Horizontally center the text
    transform: 'translate(-50%, -50%)',
    overflow: 'scroll', // Hide overflowing content
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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  button2: {
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
  choiceText: {
    position: 'absolute',
    top: '5%', // Vertically center the text
    left: '-30%', // Horizontally center the text
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '95%',
  },
  selectedChoiceText: {
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '100%',
    paddingTop: '30px',
  },
}));

function Chapter(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img
          src={props.chapterImg} // Replace with the image URL
          alt="Sample Image"
          className={classes.image}
        />
        <div className={classes.chapterText}><Typography variant="h4">{props.chapterName}</Typography></div>
        <div className={classes.imageText}>
          {props.currentChapter && 
            <Typography variant="h6" style={{fontSize: '22px'}}>
              <Typed
                  strings={[props.chapterContent]}
                  typeSpeed={10}
                  showCursor={false}
              />
            </Typography>
          }
          {!props.currentChapter && 
            <Typography variant="h6">
              {props.chapterContent}
            </Typography>
          }
        </div>
      </div>
      {!props.currentChapter && //OLD CHAPTER
      <>
        <div>
          <Typography variant="h4" className={classes.selectedChoiceText}>
          {props.selectedChoice}
          </Typography>
        </div>
      </>}
      {props.currentChapter && (
      <>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            className={`${classes.squareButton} ${classes.button1}`}
            style={{ backgroundImage: 'url("' + props.choice1Img + '")' }}
            value={props.choice1}
            onClick={(e) => props.handleSelectionText(props.choice1)}
          >
            <Typography variant="h5">{props.choice1}</Typography>
          </Button>
          <Button
            variant="contained"
            className={`${classes.squareButton} ${classes.button2}`}
            style={{ backgroundImage: 'url("' + props.choice2Img + '")' }}
            value={props.choice2}
            onClick={(e) => props.handleSelectionText(props.choice2)}
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
                  onChange={(e) => props.handleSelectionText(e.target.value)}
                />
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  onClick={props.handleContinue}
                >
                  CONTINUE...
                </Button>
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  onClick={props.handleEnd}
                >
                  END
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </>
    )}
    </div>
  );
}

export default Chapter;
