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

  useEffect(() => {
    setFolder(searchParams.get("folder") || null);
    setLabelId(searchParams.get("labelId") || null);
    setIsFavorite(searchParams.get("isFavorite") === "true" ? true : null);
    setSender(searchParams.get("sender") || null);
    setDate(searchParams.get("date") || null);
  }, [searchParams]);

  const openCompose = () => {
    const params = new URLSearchParams(location.search);
    params.set("compose", "new");
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const closeCompose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("compose");
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const compose = searchParams.get("compose");

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

      {compose === "new" && <NewMailWindow onClose={closeCompose} />}
    </div>
  );
}
