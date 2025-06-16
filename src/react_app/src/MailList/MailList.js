import React, { useState, useEffect } from 'react';
import MailItem from '../MailItem/MailItem';
import { MdRefresh, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import './MailList.css';

function MailList({ folder = 'inbox', isFavorite, sender, date, token }) {
  const [page, setPage] = useState(0);
  const [mails, setMails] = useState([]);
  const mailsPerPage = 50;

  const fetchMails = async () => {
    try {
      const params = new URLSearchParams();
      if (folder) params.append('folder', folder);
      if (isFavorite !== undefined) params.append('isFavorite', isFavorite);
      if (sender) params.append('sender', sender);
      if (date) params.append('date', date);

      const response = await fetch(`http://localhost:9090/api/mails?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch mails');

      const data = await response.json();
      setMails(data);
      setPage(0);
    } catch (err) {
      console.error('Error loading mails:', err);
    }
  };

  useEffect(() => {
    fetchMails();
  }, [folder, isFavorite, sender, date]);

  const handleMailDeleted = (mailId) => {
    setMails(prev => prev.filter(mail => mail.id !== mailId));
  };

  const handleMailMovedToSpam = (mailId) => {
    setMails(prev => prev.filter(mail => mail.id !== mailId));
  };

  const handleMailFavoriteToggled = (mailId, favorite) => {
    setMails(prev =>
      prev.map(mail => mail.id === mailId ? { ...mail, favorite } : mail)
    );
  };

  const handleNext = () => {
    if ((page + 1) * mailsPerPage < mails.length) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  };

  const handleRefresh = () => {
    fetchMails();
  };

  const sortedMails = [...mails].sort((a, b) => new Date(b.date) - new Date(a.date));
  const startIndex = page * mailsPerPage;
  const displayedMails = sortedMails.slice(startIndex, startIndex + mailsPerPage);

  return (
    <div className="MailList">
      <div className="MailList-header">
        <div className="tooltip-container">
          <button onClick={handleRefresh} className="MailList-btn">
            <MdRefresh size={20} />
          </button>
          <span className="tooltip-text">Refresh</span>
        </div>

        <div className="MailList-pagination">
          <div className="tooltip-container">
            <button onClick={handlePrev} disabled={page === 0} className="MailList-btn">
              <MdNavigateBefore size={24} />
            </button>
            <span className="tooltip-text">Newer</span>
          </div>
          <div className="tooltip-container">
            <button onClick={handleNext} disabled={(page + 1) * mailsPerPage >= sortedMails.length} className="MailList-btn">
              <MdNavigateNext size={24} />
            </button>
            <span className="tooltip-text">Older</span>
          </div>
        </div>
      </div>

      {displayedMails.map(mail => (
        <MailItem
          key={mail.id}
          mail={mail}
          onMailDeleted={handleMailDeleted}
          onMailMovedToSpam={handleMailMovedToSpam}
          onMailFavoriteToggled={handleMailFavoriteToggled}
        />
      ))}
    </div>
  );
}

export default MailList;