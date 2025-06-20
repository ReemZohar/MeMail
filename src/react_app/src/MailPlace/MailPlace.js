import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MailList from '../MailList/MailList';
import MailWindow from '../MailWindow/MailWindow';

export default function MailPlace({token,  currentUserEmail,  selectedMailId}) {
  const [openedMail, setOpenedMail] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const folder = searchParams.get("folder") || 'inbox';
  const labelId = searchParams.get("labelId") || null;
  const isFavorite = searchParams.get("isFavorite") === "true";
  const sender = searchParams.get("sender") || null;
  const date = searchParams.get("date") || null;

  useEffect(() => {
    const fetchMail = async () => {
      if (!selectedMailId) {
        setOpenedMail(null);
        return;
      }

      try {
        const res = await fetch(`http://localhost:9090/api/mails/${selectedMailId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch mail');

        const data = await res.json();
        setOpenedMail(data);
      } catch (err) {
        console.error(err);
        setOpenedMail(null);
      }
    };

    fetchMail();
  }, [selectedMailId, token]);

const handleOpenMail = (mail) => {
  const params = new URLSearchParams();
  if (folder) params.set("folder", folder);
  if (isFavorite) params.set("isFavorite", "true");
  if (labelId) params.set("labelId", labelId);
  if (sender) params.set("sender", sender);
  if (date) params.set("date", date);

  navigate({
    pathname: `/mail/${mail.id}`,
    search: `?${params.toString()}`,
  });
};

  const handleCloseMail = () => {
    const params = new URLSearchParams();
    if (folder) params.set("folder", folder);
    if (isFavorite) params.set("isFavorite", "true");
    if (labelId) params.set("labelId", labelId);
    if (sender) params.set("sender", sender);
    if (date) params.set("date", date);

    navigate(`/mail?${params.toString()}`);
  };

  return (
    <div className="MailPlace">
      {!openedMail && (
        <div className="mail-list-wrapper" style={{ flex: 1, overflowY: 'auto' }}>
          <MailList
            token={token}
            folder={folder}
            isFavorite={isFavorite}
            labelId={labelId}
            sender={sender}
            date={date}
            onOpenMail={handleOpenMail}
          />
        </div>
      )}
      {openedMail && (
        <div className="mail-window-wrapper" style={{ flex: 1, overflowY: 'auto', borderLeft: '1px solid #ccc' }}>
          <MailWindow mail={openedMail} currentUserEmail={currentUserEmail} onMailDeleted={() => handleCloseMail()} onBack={handleCloseMail} token={token} />
        </div>
      )}
    </div>
  );
}