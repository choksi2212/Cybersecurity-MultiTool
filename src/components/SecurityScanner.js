import React, { useState, useEffect } from "react";
import axios from "axios";

const SecurityScanner = () => {
  const [payload, setPayload] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scanPayload = async () => {
    if (!payload) {
      setError("Payload cannot be empty");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/scan", { payload });
      setScanResult(response.data);
    } catch (err) {
      setError("Failed to scan payload");
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/logs");
      setLogs(response.data);
    } catch (err) {
      setError("Failed to fetch logs");
    }
  };

  const generateRules = async () => {
    try {
      const response = await axios.post("http://localhost:5000/generate_rules");
      setRules(response.data.rules);
    } catch (err) {
      setError("Failed to generate rules");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-xl font-bold mb-4">AI-Powered Security Scanner</h2>
      <input
        type="text"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        className="border p-2 w-full rounded mb-2"
        placeholder="Enter payload to scan"
      />
      <button
        onClick={scanPayload}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        disabled={loading}
      >
        {loading ? "Scanning..." : "Scan Payload"}
      </button>
      <button onClick={fetchLogs} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Fetch Logs</button>
      <button onClick={generateRules} className="bg-yellow-500 text-white px-4 py-2 rounded">Generate Rules</button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {scanResult && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">Scan Result</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(scanResult, null, 2)}
          </pre>
        </div>
      )}
      {logs.length > 0 && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">Attack Logs</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(logs, null, 2)}
          </pre>
        </div>
      )}
      {rules.length > 0 && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">Generated Rules</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(rules, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SecurityScanner;
