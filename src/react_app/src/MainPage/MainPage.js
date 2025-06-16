import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LeftMenu from "../LeftMenu/LeftMenu";
import SearchBar from "../SearchBar/SearchBar";
import MailList from "../MailList/MailList";
import './MainPage.css';

export default function MainPage({ token }) {
  const [folder, setFolder] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [labelId, setLabelId] = useState(null);
  const [sender, setSender] = useState(null);
  const [date, setDate] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const folderParam = searchParams.get("folder");
    const labelParam = searchParams.get("labelId");
    const favParam = searchParams.get("isFavorite");
    const senderParam = searchParams.get("sender");
    const dateParam = searchParams.get("date");

    setFolder(folderParam || null);
    setLabelId(labelParam || null);
    setIsFavorite(favParam === "true" ? true : null);
    setSender(senderParam || null);
    setDate(dateParam || null);
  }, [searchParams]);

  function handleLabelClick(id, isFav = false, folderName = null, isCustomLabel = false) {
    const newParams = new URLSearchParams();

    if (folderName) {
      // A folder
      newParams.set("folder", folderName);
      if (isFav) {
        newParams.set("isFavorite", "true");
      }
    } else if (isCustomLabel) {
      newParams.set("labelId", id);
    }

    // Navigate with updated params
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
    </div>
  );
}
