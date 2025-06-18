import React, { useState, useEffect } from 'react';
import MailItem from '../MailItem/MailItem';
import { MdRefresh, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import './MailList.css';

function MailList({ folder = 'inbox', isFavorite, sender, date, token, labelId, onOpenMail }) {
  const [page, setPage] = useState(0);
  const [mails, setMails] = useState([]);
  const [selectedMails, setSelectedMails] = useState(new Set());
  const mailsPerPage = 50;

  const fetchMails = async () => {
    try {
      const params = new URLSearchParams();
      if (folder) params.append('folder', folder);
      if (isFavorite !== undefined) params.append('isFavorite', isFavorite);
      if (sender) params.append('sender', sender);
      if (date) params.append('date', date);
      if (labelId) params.append('labelId', labelId);

      const response = await fetch(`http://localhost:9090/api/mails?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
    fetchMails();
  }, [folder, isFavorite, sender, date, labelId]);

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

  const handleMailFavoriteToggled = (mailId, favorite) => {
    setMails(prev =>
      prev.map(mail => mail.id === mailId ? { ...mail, favorite } : mail)
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

    if (isChecked) {
      setSelectedMails(prev => {
        const newSet = new Set(prev);
        currentPageMails.forEach(id => newSet.add(id));
        return newSet;
      });
    } else {
      setSelectedMails(prev => {
        const newSet = new Set(prev);
        currentPageMails.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  };

  const sortedMails = [...mails].sort((a, b) => new Date(b.date) - new Date(a.date));
  const startIndex = page * mailsPerPage;
  const displayedMails = sortedMails.slice(startIndex, startIndex + mailsPerPage);

  const allSelected = displayedMails.length > 0 && displayedMails.every(mail => selectedMails.has(mail.id));

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

          <div className="tooltip-container">
            <button onClick={handleRefresh} className="MailList-btn">
              <MdRefresh size={20} />
            </button>
            <span className="tooltip-text">Refresh</span>
          </div>
        </div>

        <div className="MailList-pagination">
          <div className="tooltip-container">
            <button onClick={handlePrev} disabled={page === 0} className="MailList-btn">
              <MdNavigateBefore size={24} />
            </button>
            <span className="tooltip-text">Newer</span>
          </div>
          <div className="tooltip-container">
            <button
              onClick={handleNext}
              disabled={(page + 1) * mailsPerPage >= sortedMails.length}
              className="MailList-btn"
            >
              <MdNavigateNext size={24} />
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
            isSelected={selectedMails.has(mail.id)}
            whenSelected={(id) => {
              setSelectedMails(prev => {
                const newSet = new Set(prev);
                if (newSet.has(id)) {
                  newSet.delete(id);
                } else {
                  newSet.add(id);
                }
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