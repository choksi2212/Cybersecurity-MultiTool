import { Shield, Eye, Key, AlertTriangle } from 'lucide-react';
import './FeatureCards.css'; // Import the CSS file

const features = [
  {
    title: "Network Monitoring",
    description: "Real-time packet sniffing and network traffic analysis.",
    icon: Eye
  },
  {
    title: "Malware Detection",
    description: "Advanced algorithms to identify and neutralize threats.",
    icon: Shield
  },
  {
    title: "Password Manager",
    description: "Securely store and manage your passwords across devices.",
    icon: Key
  },
  {
    title: "Anomaly Detection",
    description: "AI-powered system to detect network anomalies and phishing attempts.",
    icon: AlertTriangle
  }
  ,
  {
    title: "Image Forensics",
    description: "Analyzes image metadata and checks for tempering",
    icon: AlertTriangle
  }
  ,
  {
    title: "Keystroke Authentication",
    description: "Uses typing dynamics for authentication",
    icon: AlertTriangle
  }
  ,
  {
    title: "Packet Sniffer",
    description: "Captures and analyez network sniffer",
    icon: AlertTriangle
  }
  ,
  {
    title: "Password checker",
    description: "Evaluates password strength",
    icon: AlertTriangle
  }
  ,
  {
    title: "Steganography",
    description: "Hides and data in images",
    icon: AlertTriangle
  }
];

export default function FeatureCards() {
  return (
    <section id="features" className="features-container">
      <h2 className="features-title">Our Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <feature.icon className="feature-icon" />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
