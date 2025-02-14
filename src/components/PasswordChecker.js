import React, { useState, useEffect } from 'react';
import { Shield, Terminal, AlertTriangle, Lock, Activity } from 'lucide-react';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Original analysis functions remain the same
  const calculateEntropy = (pwd) => {
    let charset = 0;
    if (/[a-z]/.test(pwd)) charset += 26;
    if (/[A-Z]/.test(pwd)) charset += 26;
    if (/[0-9]/.test(pwd)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charset += 32;
    return pwd.length * (charset ? Math.log2(charset) : 0);
  };

  const detectKeyboardPatterns = (pwd) => {
    const patterns = ["qwerty", "asdf", "zxcv", "12345", "98765"];
    return patterns.some(pattern => pwd.toLowerCase().includes(pattern));
  };

  const analyzePassword = (pwd) => {
    if (!pwd) return null;

    const entropy = calculateEntropy(pwd);
    const hasPattern = detectKeyboardPatterns(pwd);
    const strengthScore = Math.min(4, Math.floor(entropy / 20));
    
    return {
      length: pwd.length,
      entropy: Math.round(entropy * 100) / 100,
      score: strengthScore,
      hasPattern,
      suggestions: [
        pwd.length < 12 ? "Use a longer password" : "",
        !/[A-Z]/.test(pwd) ? "Add uppercase letters" : "",
        !/[0-9]/.test(pwd) ? "Add numbers" : "",
        !/[^a-zA-Z0-9]/.test(pwd) ? "Add special characters" : ""
      ].filter(Boolean)
    };
  };

  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      setAnalysis(analyzePassword(password));
      setIsAnalyzing(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [password]);

  const getStrengthColor = (score) => {
    const colors = {
      0: '#ff0000',
      1: '#ff4500',
      2: '#ffd700',
      3: '#32cd32',
      4: '#00ff00'
    };
    return colors[score] || colors[0];
  };

  const getStrengthLabel = (score) => {
    const labels = {
      0: 'CRITICAL',
      1: 'VULNERABLE',
      2: 'MODERATE',
      3: 'SECURED',
      4: 'FORTRESS'
    };
    return labels[score] || labels[0];
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 font-mono">
      <div className="max-w-2xl mx-auto">
        <div className="border border-green-500 p-6 rounded-lg bg-black/50 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-6 h-6" />
            <h2 className="text-2xl font-bold tracking-wider">PASSWORD ANALYZER</h2>
          </div>

          {/* Input Section */}
          <div className="relative mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              <span className="text-sm">ENTER AUTHENTICATION KEY:</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-green-500 text-green-400 p-3 rounded 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                         placeholder-green-800"
              placeholder="Enter password for analysis..."
            />
            <div className={`absolute right-2 top-[38px] transition-opacity ${isAnalyzing ? 'opacity-100' : 'opacity-0'}`}>
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          {analysis && (
            <div className="space-y-6 animate-fadeIn">
              {/* Strength Meter */}
              <div className="border border-green-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>SECURITY LEVEL: {getStrengthLabel(analysis.score)}</span>
                  </div>
                  <span className="text-sm">RATING: {analysis.score}/4</span>
                </div>
                <div className="h-2 bg-green-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${(analysis.score + 1) * 20}%`,
                      backgroundColor: getStrengthColor(analysis.score)
                    }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-800 p-4 rounded-lg hover:bg-green-900/10 transition-colors">
                  <div className="text-sm mb-1">CHARACTER COUNT</div>
                  <div className="text-2xl">{analysis.length}</div>
                </div>
                <div className="border border-green-800 p-4 rounded-lg hover:bg-green-900/10 transition-colors">
                  <div className="text-sm mb-1">ENTROPY LEVEL</div>
                  <div className="text-2xl">{analysis.entropy.toFixed(2)}</div>
                </div>
              </div>

              {/* Warnings */}
              {analysis.hasPattern && (
                <div className="border border-red-500 bg-red-900/20 text-red-400 p-4 rounded-lg flex items-center gap-2 animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                  <span>WARNING: Common keyboard pattern detected!</span>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <div className="border border-green-800 p-4 rounded-lg">
                  <div className="text-sm mb-2">SECURITY RECOMMENDATIONS:</div>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-center gap-2 text-yellow-400">
                        <span className="text-xs">></span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;