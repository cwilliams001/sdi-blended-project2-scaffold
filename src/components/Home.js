
import React, { useState } from 'react';
import MapSnapshot from './MapSnapshot'; 

const HomePage = () => {
  const [lat, setLat] = useState(35.110561); 
  const [lng, setLng] = useState(-79.001708); 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Additional validation needed
  };

  return (
    <div>
      <h1>Welcome to the Map Snapshot App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Latitude:
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Longitude:
            <input
              type="number"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Show Map</button>
      </form>
      <MapSnapshot lat={lat} lng={lng} />
    </div>
  );
};

export default HomePage;