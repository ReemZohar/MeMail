import React, { useState, useRef } from 'react';
import './MailWindow.css';
import MailRow from '../MailRow/MailRow';
import NewMailWindow from '../NewMailWindow/NewMailWindow';
import '../CustomLabelMenu/NewCustomLabelWindow.css';

export default function MailWindow({ mail, currentUserEmail, onMailDeleted, onBack, token }) {
  const [showDetails, setShowDetails] = useState(false);
  const [mailState, setMail] = useState(mail);
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [showLabelSidebar, setShowLabelSidebar] = useState(false);
  const [isLoadingLabels, setIsLoadingLabels] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(mailState.title);
  const [editedContent, setEditedContent] = useState(mailState.content);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);

  const loadLabels = () => {
    if (!token) return;
    setIsLoadingLabels(true);
    fetch('http://localhost:9090/api/labels', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch labels");
        return res.json();
      })
      .then(fetchedLabels => {
        setLabels(fetchedLabels);
        if (mailState.labels && Array.isArray(mailState.labels)) {
          const mailLabelIds = mailState.labels.map(l => (typeof l === 'object' ? l.id : l));
          setSelectedLabels(mailLabelIds);
        } else {
          setSelectedLabels([]);
        }
      })
      .catch(err => {
        console.error("Error loading labels:", err);
        setLabels([]);
        setSelectedLabels([]);
      })
      .finally(() => setIsLoadingLabels(false));
  };

  const handleLabelApply = (e) => {
    e.preventDefault();
    const currentLabelIds = mailState.labels ? mailState.labels.map(l => (typeof l === 'object' ? l.id : l)) : [];
    const labelsToAdd = selectedLabels.filter(id => !currentLabelIds.includes(id));
    const labelsToRemove = currentLabelIds.filter(id => !selectedLabels.includes(id));

    const addPromises = labelsToAdd.map(labelId =>
      fetch(`http://localhost:9090/api/mails/${mailState.id}/labels`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ labelId }),
      })
    );

    const removePromises = labelsToRemove.map(labelId =>
      fetch(`http://localhost:9090/api/mails/${mailState.id}/labels/${labelId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    Promise.all([...addPromises, ...removePromises])
      .then(() => {
        setShowLabelSidebar(false);
        loadLabels();
        setMail(prev => ({ ...prev, labels: selectedLabels }));
      })
      .catch(err => {
        alert('Failed to update labels: ' + err.message);
      });
  };

  const toggleDetails = () => setShowDetails(prev => !prev);

  const handleActionDone = ({ type, mailId, isFavorite }) => {
    if (mailId !== mailState.id) return;

    if (type === 'delete') {
      onMailDeleted?.(mailId);
    } else if (type === 'spam') {
      setMail(prev => ({ ...prev, isSpam: true }));
    } else if (type === 'unspam') {
      setMail(prev => ({ ...prev, isSpam: false }));
    } else if (type === 'favoriteToggle') {
      setMail(prev => ({ ...prev, isFavorite }));
    } else if (type === 'markAsUnread') {
      setMail(prev => ({ ...prev, isRead: false }));
    }
  };

  const isToMe = mailState.receiverEmail === currentUserEmail;
  const labelPopupRef = useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (labelPopupRef.current && !labelPopupRef.current.contains(event.target)) {
        setShowLabelSidebar(false);
      }
    }

    if (showLabelSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLabelSidebar]);

  return (
    <div className="mail-window">
      <div className="mail-header-bar">
        <div className="mail-header-left">
          <button className="back-button" onClick={onBack}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <MailRow
            mailId={mailState.id}
            isFavorite={mailState.isFavorite}
            isSpam={mailState.isSpam}
            isRead={mailState.isRead}
            onActionDone={handleActionDone}
            onReply={() => setIsReplying(true)}
            onFwd={() => setIsForwarding(true)}
            isItem={false}
          />
        </div>

        <div className="mail-header-right">
          {mailState.senderEmail === currentUserEmail && (
            <div className="tooltip-container">
              <button
                onClick={() => setIsEditing(true)}
                aria-label="Edit mail"
                className="buttons-trigger modern-three-dots"
              >
                <i className="bi bi-pencil icons"></i>
              </button>
              <span className="tooltip-text">Edit</span>
            </div>
          )}
          <div className="tooltip-container">
            <button
              onClick={() => {
                loadLabels();
                setShowLabelSidebar(true);
              }}
              aria-label="Label as"
              className="buttons-trigger modern-three-dots"
            >
              <i className="bi bi-three-dots-vertical icons"></i>
            </button>
            <span className="tooltip-text">More</span>
          </div>
        </div>
      </div>

      <h2 className="mail-subject">{mailState.title}</h2>

      <div className="mail-header-info">
        <div className="mail-from-to">
          <strong>{mailState.senderEmail}</strong>{' '}
          <span className="mail-to">
            {isToMe ? 'to me' : `to ${mailState.receiverEmail}`}
          </span>
          <span className="details-toggle" onClick={toggleDetails}>
            {showDetails ? <i className="bi bi-chevron-up icons"></i> : <i className="bi bi-chevron-down icons"></i>}
          </span>
        </div>

        {showDetails && (
          <div className="mail-details">
            <div><strong>from:</strong> {mailState.senderEmail} &lt;{mailState.senderName}&gt;</div>
            <div><strong>to:</strong> {mailState.receiverEmail} &lt;{mailState.receiverName}&gt;</div>
            <div><strong>date:</strong> {new Date(mailState.date || mailState.time).toLocaleString()}</div>
            <div><strong>subject:</strong> {mailState.title}</div>
          </div>
        )}
      </div>

      <hr />

      {isReplying && (
        <NewMailWindow
          index={0}
          receiver={mailState.senderEmail}
          title={mailState.title}
          content={mailState.content}
          attachments={mailState.attachments}
          onClose={() => setIsReplying(false)}
        />
      )}

      {isForwarding && (
        <NewMailWindow
          index={0}
          title={'FWD: ' + mailState.title}
          content={"---------- Forwarded message ---------\nFrom: " + mailState.senderEmail + "\n" +
            mailState.content}
          attachments={mailState.attachments}
          onClose={() => setIsForwarding(false)}
        />
      )}


      {isEditing ? (
        <>
          <input
            className="edit-title-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="edit-content-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          {error && <div className="edit-error">{error}</div>}
          <div className="edit-actions-left">
            <button
              className="btn btn-light small-button"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary small-button"
              onClick={async () => {
                setIsSaving(true);
                setError(null);
                try {
                  const res = await fetch(`http://localhost:9090/api/mails/${mailState.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      title: editedTitle,
                      content: editedContent,
                    }),
                  });
                  if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || 'Failed to update mail');
                  }
                  setMail((prev) => ({
                    ...prev,
                    title: editedTitle,
                    content: editedContent,
                  }));
                  setIsEditing(false);
                } catch (err) {
                  setError(err.message);
                } finally {
                  setIsSaving(false);
                }
              }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Done'}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mail-content">{mailState.content}</div>

          {mailState.attachments?.length > 0 && (
            <div style={{ padding: '0 16px 16px' }}>
              <h5>Attachments:</h5>
              <ul>
                {mailState.attachments.map((att, index) => {
                  const url = `http://localhost:9090/uploads/${att.storedFilename}`;
                  return (
                    <li key={index}>
                      <a
                        href={url}
                        download={att.originalname}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {att.originalname}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}

      {showLabelSidebar && (
        <div className="buttons" ref={labelPopupRef}>
          <div className="buttons-header">
            <h4>Label as</h4>
            <button
              className="buttons-close-button"
              onClick={() => setShowLabelSidebar(false)}
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div className="buttons-body">
            {isLoadingLabels ? (
              <p style={{ fontSize: '14px' }}>Loading labels...</p>
            ) : labels.length === 0 ? (
              <p style={{ fontSize: '14px' }}>No labels found.</p>
            ) : (
              <form onSubmit={handleLabelApply}>
                <ul className="buttons-list">
                  {labels.map(label => (
                    <li key={label.id}>
                      <label className="buttons-label">
                        <input
                          type="checkbox"
                          checked={selectedLabels.includes(label.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedLabels(prev =>
                              checked
                                ? [...prev, label.id]
                                : prev.filter(id => id !== label.id)
                            );
                          }}
                        />
                        {label.name}
                      </label>
                    </li>
                  ))}
                </ul>
                <button type="submit" className="buttons-submit-button">Apply</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}