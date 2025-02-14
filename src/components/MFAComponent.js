import React, { useState } from "react";

const MFAComponent = ({ isEnabled, onVerify }) => {
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState(null);

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

    return isEnabled ? (
        <div>
            <h3>Multi-Factor Authentication</h3>
            <button onClick={generateOtp}>Generate OTP</button>
            <input 
                type="text" 
                placeholder="Enter OTP" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
            />
            <button onClick={handleVerify}>Verify</button>
        </div>
    ) : null;
};

export default MFAComponent;
