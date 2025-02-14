import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';

// Mock ML model class to mimic sklearn's RandomForestClassifier
class RandomForestClassifier {
  constructor() {
    this.threshold = 0.7;
  }

  predict(features) {
    // Simplified prediction logic
    const avgHoldTime = features[0][0];
    const avgLatency = features[0][1];
    
    // Check if the features fall within expected ranges
    return [(avgHoldTime > 50 && avgHoldTime < 200 && 
             avgLatency > 100 && avgLatency < 500) ? 1 : 0];
  }
}

const model = new RandomForestClassifier();

// Simple encryption using native browser APIs
const encrypt = async (data, key) => {
  const text = JSON.stringify(data);
  const encodedText = new TextEncoder().encode(text);
  const encodedKey = new TextEncoder().encode(key);
  
  // Create a key from the password
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encodedKey,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );
  
  // Generate initialization vector
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // Encrypt the data
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encodedText
  );
  
  // Combine IV and encrypted data
  const result = new Uint8Array(iv.length + encryptedData.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encryptedData), iv.length);
  
  return Array.from(result).map(b => b.toString(16).padStart(2, '0')).join('');
};

// Simple decryption using native browser APIs
const decrypt = async (encryptedHex, key) => {
  // Convert hex string back to Uint8Array
  const encryptedData = new Uint8Array(
    encryptedHex.match(/.{2}/g).map(byte => parseInt(byte, 16))
  );
  
  const iv = encryptedData.slice(0, 12);
  const data = encryptedData.slice(12);
  
  const encodedKey = new TextEncoder().encode(key);
  
  // Recreate the key
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encodedKey,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );
  
  // Decrypt the data
  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );
  
  return JSON.parse(new TextDecoder().decode(decryptedData));
};

const KeystrokeAuthentication = () => {
  const [typingData, setTypingData] = useState([]);
  const [prevKeyTime, setPrevKeyTime] = useState(null);
  const [challengeSentence, setChallengeSentence] = useState('');
  const [inputText, setInputText] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('menu'); // menu, register, authenticate
  const encryptionKey = useRef('ThisIsASecretKey123!@#');
  
  const sentences = [
    "Cybersecurity is the backbone of technology.",
    "Artificial Intelligence is transforming the world.",
    "Always stay cautious while browsing online.",
    "Keystroke dynamics adds an extra security layer.",
    "Hackers exploit weak passwords for attacks."
  ];

  const getRandomSentence = () => {
    return sentences[Math.floor(Math.random() * sentences.length)];
  };

  useEffect(() => {
    setChallengeSentence(getRandomSentence());
  }, [status]);

  const recordKeypress = (event) => {
    const currentTime = performance.now();
    const key = event.key;

    if (key.length === 1 || key === 'Space') { // Only record actual characters
      setTypingData(prevData => {
        const latency = prevKeyTime ? currentTime - prevKeyTime : 0;
        return [...prevData, { key, holdTime: null, latency }];
      });
      setPrevKeyTime(currentTime);
    }
  };

  const recordKeyrelease = (event) => {
    const currentTime = performance.now();
    const key = event.key;

    if (key.length === 1 || key === 'Space') {
      setTypingData(prevData => {
        const newData = [...prevData];
        const entry = newData.find(e => e.key === key && e.holdTime === null);
        if (entry) {
          entry.holdTime = currentTime - prevKeyTime;
        }
        return newData;
      });
    }
  };

  const detectBotTyping = () => {
    const charList = typingData.map(entry => entry.key);
    const nonTypingChars = charList.filter(c => 
      !/[a-zA-Z0-9 ]/.test(c)
    );
    return nonTypingChars.length > 5;
  };

  const registerPattern = async () => {
    if (typingData.length === 0) {
      setMessage('❌ No typing pattern detected.');
      return;
    }

    try {
      const encryptedPattern = await encrypt(typingData, encryptionKey.current);
      localStorage.setItem('keystrokePattern', encryptedPattern);
      setMessage('✅ Typing pattern registered successfully!');
      setTimeout(() => {
        setStatus('menu');
        setTypingData([]);
        setInputText('');
      }, 2000);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const authenticatePattern = async () => {
    try {
      if (detectBotTyping()) {
        setMessage('⚠️ Possible bot detected! Authentication blocked.');
        return;
      }

      const encryptedPattern = localStorage.getItem('keystrokePattern');
      if (!encryptedPattern) {
        setMessage('❌ No registered pattern found.');
        return;
      }

      const registeredPattern = await decrypt(encryptedPattern, encryptionKey.current);

      // Prepare input features
      const inputFeatures = typingData
        .filter(entry => entry.holdTime !== null)
        .map(entry => [entry.holdTime, entry.latency]);

      if (inputFeatures.length === 0) {
        setMessage('❌ Not enough typing data for authentication.');
        return;
      }

      // Calculate mean features for ML model
      const meanFeatures = inputFeatures.reduce((acc, [hold, latency]) => {
        return [acc[0] + hold, acc[1] + latency];
      }, [0, 0]).map(val => val / inputFeatures.length);

      const predictedLabel = model.predict([meanFeatures]);

      if (predictedLabel[0] === 1) {
        if (mfaEnabled) {
          const otp = Math.floor(100000 + Math.random() * 900000);
          setMessage(`🔐 Multi-Factor Authentication Required. Your OTP is: ${otp}`);
          const userOtp = prompt('Enter the OTP:');
          
          if (userOtp === otp.toString()) {
            setMessage('✅ Authentication Successful!');
          } else {
            setMessage('❌ Incorrect OTP! Access Denied.');
          }
        } else {
          setMessage('✅ Authentication Successful!');
        }
      } else {
        setMessage('❌ Authentication Failed! Typing pattern does not match.');
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const handleSubmit = () => {
    if (inputText !== challengeSentence) {
      setMessage('❌ Sentence mismatch! Try again.');
      return;
    }

    if (status === 'register') {
      registerPattern();
    } else if (status === 'authenticate') {
      authenticatePattern();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">🛡️ Keystroke Authentication System</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === 'menu' ? (
          <div className="space-y-4">
            <Button 
              className="w-full"
              onClick={() => setStatus('register')}
            >
              1️⃣ Register Typing Pattern
            </Button>
            <Button 
              className="w-full"
              onClick={() => setStatus('authenticate')}
            >
              2️⃣ Authenticate Using Typing Pattern
            </Button>
            <Button 
              className="w-full"
              onClick={() => {
                setMfaEnabled(!mfaEnabled);
                setMessage(`✅ Multi-Factor Authentication is now ${mfaEnabled ? 'Disabled' : 'Enabled'}`);
              }}
            >
              3️⃣ {mfaEnabled ? 'Disable' : 'Enable'} Multi-Factor Authentication
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {status === 'register' ? '🔑 Type the following sentence for registration:' : 
               '🔒 Type the following sentence for authentication:'}
            </p>
            <p className="font-medium text-lg">
              👉 {challengeSentence}
            </p>
            <Input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={recordKeypress}
              onKeyUp={recordKeyrelease}
              placeholder="Enter the sentence exactly as shown"
              className="w-full"
            />
            <div className="flex gap-4">
              <Button 
                className="flex-1"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setStatus('menu');
                  setTypingData([]);
                  setInputText('');
                  setMessage('');
                }}
              >
                Back to Menu
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeystrokeAuthentication;