import './SocialProof.css'; // Import the CSS file

const testimonials = [
  {
    name: "Pratik kuhad",
    company: "Tech Corp",
    quote: "CyberShield has revolutionized our security infrastructure. Highly recommended!"
  },
  {
    name: "Susmita sen",
    company: "Data Inc",
    quote: "The best cyber security tool we've used. It's user-friendly and extremely effective."
  },
  {
    name: "Mahesh Joshi",
    company: "Secure Systems",
    quote: "CyberShield's anomaly detection has saved us from numerous potential breaches."
  }
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="social-proof">
      <div className="social-proof-container">
        <h2 className="social-proof-title">What Our Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <p className="testimonial-name">{testimonial.name}</p>
              <p className="testimonial-company">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
