// import React, { useState, useEffect } from "react";
// import axios from "axios";




// const WAFDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/waf_dashboard");
//       setDashboardData(response.data);
//     } catch (err) {
//       setError("Failed to fetch WAF Dashboard data");
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="container mx-auto p-4 max-w-lg">
//       <h2 className="text-xl font-bold mb-4">Web Application Firewall Dashboard</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {dashboardData ? (
//         <div className="mt-4 p-4 border rounded bg-gray-100">
//           <h3 className="text-lg font-semibold">WAF Analytics</h3>
//           <pre className="text-sm p-2 rounded overflow-auto">
//             {JSON.stringify(dashboardData, null, 2)}
//           </pre>
//         </div>
//       ) : (
//         <p className="text-gray-500">Loading WAF data...</p>
//       )}
//     </div>
//   );
// };

// export default WAFDashboard;



import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Shield, AlertTriangle, History, BookOpen, Upload } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const WAFDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [rules, setRules] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [payload, setPayload] = useState('');
  const [stats, setStats] = useState({
    totalBlocked: 0,
    signatureMatches: 0,
    aiDetections: 0
  });

  // Fetch logs from API
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/logs');
      const data = await response.json();
      const flattenedLogs = Object.values(data).flat();
      setLogs(flattenedLogs);
      
      // Calculate stats
      const blocked = flattenedLogs.length;
      const signatures = flattenedLogs.filter(log => log.detection_type === 'Signature Match').length;
      const ai = flattenedLogs.filter(log => log.detection_type === 'AI Detected Malicious Activity').length;
      
      setStats({
        totalBlocked: blocked,
        signatureMatches: signatures,
        aiDetections: ai
      });
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // Generate new rules
  const generateRules = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate_rules', {
        method: 'POST'
      });
      const data = await response.json();
      setRules(data.rules);
    } catch (error) {
      console.error('Error generating rules:', error);
    }
  };

  // Scan payload
  const scanPayload = async () => {
    try {
      const response = await fetch('http://localhost:5000/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload })
      });
      const data = await response.json();
      setScanResult(data);
      if (data.status === 'Blocked') {
        fetchLogs(); // Refresh logs after blocked request
      }
    } catch (error) {
      console.error('Error scanning payload:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Prepare chart data
  const getChartData = () => {
    const last24Hours = [...Array(24)].map((_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - i);
      return {
        hour: date.getHours(),
        attacks: logs.filter(log => {
          const logDate = new Date(log.timestamp);
          return logDate.getHours() === date.getHours();
        }).length
      };
    }).reverse();
    return last24Hours;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">AI-Powered WAF Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalBlocked}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Signature Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.signatureMatches}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Detections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.aiDetections}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attack Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Attack Activity (Last 24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attacks" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Payload Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Payload Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full h-32 p-2 border rounded"
              placeholder="Enter payload to scan..."
            />
            <button
              onClick={scanPayload}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Scan Payload
            </button>
            {scanResult && (
              <Alert variant={scanResult.status === 'Blocked' ? 'destructive' : 'default'}>
                <AlertDescription>
                  Status: {scanResult.status} - {scanResult.reason}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Attack Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {logs.slice(-5).map((log, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">IP: {log.ip}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Payload: {log.payload}
                </div>
                <div className="text-sm text-red-500">
                  Detection: {log.detection_type}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Security Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <button
            onClick={generateRules}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Generate New Rules
          </button>
          <div className="mt-4 space-y-2">
            {rules.map((rule, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded">
                {rule}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WAFDashboard;