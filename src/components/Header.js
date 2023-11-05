import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main, // You can customize the background color
    color: theme.palette.lighttext.main,
    position: 'sticky',  // Make the AppBar sticky
    top: 10,             // Stick to the top of the viewport
    
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add drop shadow here
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h4" component={Link} to="/" className={classes.title} style={{ fontFamily: 'Fondamento, cursive', padding: '8px', textDecoration: 'none'}}>
          fictive
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
