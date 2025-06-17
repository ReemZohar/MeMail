import React, { useState } from 'react';
import './MailWindow.css';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export default function MailWindow({ mail, currentUserEmail }) {
  const [showDetails, setShowDetails] = useState(false);

  if (!mail) return <div>Loading...</div>;

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  const isToMe = mail.receiver === currentUserEmail;  //If the current user is the sender

  return (
    <div className="mail-window">
      <h2 className="mail-subject">{mail.title}</h2>

      <div className="mail-header-info">
        <div className="mail-from-to">
          <strong>{mail.senderName}</strong>{' '}
          <span className="mail-to">
            {isToMe ? 'to me' : `to ${mail.receiver}`}
          </span>
          <button className="details-toggle" onClick={toggleDetails}>
            {showDetails ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
          </button>
        </div>
        {showDetails && (
          <div className="mail-details">
            <div><strong>from:</strong> {mail.senderName} &lt;{mail.sender}&gt;</div>
            <div><strong>to:</strong> {mail.receiverName || `"${mail.receiver}"`} &lt;{mail.receiver}&gt;</div>
            <div><strong>date:</strong> {new Date(mail.date).toLocaleString()}</div>
            <div><strong>subject:</strong> {mail.title}</div>
          </div>
        )}
      </div>

      <hr />

      <div className="mail-content">
        {mail.content}
      </div>
    </div>
  );
}