import React, { useState, useEffect, useRef } from 'react';
import './MailWindow.css';
import { MdExpandMore, MdExpandLess, MdArrowBack, MdMoreVert } from 'react-icons/md';
import MailRow from '../MailRow/MailRow';

export default function MailWindow({ mail, currentUserEmail, onMailDeleted, onBack, token }) {
  const [showDetails, setShowDetails] = useState(false);
  const [mailState, setMail] = useState(mail);
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [showLabelSidebar, setShowLabelSidebar] = useState(false);
  const [isLoadingLabels, setIsLoadingLabels] = useState(false);

  // Load labels from server and set selectedLabels based on mail's current labels
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

        // Set selectedLabels to the IDs of labels currently assigned to the mail
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

  // When applying labels, add new ones and remove unchecked ones from the mail
  const handleLabelApply = (e) => {
    e.preventDefault();

    // Determine labels currently on mail
    const currentLabelIds = mailState.labels ? mailState.labels.map(l => (typeof l === 'object' ? l.id : l)) : [];

    // Labels to add: selectedLabels that are not currently assigned
    const labelsToAdd = selectedLabels.filter(id => !currentLabelIds.includes(id));

    // Labels to remove: currentLabelIds that are not selected anymore
    const labelsToRemove = currentLabelIds.filter(id => !selectedLabels.includes(id));

    // Prepare promises for adding labels
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

    // Prepare promises for removing labels
    const removePromises = labelsToRemove.map(labelId =>
      fetch(`http://localhost:9090/api/mails/${mailState.id}/labels/${labelId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    // Execute all add and remove requests
    Promise.all([...addPromises, ...removePromises])
      .then(() => {
        // After updating labels, close sidebar and reload labels & mailState to sync UI
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
  if (type === 'delete' && mailId === mailState.id) {
    onMailDeleted?.(mailId);
  } else if ((type === 'spam' || type === 'unspam') && mailId === mailState.id) {
    setMail(prev => ({ ...prev, isSpam: type === 'spam' }));
  } else if (type === 'favoriteToggle' && mailId === mailState.id) {
    setMail(prev => ({ ...prev, isFavorite }));
  }
};

  const isToMe = mailState.receiverEmail === currentUserEmail;
  
  const labelPopupRef = useRef(null);

  //Close the window when the user clicks outside it
  useEffect(() => {
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
            <MdArrowBack size={24} />
          </button>
        </div>

        <div className="mail-header-right">
            <MailRow
              mailId={mailState.id}
              isFavorite={mailState.isFavorite}
              isSpam={mailState.isSpam}
              onActionDone={handleActionDone}
            />
              <div className="tooltip-container">
          <button
            onClick={() => {
              loadLabels();        // Reload labels on open to sync latest
              setShowLabelSidebar(true);
            }}
            aria-label="Label as"
            className="label-popup-trigger modern-three-dots"
          >
            <MdMoreVert size={20} />
          </button>
                <span className="tooltip-text">More</span>
    </div>
        </div>
      </div>

      <h2 className="mail-subject">{mailState.title}</h2>

      <div className="mail-header-info">
        <div className="mail-from-to">
          <strong>{mailState.senderEmail}</strong>{' '}
          <span className="mail-to">{isToMe ? 'to me' : `to ${mailState.receiverEmail}`}</span>
          <span className="details-toggle" onClick={toggleDetails}>
            {showDetails ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
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

      <div className="mail-content">{mailState.content}</div>

    {showLabelSidebar && (
      <div className="label-popup" ref={labelPopupRef}>
        <div className="label-popup-header">
          <h4>Label as</h4>
          <button
            className="label-popup-close-button"
            onClick={() => setShowLabelSidebar(false)}
            aria-label="Close"
          >
            X
          </button>
        </div>

          <div className="label-popup-body">
            {isLoadingLabels ? (
              <p style={{ fontSize: '14px' }}>Loading labels...</p>
            ) : labels.length === 0 ? (
              <p style={{ fontSize: '14px' }}>No labels found.</p>
            ) : (
              <form onSubmit={handleLabelApply}>
                <ul className="label-popup-list">
                  {labels.map(label => (
                    <li key={label.id}>
                      <label className="label-popup-label">
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
                <button type="submit" className="label-popup-submit-button">Apply</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}