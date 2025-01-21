import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub } from "../api/API"; 

interface CandidateSearchProps {
    setCandidatesList: Dispatch<SetStateAction<Candidate[]>>; // Accept setCandidatesList as a prop
}

const CandidateSearch: React.FC<CandidateSearchProps> = ({ setCandidatesList }) => {
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Load candidates from local storage when the component mounts
    useEffect(() => {
        const savedCandidates = localStorage.getItem("candidates");
        if (savedCandidates) {
            setCandidatesList(JSON.parse(savedCandidates)); // Parse and set saved candidates
        }
        fetchCandidate(); // Fetch the first candidate
    }, []);

    // Function to fetch a candidate from the GitHub API
    const fetchCandidate = async () => {
        try {
            const candidates = await searchGithub(); // Fetch a list of candidates
            if (candidates.length > 0) {
                // Randomly select a candidate from the list
                const randomIndex = Math.floor(Math.random() * candidates.length);
                setCandidate(candidates[randomIndex]); // Set the selected candidate
            } else {
                setError("No candidates available");
            }
        } catch (err) {
            setError("Failed to fetch candidate");
        }
    };

    // Function to save the current candidate
    const saveCandidate = () => {
        if (candidate) {
            setCandidatesList((prevList) => {
                const updatedList = [...prevList, candidate]; // Update the list
                localStorage.setItem("candidates", JSON.stringify(updatedList)); // Save to local storage
                return updatedList;
            });
            fetchCandidate(); // Fetch the next candidate after saving
        }
    };

    // Function to reject the current candidate
    const rejectCandidate = () => {
        fetchCandidate(); // Fetch the next candidate without saving
    };

    return (
        <div>
            <h1>Candidate Search</h1>
            {error && <p>{error}</p>}
            {candidate ? (
                <div>
                    <h2>{candidate.username}</h2> 
                    <p>Location: {candidate.location || "Not available"}</p>
                    <img src={candidate.avatar} alt={candidate.username} /> 
                    <p>
                        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                            View Profile
                        </a>
                    </p>
                    <button onClick={saveCandidate}>+</button>
                    <button onClick={rejectCandidate}>-</button>
                </div>
            ) : (
                <p>Loading candidate...</p>
            )}
        </div>
    );
};

export default CandidateSearch;