import React from 'react';
import MailItem from '../MailItem/MailItem';
import './MailList.css';

function MailList({ mails, onMailDeleted, onMailMovedToSpam }) {
  const displayedMails = mails.slice(0, 50);

  return (
    <div className="MailList">
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