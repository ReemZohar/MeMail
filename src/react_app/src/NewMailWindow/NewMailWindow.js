import React, { useState } from 'react';
import './NewMailWindow.css';
import { MdClose, MdAttachFile, MdInsertPhoto, MdMoreVert, MdMinimize } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function NewMailWindow({ index = 0, onClose, token }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    receiver: '',
    title: '',
    content: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sendMail = async () => {
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
        alert('Mail sent successfully');
        navigate('/mail?folder=inbox');
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
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Optional minimize button (if you add logic later) */}
          {/* <MdMinimize size={20} onClick={handleMinimize} style={{ cursor: 'pointer' }} /> */}
          <MdClose size={20} onClick={handleClose} style={{ cursor: 'pointer' }} />
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
            <MdAttachFile size={20} />
            <MdInsertPhoto size={20} />
            <MdMoreVert size={20} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewMailWindow;
