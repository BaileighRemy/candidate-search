import React from 'react';
import { Outlet, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import CandidateSearch from './components/CandidateSearch';
import SavedCandidates from './components/SavedCandidates';

function App() {
  return (
    <Router>
      <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<CandidateSearch />} />
          <Route path="/saved-candidates" element={<SavedCandidates candidates={[]} />} />
        </Routes>
        <Outlet />
      </main>
      </div>
    </Router>
  );
}

export default App;