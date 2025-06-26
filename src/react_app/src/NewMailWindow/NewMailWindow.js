import React, { useState, useEffect } from 'react';
import './NewMailWindow.css';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function NewMailWindow({ index = 0, onClose, title = '', receiver = '', content = '', token, attachments = [] }) {
  const navigate = useNavigate();

  const receiverFmt = receiver ? '---\n' + receiver + ":\n" : "";
  const [formData, setFormData] = useState({
    receiver: receiver,
    title: receiver !== '' ? 'RE: ' + title : title,
    content: title !== '' ? receiverFmt + content + "\n---\n" : content,
  });

  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const sendMail = async () => {
    const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('receiver', formData.receiver);
    form.append('title', formData.title);
    form.append('content', formData.content);

    // Filter out files that are already in forwarded attachments
    const forwardedNames = attachments.map(att => att.originalname);
    const uniqueFiles = files.filter(file => !forwardedNames.includes(file.name));

    uniqueFiles.forEach(file => form.append('attachments', file));

    // Add forwarded attachments explicitly to server
    attachments.forEach(att => {
      form.append('forwardedAttachments', JSON.stringify(att));
    });

    try {
      const response = await fetch('http://localhost:9090/api/mails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
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
  const forwardedNames = attachments.map(att => att.originalname);
  const uniqueFiles = files.filter(file => !forwardedNames.includes(file.name));

  return (
    <div className="mail-popup right-align" style={{ right: `${rightOffset}px` }}>
      <div className="mail-header">
        <span>New Message</span>
        <button className="close-btn" onClick={handleClose}><MdClose /></button>
      </div>
      <form className="mail-form" onSubmit={handleSubmit}>
        <input
          className="form-control"
          name="receiver"
          placeholder="To"
          value={formData.receiver}
          onChange={handleChange}
          required
        />
        <input
          className="form-control"
          name="title"
          placeholder="Subject"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control"
          name="content"
          placeholder="Compose your message..."
          value={formData.content}
          onChange={handleChange}
          required
        />

        <label className="custom-file-upload">
          <input type="file" multiple onChange={handleFileChange} />
          📎 Attach files
        </label>

        {uniqueFiles.length > 0 && (
          <div className="attached-files">
            {uniqueFiles.map((file, idx) => (
              <div key={idx}>{file.name}</div>
            ))}
          </div>
        )}

        {/* Display forwarded attachments if any */}
        {attachments.length > 0 && (
          <div className="forwarded-attachments">
            <p style={{ fontWeight: 'bold' }}>Forwarded attachments:</p>
            <ul>
              {attachments.map((att, index) => {
                const url = `http://localhost:9090/uploads/${att.storedFilename}`;
                return (
                  <li key={index}>
                    <a href={url} download={att.originalname} target="_blank" rel="noopener noreferrer">
                      {att.originalname}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {error && <div className="text-danger mb-2">{error}</div>}

        <div className="mail-actions">
          <button type="submit" className="btn-send">Send</button>
        </div>
      </form>
    </div>
  );
}

export default NewMailWindow;