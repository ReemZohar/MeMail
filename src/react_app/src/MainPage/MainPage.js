 import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopPanel from "../TopPanel/TopPanel";
import NewMailWindow from "../NewMailWindow/NewMailWindow";
import MailPlace from "../MailPlace/MailPlace";
import './MainPage.css';

//Get the mail (username) from the JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function MainPage({ token }) {
  if (!token) throw new Error("No token found");   
  const location = useLocation();
  const id = location.pathname.startsWith('/mail/') ? location.pathname.split('/mail/')[1] : null;

  const parsed = parseJwt(token);
  const currentUserEmail = parsed?.username || "";

  const [folder, setFolder] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [labelId, setLabelId] = useState(null);
  const [sender, setSender] = useState(null);
  const [date, setDate] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [openComposes, setOpenComposes] = useState([]);

  useEffect(() => {
    setFolder(searchParams.get("folder") || null);
    setLabelId(searchParams.get("labelId") || null);
    setIsFavorite(searchParams.get("isFavorite") === "true" ? true : null);
    setSender(searchParams.get("sender") || null);
    setDate(searchParams.get("date") || null);
  }, [searchParams]);

  const openCompose = () => {
    if (openComposes.length >= 2) return;  //If there are already 2 open windows, don't open a new one

    const id = Date.now();
    setOpenComposes(prev => [...prev, id]);

    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    if (!hashParams.has("compose")) {
      hashParams.set("compose", "new");
      window.location.hash = hashParams.toString();
    }
  };

  const closeCompose = (idToClose) => {
    setOpenComposes(prev => {
      const updated = prev.filter(id => id !== idToClose);

      if (updated.length === 0) {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        hashParams.delete("compose");
        const newHash = hashParams.toString();
        window.location.hash = newHash ? `#${newHash}` : "";
      }

      return updated;
    });
  };

  function handleLabelClick(id, isFav = false, folderName = null, isCustomLabel = false) {
    const newParams = new URLSearchParams();

    if (folderName) {
      newParams.set("folder", folderName);
      if (isFav) newParams.set("isFavorite", "true");
    } else if (isCustomLabel) {
      newParams.set("labelId", id);
    }

    navigate({ pathname: "/mail", search: `?${newParams.toString()}` });
  }

   return (
    <div className="main-page-container">
      <LeftMenu
        token={token}
        onLabelClick={handleLabelClick}
        activeFolder={folder}
        activeLabelId={labelId}
        isFavoriteActive={isFavorite}
        onComposeClick={openCompose}
      />

      <div className="right-panel">
        <TopPanel />
        <MailPlace
          token={token}
          currentUserEmail={currentUserEmail}
          selectedMailId={id}
          folder={folder}
          isFavorite={isFavorite}
          labelId={labelId}
          sender={sender}
          date={date}
        />
      </div>

      {openComposes.map((id, index) => (
        <NewMailWindow
          key={id}
          index={index}
          onClose={() => closeCompose(id)}
        />
      ))}
    </div>
  );
}