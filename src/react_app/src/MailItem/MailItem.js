import React, { useState } from 'react';
import MailRow from '../MailRow/MailRow';
import './MailItem.css';

function MailItem({ mail, isSelected, whenSelected, onMailDeleted, onMailMovedToSpam, onMailFavoriteToggled, onOpenMail }) {
  const [folder, setFolder] = useState(mail.folder);
  const [isFavorite, setIsFavorite] = useState(mail.favorite);
  const [isSpam, setIsSpam] = useState(mail.spam);
  const [isRead, setIsRead] = useState(mail.isRead ?? false);

  const handleActionDone = ({ type, mailId, favorite }) => {
    if (type === 'delete') {
      onMailDeleted(mailId);
    } else if (type === 'spam') {
      setFolder('spam');
      onMailMovedToSpam(mailId);
    } else if (type === 'favoriteToggle') {
      setIsFavorite(favorite);
      onMailFavoriteToggled?.(mailId, favorite);
    }
  };

  const handleClick = async () => {
    if (!isRead) {
      try {
        const res = await fetch(`http://localhost:9090/api/mails/${mail.id}/isRead`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ isRead: true })
        });
        if (res.ok) {
          setIsRead(true);
        }
      } catch (err) {
        console.error('Failed to mark mail as read:', err);
      }
    }

    if (onOpenMail) {
      onOpenMail(mail);
    }
  };

  if (folder === 'deleted') return null;

  const formattedDate = new Date(mail.date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  const shortContent = mail.content && mail.content.length > 100
    ? mail.content.slice(0, 100) + '...'
    : mail.content || '';

  return (
    <div
      className={`MailItem ${folder} ${isRead ? 'read' : 'unread'}`}
      onClick={handleClick}
    >
      <div className="MailItem-left">
        <input
          type="checkbox"
          className="checkBox"
          checked={isSelected}
          onChange={() => whenSelected(mail.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="MailItem-sender" title={mail.sender}>{mail.sender}</div>
      </div>

      <div className="MailItem-center">
        <div className="MailItem-title-content">
          <span className="MailItem-title">{mail.title}</span>
          <span className="MailItem-separator">–</span>
          <span className="MailItem-snippet">{shortContent}</span>
        </div>
      </div>

      <div className="MailItem-right">
        <div className="MailItem-date">{formattedDate}</div>
        <MailRow
          mailId={mail.id}
          title={mail.title}
          content={mail.content}
          isFavorite={isFavorite}
          isSpam={isSpam}
          onActionDone={handleActionDone}
        />
      </div>
    </div>
  );
}

export default MailItem;