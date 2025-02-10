'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css'; // Import the CSS file

const faqs = [
  {
    question: "How does CyberShield protect my network?",
    answer: "CyberShield uses advanced algorithms to monitor network traffic, detect anomalies, and prevent unauthorized access attempts in real-time."
  },
  {
    question: "Is the password manager secure?",
    answer: "Yes, our password manager uses military-grade encryption to store your passwords securely. Only you have access to your stored passwords."
  },
  {
    question: "Can CyberShield detect new, unknown threats?",
    answer: "Absolutely. Our AI-powered anomaly detection system can identify unusual patterns that may indicate new or evolving threats."
  },
  {
    question: "How often is the malware database updated?",
    answer: "Our malware database is updated continuously, with major updates pushed every hour to ensure protection against the latest threats."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="faq-icon" />
              ) : (
                <ChevronDown className="faq-icon" />
              )}
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
