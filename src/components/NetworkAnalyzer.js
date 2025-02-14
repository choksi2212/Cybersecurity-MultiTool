// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
// import { Alert, AlertDescription } from '../ui/alert';
// import { Radio } from "lucide-react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// const NetworkAnalyzer = () => {
//   const [isSniffing, setIsSniffing] = useState(false);
//   const [packets, setPackets] = useState([]);
//   const [pcapFile, setPcapFile] = useState(null);
//   const [stats, setStats] = useState({
//     totalPackets: 0,
//     protocols: {},
//     suspiciousDNS: 0,
//     arpSpoofing: 0
//   });
//   const [alerts, setAlerts] = useState([]);

//   // Simulate packet capture
//   const startSniffing = async () => {
//     setIsSniffing(true);
//     // In a real implementation, this would connect to your Python backend
//     // Here we'll simulate packet data
//     const interval = setInterval(() => {
//       const newPacket = generateMockPacket();
//       setPackets(prev => [...prev, newPacket]);
//       updateStats(newPacket);
//     }, 1000);

//     return () => clearInterval(interval);
//   };

//   const stopSniffing = () => {
//     setIsSniffing(false);
//   };

//   // Generate mock packet data
//   const generateMockPacket = () => {
//     const protocols = ['TCP', 'UDP', 'HTTP', 'ARP', 'DNS'];
//     const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    
//     return {
//       timestamp: new Date().toISOString(),
//       protocol,
//       src_ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
//       dst_ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
//       src_port: Math.floor(Math.random() * 65535),
//       dst_port: Math.floor(Math.random() * 65535),
//       length: Math.floor(Math.random() * 1500)
//     };
//   };

//   // Update statistics
//   const updateStats = (packet) => {
//     setStats(prev => ({
//       totalPackets: prev.totalPackets + 1,
//       protocols: {
//         ...prev.protocols,
//         [packet.protocol]: (prev.protocols[packet.protocol] || 0) + 1
//       },
//       suspiciousDNS: prev.suspiciousDNS,
//       arpSpoofing: prev.arpSpoofing
//     }));

//     // Simulate threat detection
//     if (Math.random() < 0.05) { // 5% chance of detecting threat
//       const threatTypes = ['ARP Spoofing', 'Suspicious DNS', 'Port Scan'];
//       const threat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
//       const newAlert = {
//         timestamp: new Date().toISOString(),
//         type: threat,
//         details: `Detected ${threat} from ${packet.src_ip}`
//       };
//       setAlerts(prev => [newAlert, ...prev]);
//     }
//   };

//   // Handle PCAP file upload
//   const handlePcapUpload = (event) => {
//     const file = event.target.files[0];
//     setPcapFile(file);
//     // In a real implementation, you would send this file to your Python backend
//     alert(`PCAP file ${file.name} selected. In a real implementation, this would be analyzed by the backend.`);
//   };

//   // Prepare chart data
//   const getProtocolChartData = () => {
//     return Object.entries(stats.protocols).map(([protocol, count]) => ({
//       protocol,
//       count
//     }));
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <div className="flex items-center gap-2 mb-6">
//         <Radio className="w-8 h-8 text-blue-500" />
//         <h1 className="text-2xl font-bold">Network Packet Analyzer</h1>
//       </div>

//       {/* Control Panel */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Control Panel</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4">
//             <button
//               onClick={isSniffing ? stopSniffing : startSniffing}
//               className={`px-4 py-2 rounded ${
//                 isSniffing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
//               } text-white`}
//             >
//               {isSniffing ? 'Stop Capture' : 'Start Capture'}
//             </button>
//             <input
//               type="file"
//               accept=".pcap"
//               onChange={handlePcapUpload}
//               className="border rounded p-1"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Packets</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">{stats.totalPackets}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Unique Protocols</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">{Object.keys(stats.protocols).length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Suspicious DNS</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">{stats.suspiciousDNS}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>ARP Spoofing</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">{stats.arpSpoofing}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Protocol Distribution Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Protocol Distribution</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={getProtocolChartData()}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="protocol" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#3b82f6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Live Packets & Alerts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Recent Packets */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Packets</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2 max-h-96 overflow-auto">
//               {packets.slice(-10).reverse().map((packet, index) => (
//                 <div key={index} className="p-2 bg-gray-50 rounded text-sm">
//                   <div className="flex justify-between">
//                     <span className="font-medium">{packet.protocol}</span>
//                     <span className="text-gray-500">
//                       {new Date(packet.timestamp).toLocaleTimeString()}
//                     </span>
//                   </div>
//                   <div>{packet.src_ip}:{packet.src_port} → {packet.dst_ip}:{packet.dst_port}</div>
//                   <div className="text-gray-500">Length: {packet.length} bytes</div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Security Alerts */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Security Alerts</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2 max-h-96 overflow-auto">
//               {alerts.map((alert, index) => (
//                 <Alert key={index} variant="destructive">
//                   <AlertDescription>
//                     <div className="flex justify-between">
//                       <span className="font-medium">{alert.type}</span>
//                       <span className="text-sm">
//                         {new Date(alert.timestamp).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <div className="text-sm">{alert.details}</div>
//                   </AlertDescription>
//                 </Alert>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default NetworkAnalyzer;














