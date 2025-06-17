import React, { useState } from 'react';
import './MailWindow.css';
import { MdExpandMore, MdExpandLess, MdArrowBack } from 'react-icons/md';
import MailRow from '../MailRow/MailRow';

export default function MailWindow({ mail, currentUserEmail, onMailDeleted, onBack }) {
  const [showDetails, setShowDetails] = useState(false);
  const [mailState, setMail] = useState(mail);

  if (!mailState) return <div>Loading...</div>;

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  const handleActionDone = ({ type, mailId, favorite }) => {
    if (type === 'delete' && mailId === mailState.id) {
      onMailDeleted?.(mailId);
    } else if ((type === 'spam' || type === 'unspam') && mailId === mailState.id) {
      setMail(prev => ({ ...prev, spam: type === 'spam' }));
    } else if (type === 'favoriteToggle' && mailId === mailState.id) {
      setMail(prev => ({ ...prev, favorite }));
    }
  };

  const isToMe = mailState.receiver === currentUserEmail;

  return (
    <div className="mail-window">
      <div className="mail-header-bar">
        <div className="back-button-tooltip-container">
          <button className="back-button" onClick={onBack}>
            <MdArrowBack size={24} />
          </button>
          <span className="back-button-tooltip-text">Back</span>
        </div>

        <div className="mail-row-wrapper">
          <MailRow
            mailId={mailState.id}
            isFavorite={mailState.favorite}
            isSpam={mailState.spam}
            onActionDone={handleActionDone}
          />
        </div>
      </div>

      <h2 className="mail-subject">{mailState.title}</h2>

      <div className="mail-header-info">
        <div className="mail-from-to">
          <strong>{mailState.senderName}</strong>{' '}
          <span className="mail-to">
            {isToMe ? 'to me' : `to ${mailState.receiver}`}
          </span>
          <span className="details-toggle" onClick={toggleDetails}>
            {showDetails ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
          </span>
        </div>

        {showDetails && (
          <div className="mail-details">
            <div><strong>from:</strong> {mailState.senderName} &lt;{mailState.sender}&gt;</div>
            <div><strong>to:</strong> {mailState.receiverName || `"${mailState.receiver}"`} &lt;{mailState.receiver}&gt;</div>
            <div><strong>date:</strong> {new Date(mailState.date).toLocaleString()}</div>
            <div><strong>subject:</strong> {mailState.title}</div>
          </div>
        )}
      </div>

      <hr />

      <div className="mail-content">
        {mailState.content}
      </div>
    </div>
  );
}