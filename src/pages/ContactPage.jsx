import React, { useState } from "react";
import StaticPage from "../components/StaticPage";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <StaticPage
      title="Contact us"
      intro="Prototype form — hook to email or CRM when you go live."
    >
      {sent ? (
        <p className="page-muted">
          Thanks for reaching out — we will get back to you within one business
          day.
        </p>
      ) : (
        <form className="contact-form card-panel" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              className="input"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange("name")}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-subject">
              Subject
            </label>
            <input
              id="contact-subject"
              className="input"
              placeholder="What can we help with?"
              value={formData.subject}
              onChange={handleChange("subject")}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-phone">
              Phone (optional)
            </label>
            <input
              id="contact-phone"
              className="input"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange("phone")}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              className="input"
              rows={5}
              placeholder="Tell us what you need support with."
              value={formData.message}
              onChange={handleChange("message")}
              required
            />
          </div>
          <div className="form-info">
            We typically reply within 24 hours on business days.
          </div>
          <button type="submit" className="btn btn-buy-now">
            Send message
          </button>
        </form>
      )}
    </StaticPage>
  );
}

export default ContactPage;
