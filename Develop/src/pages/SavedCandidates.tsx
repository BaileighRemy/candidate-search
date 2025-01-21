import React from "react";
import { Candidate } from "../interfaces/Candidate.interface"; 

interface SavedCandidatesProps {
    candidates: Candidate[];
}

const SavedCandidates: React.FC<SavedCandidatesProps> = ({ candidates }) => {
    return (
        <div>
            <h2>Saved Candidates</h2>
            {candidates.length === 0 ? (
                <p>No candidates saved.</p>
            ) : (
                <ul>
                    {candidates.map((candidate, index) => (
                        <li key={index}>
                            <h3>{candidate.login}</h3>
                            <p>Location: {candidate.location || "Not available"}</p>
                            <img src={candidate.avatar_url} alt={candidate.login} />
                            <p>
                                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                                    View Profile
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SavedCandidates;
