import React from 'react';
import Navbar from '../js/components/Navbar';
import Home from '../js/components/Home';
import NotFound from '../js/components/404';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const Index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" exact element={<Home />} />
        <Route path="/files" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Index;
