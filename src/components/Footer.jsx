import { Github, Linkedin, Twitter } from 'lucide-react';
import './Footer.css'; // Import the CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-title">CyberShield</h3>
            <p className="footer-subtitle">Securing your digital future</p>
          </div>
          <div className="footer-links">
            <a
              href="https://github.com/cybershield"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Github className="icon-size" />
            </a>
            <a
              href="https://linkedin.com/company/cybershield"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Linkedin className="icon-size" />
            </a>
            <a
              href="https://twitter.com/cybershield"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Twitter className="icon-size" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CyberShield. All rights reserved.</p>
          <p className="footer-developer">
            Developed by Mbit Students | mbit.ssip@example.com
          </p>
        </div>
      </div>
    </footer>
  );
}
