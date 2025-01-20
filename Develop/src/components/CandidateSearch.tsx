import React, { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub } from "../api/API"; // Adjust the import path as necessary

const CandidateSearch = () => {
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [candidatesList, setCandidatesList] = useState<Candidate[]>([]); // To store saved candidates
    const [error, setError] = useState<string | null>(null);

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
            setCandidatesList([...candidatesList, candidate]);
            fetchCandidate(); // Fetch the next candidate after saving
        }
    };

    // Function to reject the current candidate
    const rejectCandidate = () => {
        fetchCandidate(); // Fetch the next candidate without saving
    };

    // useEffect to fetch the first candidate when the component mounts
    useEffect(() => {
        fetchCandidate();
    }, []);

    return (
        <div>
            <h1>Candidate Search</h1>
            {error && <p>{error}</p>}
            {candidate ? (
                <div>
                    <h2>{candidate.login}</h2> {/* Use 'login' for the username */}
                    <p>Location: {candidate.location || "Not available"}</p>
                    <img src={candidate.avatar_url} alt={candidate.login} /> {/* Use 'avatar_url' for the avatar image */}
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