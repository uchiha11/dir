import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ContactSection: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Option 1: Simple mailto link (opens user's email client)
      const subject = `Portfolio Contact: ${formData.projectType || 'General Inquiry'}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:dhineshtamil15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      // For now, show success after opening email client
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
      }, 1000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`contact-section ${isDark ? 'dark' : 'light'}`}>
      <h2 className="section-title">GET IN TOUCH</h2>
      <div className="contact-content">
        <div className="contact-info">
          <p>Ready to bring your story to life?</p>
          <div className="contact-details">
            <a href="mailto:dhineshtamil15@gmail.com">dhineshtamil15@gmail.com</a>
            <a href="tel:+917010078126">+91 701 0078126</a>
            <span>Chennai, Tamil Nadu</span>
          </div>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <input
              type="text"
              name="projectType"
              placeholder="PROJECT TYPE"
              value={formData.projectType}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            <textarea
              name="message"
              placeholder="MESSAGE"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
            {submitStatus === 'success' && (
              <p className="form-message success">
                ✓ Message created successfully! Your email client should have opened.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="form-message error">
                ✗ Failed to send message. Please try again or contact directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;