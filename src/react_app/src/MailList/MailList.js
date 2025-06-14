import React, { useState } from 'react';
import MailItem from '../MailItem/MailItem';
import { MdRefresh, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import './MailList.css';

function MailList({ mails, onMailDeleted, onMailMovedToSpam, onRefresh }) {
  const [page, setPage] = useState(0);
  const mailsPerPage = 50;

  const startIndex = page * mailsPerPage;
  const displayedMails = mails.slice(startIndex, startIndex + mailsPerPage);

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

  return (
    <div className="MailList">
      <div className="MailList-header">
        <div className="tooltip-container">
          <button onClick={onRefresh} className="MailList-btn">
            <MdRefresh size={20} />
          </button>
          <span className="tooltip-text">Refresh</span>
        </div>

        <div className="MailList-pagination">
          <div className="tooltip-container">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="MailList-btn"
            >
              <MdNavigateBefore size={24} />
            </button>
            <span className="tooltip-text">Newer</span>
          </div>

          <div className="tooltip-container">
            <button
              onClick={handleNext}
              disabled={(page + 1) * mailsPerPage >= mails.length}
              className="MailList-btn"
            >
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
          onMailDeleted={onMailDeleted}
          onMailMovedToSpam={onMailMovedToSpam}
        />
      ))}
    </div>
  );
}

export default MailList;
