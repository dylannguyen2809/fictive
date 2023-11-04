import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    height: '100px',
  },
  text: {
    flexGrow: 1,
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Container className={classes.main}>
        {/* Your main content here */}
      </Container>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="body1" className={classes.text}>
            &copy; {new Date().getFullYear()} Your Company Name
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
