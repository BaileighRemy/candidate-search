import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch'; 
import SavedCandidates from './pages/SavedCandidates'; 
import { Candidate } from './interfaces/Candidate.interface';

function App() {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);

  return (
    <div>
      <Nav />
      <main>
    
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