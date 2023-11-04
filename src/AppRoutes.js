import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Story from './components/Story';

function AppRoutes() {
  return (
    <Router> {/* Wrap your routes in a Router component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;