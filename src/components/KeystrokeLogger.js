import React, { useState, useEffect } from "react";

const KeystrokeAuth = ({ onKeystrokeData, onSentenceMatch, isMfaEnabled, onVerify }) => {
    // Keystroke Logger State
    const [keystrokes, setKeystrokes] = useState([]);
    const [prevKeyTime, setPrevKeyTime] = useState(null);

    // Challenge Sentence State
    const sentences = [
        "Cybersecurity is the backbone of technology.",
        "Artificial Intelligence is transforming the world.",
        "Always stay cautious while browsing online.",
        "Keystroke dynamics adds an extra security layer.",
        "Hackers exploit weak passwords for attacks."
    ];
    const [challenge, setChallenge] = useState(sentences[Math.floor(Math.random() * sentences.length)]);
    const [inputText, setInputText] = useState("");

    // MFA State
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState(null);

    // Handle Keystroke Data Logging
    useEffect(() => {
        const handleKeyDown = (event) => {
            const currentTime = Date.now();
            const latency = prevKeyTime ? currentTime - prevKeyTime : 0;
            
            setKeystrokes((prev) => [
                ...prev, { key: event.key, holdTime: null, latency: latency }
            ]);
            setPrevKeyTime(currentTime);
        };

        const handleKeyUp = (event) => {
            setKeystrokes((prev) =>
                prev.map((entry) =>
                    entry.key === event.key && entry.holdTime === null
                        ? { ...entry, holdTime: Date.now() - prevKeyTime }
                        : entry
                )
            );
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [prevKeyTime]);

    useEffect(() => {
        onKeystrokeData(keystrokes);
    }, [keystrokes, onKeystrokeData]);

    // Handle Challenge Sentence Input
    const handleChange = (e) => {
        setInputText(e.target.value);
        if (e.target.value === challenge) {
            onSentenceMatch(true);
        }
    };

    // Generate and Verify MFA OTP
    const generateOtp = () => {
        const newOtp = Math.floor(100000 + Math.random() * 900000);
        setGeneratedOtp(newOtp);
        alert(`Your OTP: ${newOtp}`);
    };

    const handleVerify = () => {
        if (otp === String(generatedOtp)) {
            onVerify(true);
        } else {
            alert("❌ Incorrect OTP! Access Denied.");
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            {/* Keystroke Logging Section */}
            <h3 className="text-lg font-bold">Keystroke Logging</h3>
            <p>Start typing to record your keystroke data.</p>

            {/* Challenge Sentence Section */}
            <h3 className="text-lg font-bold mt-4">Challenge Sentence</h3>
            <p>{challenge}</p>
            <input 
                type="text" 
                value={inputText} 
                onChange={handleChange} 
                placeholder="Type the sentence here..."
                className="border p-2 rounded w-full"
            />

            {/* MFA Section */}
            {isMfaEnabled && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Multi-Factor Authentication</h3>
                    <button 
                        onClick={generateOtp} 
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Generate OTP
                    </button>
                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        className="border p-2 rounded w-full mt-2"
                    />
                    <button 
                        onClick={handleVerify} 
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Verify
                    </button>
                </div>
            )}
        </div>
    );
};

export default KeystrokeAuth;
