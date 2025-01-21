import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch'; // Adjust the import path as necessary
import SavedCandidates from './pages/SavedCandidates'; // Adjust the import path as necessary

function App() {
  const [candidatesList, setCandidatesList] = useState([]);

  return (
    <div>
      <Nav />
      <main>
        {/* Render child routes with props */}
        <Routes>
          <Route 
            path="/" 
            element={<CandidateSearch setCandidatesList={setCandidatesList} />} 
          />
          <Route 
            path="/saved-candidates" 
            element={<SavedCandidates candidates={candidatesList} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;