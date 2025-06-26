import React, { useState, useEffect } from 'react';
import MailItem from '../MailItem/MailItem';
import SelectedMailsAction from '../SelectedMailsAction/SelectedMailsAction';
import './MailList.css';

function MailList({ folder = 'inbox', isFavorite, sender, date, token, labelId, onOpenMail, mailsOverride }) {
  const [page, setPage] = useState(0);
  const [mails, setMails] = useState([]);
  const [selectedMails, setSelectedMails] = useState(new Set());
  const mailsPerPage = 50;

  const fetchMails = async () => {
    try {
      const params = new URLSearchParams();
      if (folder && folder !== 'drafts' && !labelId) params.append('folder', folder);
      if (isFavorite !== undefined) params.append('isFavorite', isFavorite);
      if (sender) params.append('sender', sender);
      if (date) params.append('date', date);
      if (labelId) params.append('labelId', labelId);
      console.log(folder);
      const endpoint =
        folder === 'drafts'
          ? 'http://localhost:9090/api/draft'
          : `http://localhost:9090/api/mails?${params.toString()}`;

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch mails');

      const data = await response.json();
      setMails(data);
      setPage(0);
      setSelectedMails(new Set());
    } catch (err) {
      console.error('Error loading mails:', err);
    }
  };

  useEffect(() => {
    if (mailsOverride) {
      setMails(mailsOverride);
      setPage(0);
      setSelectedMails(new Set());
    } else {
      fetchMails();
    }
  }, [mailsOverride, folder, isFavorite, sender, date, labelId]);

  const handleMailDeleted = (mailId) => {
    setMails(prev => prev.filter(mail => mail.id !== mailId));
    setSelectedMails(prev => {
      const newSet = new Set(prev);
      newSet.delete(mailId);
      return newSet;
    });
  };

  const handleMailMovedToSpam = (mailId) => {
    setMails(prev => prev.filter(mail => mail.id !== mailId));
    setSelectedMails(prev => {
      const newSet = new Set(prev);
      newSet.delete(mailId);
      return newSet;
    });
  };

  const handleCancelSelection = () => {
    setSelectedMails(new Set());
  };

  const handleMailFavoriteToggled = (mailId, isFavorite) => {
    setMails(prev =>
      prev.map(mail => (mail.id === mailId ? { ...mail, isFavorite } : mail))
    );
  };

  const handleNext = () => {
    if ((page + 1) * mailsPerPage < mails.length) {
      setPage(prev => prev + 1);
      setSelectedMails(new Set());
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
      setSelectedMails(new Set());
    }
  };

  const handleRefresh = () => {
    fetchMails();
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const currentPageMails = displayedMails.map(mail => mail.id);

    setSelectedMails(prev => {
      const newSet = new Set(prev);
      currentPageMails.forEach(id => {
        if (isChecked) newSet.add(id);
        else newSet.delete(id);
      });
      return newSet;
    });
  };

  const handleSpamToggleSelected = async () => {
    const actionType = folder === 'spam' ? 'unspam' : 'spam';
    const baseUrl = 'http://localhost:9090/api/mails';

    for (const mailId of selectedMails) {
      try {
        const response = await fetch(`${baseUrl}/${mailId}/${actionType}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          if (actionType === 'spam') handleMailMovedToSpam(mailId);
          else fetchMails();
        }
      } catch (err) {
        console.error(`Error performing ${actionType} on mail ${mailId}:`, err);
      }
    }
    setSelectedMails(new Set());
  };

const performActionOnSelected = async (actionType) => {
  const isDraft = folder === 'drafts';
  const baseUrl = isDraft
    ? 'http://localhost:9090/api/draft'
    : 'http://localhost:9090/api/mails';

  for (const mailId of selectedMails) {
    try {
      let response;
      if (actionType === 'delete') {
        response = await fetch(`${baseUrl}/${mailId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 204) {
          handleMailDeleted(mailId);
        }
      }
    } catch (err) {
      console.error(`Error performing ${actionType} on mail ${mailId}:`, err);
    }
  }
  setSelectedMails(new Set());
};

  const sortedMails = [...mails].sort((a, b) => new Date(b.date) - new Date(a.date));
  const startIndex = page * mailsPerPage;
  const displayedMails = sortedMails.slice(startIndex, startIndex + mailsPerPage);

  const allSelected = displayedMails.length > 0 && displayedMails.every(mail => selectedMails.has(mail.id));
  const hasSelection = selectedMails.size > 0;

  return (
    <div className="mail-list-wrapper">
      <div className="MailList-header">
        <div className="MailList-btns-group">
          <div className="tooltip-container checkBox">
            <label>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                aria-label="Select All Mails"
              />
            </label>
            <span className="tooltip-text">Select All</span>
          </div>

          {hasSelection ? (
            <SelectedMailsAction
              inSpamFolder={folder === 'spam'}
              onSpamToggle={handleSpamToggleSelected}
              onDelete={() => performActionOnSelected('delete')}
              onCancel={handleCancelSelection}
            />
          ) : (
            <button onClick={handleRefresh} className="MailList-btn" aria-label="Refresh">
              <i className="bi bi-arrow-clockwise" style={{ fontSize: 20 }}></i>
            </button>
          )}
          <span className="tooltip-text">{hasSelection ? 'Selected actions' : 'Refresh'}</span>
        </div>

        <div className="MailList-pagination">
          <div className="tooltip-container">
            <button onClick={handlePrev} disabled={page === 0} className="MailList-btn" aria-label="Newer">
              <i className="bi bi-chevron-left" style={{ fontSize: 24 }}></i>
            </button>
            <span className="tooltip-text">Newer</span>
          </div>
          <div className="tooltip-container">
            <button
              onClick={handleNext}
              disabled={(page + 1) * mailsPerPage >= sortedMails.length}
              className="MailList-btn"
              aria-label="Older"
            >
              <i className="bi bi-chevron-right" style={{ fontSize: 24 }}></i>
            </button>
            <span className="tooltip-text">Older</span>
          </div>
        </div>
      </div>

      <div className="MailList-scroll">
        {displayedMails.map(mail => (
          <MailItem
  key={mail.id}
  mail={mail}
  folder={folder} // <== הוספה חשובה
  isSelected={selectedMails.has(mail.id)}
  whenSelected={(id) => {
    setSelectedMails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }}
  onMailDeleted={handleMailDeleted}
  onMailMovedToSpam={handleMailMovedToSpam}
  onMailFavoriteToggled={handleMailFavoriteToggled}
  onOpenMail={onOpenMail}
/>

        ))}
      </div>
    </div>
  );
}

export default MailList;
