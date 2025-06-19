import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopPanel from "../TopPanel/TopPanel";
import NewMailWindow from "../NewMailWindow/NewMailWindow";
import MailPlace from "../MailPlace/MailPlace";
import UserWindow from "../UserWindow/UserWindow";
import './MainPage.css';

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

  const [openComposes, setOpenComposes] = useState([]);
  const [showUserWindow, setShowUserWindow] = useState(false);
  const [userWindowPos, setUserWindowPos] = useState({ top: 0, right: 0 });

  const userWindowRef = useRef(null);
  const topPanelUserBtnRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.startsWith('/mail/') ? location.pathname.split('/mail/')[1] : null;

  const parsed = parseJwt(token);
  const currentUserEmail = parsed?.username || "";
  const userId = parsed?.id;

  const [searchParams] = useSearchParams();

  const folder = searchParams.get("folder") || null;
  const labelId = searchParams.get("labelId") || null;
  const isFavorite = searchParams.get("isFavorite") === "true" ? true : null;
  const sender = searchParams.get("sender") || null;
  const date = searchParams.get("date") || null;

  const openCompose = () => {
    if (openComposes.length >= 2) return;

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

  const handleUserClick = () => {
    if (showUserWindow) {
      setShowUserWindow(false);
    } else if (topPanelUserBtnRef.current) {
      const rect = topPanelUserBtnRef.current.getBoundingClientRect();
      setUserWindowPos({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right + window.scrollX,
      });
      setShowUserWindow(true);
    }
  };

  const handleUserWindowClose = () => {
    setShowUserWindow(false);
  };

  // Close UserWindow on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showUserWindow &&
        userWindowRef.current &&
        !userWindowRef.current.contains(event.target) &&
        topPanelUserBtnRef.current &&
        !topPanelUserBtnRef.current.contains(event.target)
      ) {
        setShowUserWindow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserWindow]);

  return (
    <div className="main-page-container" style={{ position: "relative" }}>
      <LeftMenu
        token={token}
        onLabelClick={handleLabelClick}
        activeFolder={folder}
        activeLabelId={labelId}
        isFavoriteActive={isFavorite}
        onComposeClick={openCompose}
      />

      <div className="right-panel">
        <TopPanel onUserClick={handleUserClick} userBtnRef={topPanelUserBtnRef} />
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
        <NewMailWindow key={id} index={index} onClose={() => closeCompose(id)} />
      ))}

      {showUserWindow && (
        <div
          className="user-window-floating"
          style={{
            position: "absolute",
            top: userWindowPos.top,
            right: userWindowPos.right,
            zIndex: 1500,
          }}
        >
          <div ref={userWindowRef}>
            <UserWindow userId={userId} token={token} onClose={handleUserWindowClose} />
          </div>
        </div>
      )}
    </div>
  );
}