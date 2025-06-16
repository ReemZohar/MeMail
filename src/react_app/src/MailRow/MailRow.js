import "./MailRow.css";
import SpamMailButton from '../SpamMailButton/SpamMailButton';
import DeleteMailButton from '../DeleteMailButton/DeleteMailButton';
import FavoriteMailButton from '../FavoriteMailButton/FavoriteMailButton';

function MailRow({ mailId, title, content, isFavorite, isSpam, onActionDone }) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/mails/${mailId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        onActionDone?.({ type: 'delete', mailId });
      } else {
        alert("Failed to delete mail.");
        return;
      }
    } catch (err) {
      console.error("Error deleting mail:", err);
      alert("Error deleting mail, please try again.");
    }
  };

  const handleSpam = async () => {
    try {
      const endpoint = isSpam ? `/api/mails/${mailId}/unspam` : `/api/mails/${mailId}/spam`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        onActionDone?.({ type: isSpam ? 'unspam' : 'spam', mailId });
      } else {
        alert(`Failed to ${isSpam ? 'unmark' : 'mark'} mail as spam.`);
        return;
      }
    } catch (err) {
      console.error(`Error toggling spam status:`, err);
      alert("Error changing spam status, please try again.");
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await fetch(`/api/mails/${mailId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ favorite: !isFavorite })
      });

      if (response.ok) {
        onActionDone?.({ type: 'favoriteToggle', mailId, favorite: !isFavorite });
      } else {
        alert("Failed to update favorite status.");
        return;
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert("Error toggling favorite, please try again.");
    }
  };

  return (
    <div className="MailRow">
      <FavoriteMailButton isFavorite={isFavorite} onClick={handleFavorite} />
      <SpamMailButton isSpam={isSpam} onClick={handleSpam} />
      <DeleteMailButton onClick={handleDelete} />
    </div>
  );
}

export default MailRow;
