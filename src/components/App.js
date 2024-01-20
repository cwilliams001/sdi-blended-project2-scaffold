
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapSnapshot from './MapSnapshot'; 


export default function App() {
  // Example coordinates
  const latitude = 40.7128; 
  const longitude = -74.0060; 
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<MapSnapshot lat={latitude} lng={longitude} />} />
      </Routes>
    </div>
    </Router>
  );
}