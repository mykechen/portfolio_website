import React, { useState } from "react";
import "./MailContent.css";

const MailContent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(`Message from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.notes}`
    );
    window.open(`mailto:mykechen@usc.edu?subject=${subject}&body=${body}`, "_blank");
  };

  const emails = [
    {
      id: 1,
      sender: "Send me a message",
      subject: "Want to say hi!!",
      preview: "Use the form on the right to send me a message!",
    },
    {
      id: 2,
      sender: "Mom",
      subject: "Call me back!!!",
      preview: "You left your charger here. Again.",
    },
    {
      id: 3,
      sender: "ChatGPT",
      subject: "Your brain dump is ready",
      preview: "Click here to download your 3AM existential notes.",
    },
    {
      id: 4,
      sender: "USC CS Dept.",
      subject: "HW #4 has been assigned",
      preview: "Please submit AVL trees, BST trees, and Hash Tables before the end of the week.",
    },
    {
      id: 5,
      sender: "Varun",
      subject: "Bro you up?",
      preview: "Trying to decide between shawarma or pizza.",
    },
  ];

  const folders = [
    { id: "inbox", name: "Inbox", icon: "📥" },
    { id: "sent", name: "Sent", icon: "➤" },
    { id: "drafts", name: "Drafts", icon: "📝" },
    { id: "junk", name: "Junk", icon: "⚠️" },
    { id: "archive", name: "Archive", icon: "📦" },
  ];

  return (
    <div className="mail-content">
      {/* Left Sidebar */}
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
        {emails.map((email) => (
          <div key={email.id} className="mail-item">
            <div className="mail-item-sender">{email.sender}</div>
            <div className="mail-item-subject">{email.subject}</div>
            <div className="mail-item-preview">{email.preview}</div>
          </div>
        ))}
      </div>

      {/* Right - Compose Form */}
      <div className="mail-compose">
        <form onSubmit={handleSubmit}>
          <div className="mail-form-group">
            <span className="mail-input-icon">👤</span>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mail-form-group">
            <span className="mail-input-icon">👤</span>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mail-form-group">
            <span className="mail-input-icon">📞</span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mail-form-group">
            <span className="mail-input-icon">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mail-form-group">
            <span className="mail-input-icon mail-icon-top">📝</span>
            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              rows="8"
              required
            />
          </div>

          <button type="submit" className="mail-send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MailContent;
