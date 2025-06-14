import React from 'react';
import { MdReport } from 'react-icons/md';
import './SpamMailButton.css';

const SpamMailButton = ({ mail, onSpam }) => {

  const extractUrls = (text) => {
    if (!text) return [];
    const regex = /((?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?)/gi;
    return text.match(regex) || [];
  };

  const handleSpam = async () => {
    if (!mail) return;

    const urls = [...extractUrls(mail.title), ...extractUrls(mail.content)];

    try {
      for (const url of urls) {
        //POST
        const res = await fetch('/api/blacklist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
          },
          body: JSON.stringify({ url }),
        });

        if (!res.ok) {
          console.warn(`Failed to blacklist URL: ${url}`);
        }
      }

      //Notify the parent that the mail is spam
      if (onSpam) onSpam(mail.id);
    } catch (err) {
      console.error('Error adding URLs to blacklist:', err);
    }
  };

  return (
    <button
      className="spamMail-button"
      title="Mark as Spam"
      onClick={handleSpam}
      aria-label="Mark mail as spam"
    >
      <MdReport size={20} color="red" />
    </button>
  );
};

export default SpamMailButton;