import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, Key, AlertTriangle } from "lucide-react";
import "./FeatureCards.css";

const features = [
  { icon: <Eye />, title: "Network Monitoring", desc: "Real-time packet sniffing and network traffic analysis.", path: "/network-analyzer" },
  { icon: <AlertTriangle />, title: "Image Forensics", desc: "Analyzes image metadata and checks for tampering.", path: "/image-forensics" },
  { icon: <Key />, title: "Keystroke Logger", desc: "Records and analyzes keystroke patterns.", path: "/keystroke-logger" },
  { icon: <Shield />, title: "Password Checker", desc: "Evaluates password strength.", path: "/password-checker" }
];

const FeatureCards = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="features-container">
      <h2 className="features-title">Our Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.desc}</p>
            <button className="feature-button" onClick={() => navigate(feature.path)}>
              Explore
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;