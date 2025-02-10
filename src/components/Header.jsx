
import './Header.css'; // Import the CSS file

export default function Header() {
  return (
    <header className="header">
      <nav className="header-container">
        <a href="/" className="header-logo">CyberShield</a>
        <div className="header-links">
          <a href="#features" className="header-link">Features</a>
          <a href="#social-proof" className="header-link">Testimonials</a>
          <a href="#faq" className="header-link">FAQ</a>
        </div>
      </nav>
    </header>
  );
}
