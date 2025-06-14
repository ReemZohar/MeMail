import React, { useState } from 'react';
import MailRow from '../MailRow/MailRow';
import './MailItem.css';

function MailItem({ mail, onMailDeleted, onMailMovedToSpam }) {
  const [folder, setFolder] = useState(mail.folder);

  //Callback to the parent
  const handleActionDone = ({ type, mailId }) => {
    if (type === 'delete') {
      //The mail was deleted
      onMailDeleted(mailId);
    } else if (type === 'spam') {
      setFolder('spam');
      onMailMovedToSpam(mailId);
    }
  };

  //If the mail was deleted, don't show it
  if (folder === 'deleted') {
    return null;
  }

  return (
    <div className={`MailItem ${folder}`}>
      <div className="MailItem-content">
        <h4>{mail.title}</h4>
        <p>{mail.content}</p>
      </div>
      <MailRow
        mailId={mail.id}
        title={mail.title}
        content={mail.content}
        onActionDone={handleActionDone}
      />
    </div>
  );
}

export default MailItem;