import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Radio } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const NetworkAnalyzer = () => {
  const [isSniffing, setIsSniffing] = useState(false);
  const [packets, setPackets] = useState([]);
  const [pcapFile, setPcapFile] = useState(null);
  const [stats, setStats] = useState({
    totalPackets: 0,
    protocols: {},
    suspiciousDNS: 0,
    arpSpoofing: 0
  });
  const [alerts, setAlerts] = useState([]);

  // Simulate packet capture
  const startSniffing = async () => {
    setIsSniffing(true);
    // In a real implementation, this would connect to your Python backend
    // Here we'll simulate packet data
    const interval = setInterval(() => {
      const newPacket = generateMockPacket();
      setPackets(prev => [...prev, newPacket]);
      updateStats(newPacket);
    }, 1000);

    return () => clearInterval(interval);
  };

  const stopSniffing = () => {
    setIsSniffing(false);
  };

  // Generate mock packet data
  const generateMockPacket = () => {
    const protocols = ['TCP', 'UDP', 'HTTP', 'ARP', 'DNS'];
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    
    return {
      timestamp: new Date().toISOString(),
      protocol,
      src_ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      dst_ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      src_port: Math.floor(Math.random() * 65535),
      dst_port: Math.floor(Math.random() * 65535),
      length: Math.floor(Math.random() * 1500)
    };
  };

  // Update statistics
  const updateStats = (packet) => {
    setStats(prev => ({
      totalPackets: prev.totalPackets + 1,
      protocols: {
        ...prev.protocols,
        [packet.protocol]: (prev.protocols[packet.protocol] || 0) + 1
      },
      suspiciousDNS: prev.suspiciousDNS,
      arpSpoofing: prev.arpSpoofing
    }));

    // Simulate threat detection
    if (Math.random() < 0.05) { // 5% chance of detecting threat
      const threatTypes = ['ARP Spoofing', 'Suspicious DNS', 'Port Scan'];
      const threat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const newAlert = {
        timestamp: new Date().toISOString(),
        type: threat,
        details: `Detected ${threat} from ${packet.src_ip}`
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  // Handle PCAP file upload
  const handlePcapUpload = (event) => {
    const file = event.target.files[0];
    setPcapFile(file);
    // In a real implementation, you would send this file to your Python backend
    alert(`PCAP file ${file.name} selected. In a real implementation, this would be analyzed by the backend.`);
  };

  // Prepare chart data
  const getProtocolChartData = () => {
    return Object.entries(stats.protocols).map(([protocol, count]) => ({
      protocol,
      count
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Radio className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">Network Packet Analyzer</h1>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Control Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <button
              onClick={isSniffing ? stopSniffing : startSniffing}
              className={`px-4 py-2 rounded ${
                isSniffing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isSniffing ? 'Stop Capture' : 'Start Capture'}
            </button>
            <input
              type="file"
              accept=".pcap"
              onChange={handlePcapUpload}
              className="border rounded p-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Packets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalPackets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Object.keys(stats.protocols).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suspicious DNS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.suspiciousDNS}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ARP Spoofing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.arpSpoofing}</div>
          </CardContent>
        </Card>
      </div>

      {/* Protocol Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Protocol Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getProtocolChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="protocol" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Live Packets & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Packets */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Packets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-auto">
              {packets.slice(-10).reverse().map((packet, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{packet.protocol}</span>
                    <span className="text-gray-500">
                      {new Date(packet.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div>{packet.src_ip}:{packet.src_port} → {packet.dst_ip}:{packet.dst_port}</div>
                  <div className="text-gray-500">Length: {packet.length} bytes</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-auto">
              {alerts.map((alert, index) => (
                <Alert key={index} variant="destructive">
                  <AlertDescription>
                    <div className="flex justify-between">
                      <span className="font-medium">{alert.type}</span>
                      <span className="text-sm">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm">{alert.details}</div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NetworkAnalyzer;