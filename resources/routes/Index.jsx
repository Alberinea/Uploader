import React from 'react';
import Navbar from '../js/components/Navbar';
import Home from '../js/components/Home';
import Files from '../js/components/Files';
import NotFound from '../js/components/404';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const Index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </Router>
  );
};

export default Index;
