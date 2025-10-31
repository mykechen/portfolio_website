import React, { useState } from "react";
import { MdPerson, MdPhone, MdEmail, MdNotes } from "react-icons/md";
import { sendContactEmail, validateFormData } from "../../../services/emailService";
import { folders, mockEmails, initialFormData } from "./mailConstants.jsx";
import "./MailContent.css";

const MailContent = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const { isValid, errors } = validateFormData(formData);
    if (!isValid) {
      alert(errors.join('\n'));
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactEmail(formData);
      alert('Message sent successfully!');
      // Clear form on success
      setFormData(initialFormData);
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mail-content">
      {/* Left Sidebar - Folders */}
      <div className="mail-sidebar">
        {folders.map((folder) => (
          <div key={folder.id} className="mail-folder">
            <span className="mail-folder-icon">{folder.icon}</span>
            <span className="mail-folder-name">{folder.name}</span>
          </div>
        ))}
      </div>

      {/* Middle - Email List */}
      <div className="mail-list">
        {mockEmails.map((email) => (
          <div key={email.id} className="mail-item">
            <span className={`mail-unread-dot ${email.unread ? 'visible' : ''}`}></span>
            <div className="mail-item-content">
              <div className="mail-item-sender">{email.from}</div>
              <div className="mail-item-subject">{email.subject}</div>
              <div className="mail-item-preview">{email.preview}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right - Contact Form */}
      <div className="mail-compose">
        <form onSubmit={handleSubmit}>
          <div className="mail-form-group">
            <span className="mail-input-icon">
              <MdPerson />
            </span>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="mail-form-group">
            <span className="mail-input-icon">
              <MdPerson />
            </span>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="mail-form-group">
            <span className="mail-input-icon">
              <MdPhone />
            </span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="mail-form-group">
            <span className="mail-input-icon">
              <MdEmail />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="mail-form-group">
            <span className="mail-input-icon mail-icon-top">
              <MdNotes />
            </span>
            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              rows="8"
              disabled={isSubmitting}
              required
            />
          </div>

          <button
            type="submit"
            className="mail-send-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MailContent;
