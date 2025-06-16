import React, { useState, useEffect, useRef } from 'react';
import './NewMailWindow.css';
import { MdClose, MdAttachFile, MdInsertPhoto, MdMoreVert } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function NewMailWindow() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    receiver: '',
    title: '',
    content: ''
  });

  const [error, setError] = useState(null);
  const draftIdRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Auto-save draft after typing (debounced)
  useEffect(() => {
    if (!formData.title && !formData.content && !formData.receiver) return;

    const saveDraft = async () => {
      const token = localStorage.getItem('token');
      const method = draftIdRef.current ? 'PUT' : 'POST';
      const url = draftIdRef.current
        ? `/api/draft/${draftIdRef.current}`
        : `/api/draft`;

      try {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const data = await res.json();
          if (!draftIdRef.current && data.id !== undefined) {
            draftIdRef.current = data.id;
          }
        }
      } catch (err) {
        console.error('Auto-save draft failed:', err);
      }
    };

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(saveDraft, 2000);

    return () => clearTimeout(timeoutRef.current);
  }, [formData]);

  // Save draft on unmount
  useEffect(() => {
    return () => {
      if (formData.title || formData.content || formData.receiver) {
        const blob = new Blob([JSON.stringify(formData)], { type: 'application/json' });
        const url = draftIdRef.current
          ? `/api/draft/${draftIdRef.current}`
          : `/api/draft`;

        navigator.sendBeacon?.(url, blob);
      }
    };
  }, []);

  const sendMail = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/mails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          draftId: draftIdRef.current
        }),
      });

      if (response.ok) {
        alert('Mail sent successfully');
        draftIdRef.current = null;
        navigate('/inbox');
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

  return (
    <div className="mail-popup shadow">
      <div className="mail-header d-flex justify-content-between align-items-center">
        <span>New Message</span>
        <MdClose style={{ cursor: 'pointer' }} size={20} onClick={() => navigate('/inbox')} />
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
