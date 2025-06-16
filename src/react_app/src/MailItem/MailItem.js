import React, { useState } from 'react';
import MailRow from '../MailRow/MailRow';
import './MailItem.css';

function MailItem({ mail, onMailDeleted, onMailMovedToSpam, onMailFavoriteToggled }) {
  const [folder, setFolder] = useState(mail.folder);
  const [isFavorite, setIsFavorite] = useState(mail.favorite);
  const [isSpam, setIsSpam] = useState(mail.spam);

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

  if (folder === 'deleted') return null;

  const formattedDate = new Date(mail.date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  const shortContent = mail.content.length > 100 ? mail.content.slice(0, 100) + '...' : mail.content;

  return (
    <div className={`MailItem ${folder}`}>
      <div className="MailItem-left">
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