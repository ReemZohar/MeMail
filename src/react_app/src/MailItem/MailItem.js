import React, { useState } from 'react';
import MailRow from '../MailRow/MailRow';
import './MailItem.css';

function MailItem({ mail, folder, isSelected, whenSelected, onMailDeleted, onMailMovedToSpam, onMailFavoriteToggled, onOpenMail }) {
  const [mailState, setMailState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRead, setIsRead] = useState(false);

  const isDraft = folder === 'drafts';

  // Load full mail details (including senderName etc.) from backend
  React.useEffect(() => {
    const fetchMailDetails = async () => {
      try {
        const endpoint = isDraft
          ? `http://localhost:9090/api/draft/${mail.id}`
          : `http://localhost:9090/api/mails/${mail.id}`;

        const res = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch mail: ${res.statusText}`);
        }
        const data = await res.json();
        setMailState(data);
        setIsRead(data.isRead ?? false);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMailDetails();
  }, [mail.id, isDraft]);

  if (loading) return <div>Loading mail...</div>;
  if (error) return <div>Error loading mail: {error}</div>;
  if (!mailState) return null;

  const handleActionDone = ({ type, mailId, isFavorite }) => {
    if (type === 'delete') {
      onMailDeleted(mailId);
    } else if (type === 'spam') {
      onMailMovedToSpam(mailId);
    } else if (type === 'unspam') {
    } else if (type === 'favoriteToggle') {
      onMailFavoriteToggled?.(mailId, isFavorite);
    } else if (type === 'markAsUnread') {
      setMailState(prev => ({ ...prev, isRead: false }));
    }
  };

  const handleClick = async () => {
    if (!isDraft && !isRead) {
      try {
        const res = await fetch(`http://localhost:9090/api/mails/${mailState.id}/isRead`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ isRead: true }),
        });
        if (res.ok) {
          setIsRead(true);
        }
      } catch (err) {
        console.error('Failed to mark mail as read:', err);
      }
    }

    onOpenMail?.(mailState);
  };

  if (mailState.folder === 'deleted') return null;

  const formattedDate = new Date(mailState.time || mailState.date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  const shortContent = mailState.content && mailState.content.length > 100
    ? mailState.content.slice(0, 100) + '...'
    : mailState.content || '';

  return (
    <div
      className={`MailItem ${mailState.folder} ${isRead ? 'read' : 'unread'}`}
      onClick={handleClick}
    >
      <div className="MailItem-left">
        <input
          type="checkbox"
          className="checkBox"
          checked={isSelected}
          onChange={() => whenSelected(mailState.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="MailItem-sender" title={mailState.senderEmail}>
          {mailState.senderName || mailState.senderEmail}
        </div>
      </div>

      <div className="MailItem-center">
        <div className="MailItem-title-content">
          <span className="MailItem-title">{mailState.title}</span>
          <span className="MailItem-separator">–</span>
          <span className="MailItem-snippet">{shortContent}</span>
        </div>
      </div>

      <div className="MailItem-right">
        <div className="MailItem-date">{formattedDate}</div>
        <MailRow
          mailId={mailState.id}
          title={mailState.title}
          content={mailState.content}
          isFavorite={mailState.isFavorite}
          isSpam={mailState.isSpam}
          isDraft={isDraft}
          onActionDone={handleActionDone}
          isItem={true}
        />
      </div>
    </div>
  );
}

export default MailItem;
