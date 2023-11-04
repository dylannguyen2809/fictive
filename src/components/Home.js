import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Your content goes here */}
        <Link to="/story">Story</Link>
    </div>
  );
}

export default Home;