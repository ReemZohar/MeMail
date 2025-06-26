import React, { useState } from 'react';
import './NewMailWindow.css';
import { useNavigate } from 'react-router-dom';

function NewMailWindow({ index = 0, onClose, title='', receiver='', content='', token }) {
  const navigate = useNavigate();
  
  const receiverFmt = receiver ? '---\n' + receiver + ":\n" : "";
  const [formData, setFormData] = useState({
    receiver: receiver,
    title: receiver !== '' ? 'RE: ' + title : title,
    content: title !== '' ? receiverFmt + content + "\n---\n" : content,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sendMail = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:9090/api/mails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/mail?folder=inbox');
        onClose();

      } else {
        const error = await response.json();
        alert('Failed to send mail: ' + error.error);
      }
    } catch (err) {
      alert('Error sending mail: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.receiver || !formData.title || !formData.content) {
      setError('All fields are required.');
      return;
    }

    setError(null);
    await sendMail();
  };

  const handleClose = async () => {
    const { receiver, title, content } = formData;

    const isEmpty = !receiver && !title && !content;
    if (isEmpty) {
      onClose();
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/api/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error('Failed to save draft');
      }
    } catch (err) {
      console.error('Error saving draft:', err);
    }

    onClose();
  };

  const rightOffset = 20 + index * 620;

  return (
    <div className="mail-popup shadow" style={{ right: `${rightOffset}px` }}>
      <div className="mail-header d-flex justify-content-between align-items-center">
        <span>New Message</span>
        <div className="mail-header-icons">
          {/* <i className="bi bi-dash icon" /> */}
          <i
            className="bi bi-x icon icon-close"
            onClick={handleClose}
            aria-label="Close"
          />
        </div>
      </div>
      <form className="mail-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="receiver"
          className="form-control"
          placeholder="To"
          value={formData.receiver}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Subject"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          className="form-control"
          placeholder="Compose your message..."
          value={formData.content}
          onChange={handleChange}
          required
        />
        {error && <div className="text-danger mb-2">{error}</div>}
        <div className="mail-actions">
          <button type="submit" className="btn btn-send">Send</button>
          <div className="icon-bar">
            <i className="bi bi-paperclip icon"></i>
            <i className="bi bi-image icon"></i>
            <i className="bi bi-three-dots-vertical icon"></i>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewMailWindow;