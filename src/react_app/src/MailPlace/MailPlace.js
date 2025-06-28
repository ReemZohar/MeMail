import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MailList from '../MailList/MailList';
import MailWindow from '../MailWindow/MailWindow';
import NewMailWindow from '../NewMailWindow/NewMailWindow';
import './MailPlace.css';

function MailPlace({ token, currentUserEmail, selectedMailId, searchResults }) {
  const [openedMail, setOpenedMail] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const folderParam = searchParams.get("folder") || 'inbox';
  const labelIdParam = searchParams.get("labelId") || null;
  const isFavoriteParamRaw = searchParams.get("isFavorite");
  const isFavoriteParam = isFavoriteParamRaw === "true" ? true : (isFavoriteParamRaw === "false" ? false : undefined);
  const sender = searchParams.get("sender") || null;
  const date = searchParams.get("date") || null;

  const foldersWithoutFavoriteFilter = ['inbox', 'sent', 'allmail'];
  const shouldSendIsFavorite = isFavoriteParam === true || (isFavoriteParam === false && !foldersWithoutFavoriteFilter.includes(folderParam));

  useEffect(() => {
    const fetchMail = async () => {
      if (!selectedMailId) {
        setOpenedMail(null);
        return;
      }

      try {
        const endpoint = folderParam === 'drafts'
          ? `http://localhost:9090/api/draft/${selectedMailId}`
          : `http://localhost:9090/api/mails/${selectedMailId}`;

        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch mail');

        const data = await res.json();

        const enriched = folderParam === 'drafts'
          ? {
              ...data,
              folder: 'drafts',
              isRead: false,
              isFavorite: false,
              isSpam: false,
              labels: [],
              attachments: [],
              senderEmail: currentUserEmail,
              senderName: 'Me',
              receiverEmail: data.receiver,
              receiverName: data.receiver,
              isDraft: true,
            }
          : data;

        setOpenedMail(enriched);
      } catch (err) {
        console.error(err);
        setOpenedMail(null);
      }
    };

    fetchMail();
  }, [selectedMailId, token, folderParam, currentUserEmail]);

  const handleOpenMail = (mail) => {
    const params = new URLSearchParams();
    if (!shouldSendIsFavorite && folderParam) params.set("folder", folderParam);
    if (shouldSendIsFavorite && isFavoriteParam === true) params.set("isFavorite", "true");
    if (shouldSendIsFavorite && isFavoriteParam === false) params.set("isFavorite", "false");
    if (labelIdParam) params.set("labelId", labelIdParam);
    if (sender) params.set("sender", sender);
    if (date) params.set("date", date);

    navigate({
      pathname: `/mail/${mail.id}`,
      search: `?${params.toString()}`,
    });
  };

  const handleCloseMail = () => {
    setOpenedMail(null); // ← כדי לעצור רינדור כפול רגעית
    const params = new URLSearchParams();
    if (!shouldSendIsFavorite && folderParam) params.set("folder", folderParam);
    if (shouldSendIsFavorite && isFavoriteParam === true) params.set("isFavorite", "true");
    if (shouldSendIsFavorite && isFavoriteParam === false) params.set("isFavorite", "false");
    if (labelIdParam) params.set("labelId", labelIdParam);
    if (sender) params.set("sender", sender);
    if (date) params.set("date", date);

    navigate(`/mail?${params.toString()}`);
  };

  return (
    <div className="MailPlace">
      {!openedMail && (
        <div className="mail-list-wrapper">
          <MailList
            token={token}
            folder={shouldSendIsFavorite && isFavoriteParam === false ? folderParam : (isFavoriteParam === true ? null : folderParam)}
            isFavorite={isFavoriteParam === true ? true : undefined}
            labelId={labelIdParam}
            sender={sender}
            date={date}
            mailsOverride={searchResults}
            onOpenMail={handleOpenMail}
          />
        </div>
      )}

      {openedMail && openedMail.isDraft && (
        <div className="mail-window-wrapper">
          <NewMailWindow
            token={token}
            onClose={handleCloseMail}
            title={openedMail.title}
            receiver={openedMail.receiver}
            content={openedMail.content}
            attachments={openedMail.attachments || []}
            isDraft={true}
            draftId={openedMail.id}
          />
        </div>
      )}

      {openedMail && !openedMail.isDraft && (
        <div className="mail-window-wrapper">
          <MailWindow
            mail={openedMail}
            currentUserEmail={currentUserEmail}
            onMailDeleted={handleCloseMail}
            onBack={handleCloseMail}
            token={token}
          />
        </div>
      )}
    </div>
  );
}

export default MailPlace;
