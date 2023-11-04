import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Story from './components/Story';
import CharacterCreation from './components/CharacterCreation'

function AppRoutes() {
  return (
    <Router> {/* Wrap your routes in a Router component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;