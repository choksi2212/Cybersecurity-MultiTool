import React, { useState } from "react";

const ChallengeSentence = ({ onSentenceMatch }) => {
    const sentences = [
        "Cybersecurity is the backbone of technology.",
        "Artificial Intelligence is transforming the world.",
        "Always stay cautious while browsing online.",
        "Keystroke dynamics adds an extra security layer.",
        "Hackers exploit weak passwords for attacks."
    ];

    const [challenge, setChallenge] = useState(sentences[Math.floor(Math.random() * sentences.length)]);
    const [inputText, setInputText] = useState("");

    const handleChange = (e) => {
        setInputText(e.target.value);
        if (e.target.value === challenge) {
            onSentenceMatch(true);
        }
    };

    return (
        <div>
            <h3>Challenge Sentence</h3>
            <p>{challenge}</p>
            <input 
                type="text" 
                value={inputText} 
                onChange={handleChange} 
                placeholder="Type the sentence here..."
            />
        </div>
    );
};

export default ChallengeSentence;
