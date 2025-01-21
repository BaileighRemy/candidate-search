import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Nav from './components/Nav';
import { Candidate } from './interfaces/Candidate.interface';

function App() {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);

  return (
    <div>
      <Nav />
      <main>
        <Outlet context={{ candidatesList, setCandidatesList }} /> {/* Render nested routes */}
      </main>
    </div>
  );
}

export default App;