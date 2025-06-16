import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import LeftMenu from "../LeftMenu/LeftMenu";
import SearchBar from "../SearchBar/SearchBar";
import MailList from "../MailList/MailList";
import NewMailWindow from "../NewMailWindow/NewMailWindow";
import './MainPage.css';

export default function MainPage({ token }) {
  const [folder, setFolder] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [labelId, setLabelId] = useState(null);
  const [sender, setSender] = useState(null);
  const [date, setDate] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [openComposes, setOpenComposes] = useState([]);

  useEffect(() => {
    setFolder(searchParams.get("folder") || null);
    setLabelId(searchParams.get("labelId") || null);
    setIsFavorite(searchParams.get("isFavorite") === "true" ? true : null);
    setSender(searchParams.get("sender") || null);
    setDate(searchParams.get("date") || null);
  }, [searchParams]);

  const openCompose = () => {
    if (openComposes.length >= 2) return; //If there are already 2 open windows, don't open a new one
    const id = Date.now();
    setOpenComposes(prev => [...prev, id]);
  };

  const closeCompose = (idToClose) => {
    setOpenComposes(prev => prev.filter(id => id !== idToClose));
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
        <SearchBar token={token} />
        <MailList
          token={token}
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
