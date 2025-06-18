import './MailRow.css';
import SpamMailButton from '../SpamMailButton/SpamMailButton';
import DeleteMailButton from '../DeleteMailButton/DeleteMailButton';
import FavoriteMailButton from '../FavoriteMailButton/FavoriteMailButton';

function MailRow({ mailId, isFavorite, isSpam, onActionDone, hideFavoriteButton }) {
  const token = localStorage.getItem('token');
  const baseUrl = 'http://localhost:9090/api/mails';

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/${mailId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        onActionDone?.({ type: 'delete', mailId });
      }
    } catch (err) {
      console.error('Error deleting mail:', err);
    }
  };

  const handleSpamToggle = async () => {
    const endpoint = isSpam ? 'unspam' : 'spam';
    try {
      const response = await fetch(`${baseUrl}/${mailId}/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        onActionDone?.({ type: isSpam ? 'unspam' : 'spam', mailId });
      }
    } catch (err) {
      console.error('Error toggling spam:', err);
    }
  };

  const handleFavoriteToggle = async () => {
    const endpoint = isFavorite ? 'unfavorite' : 'favorite';
    try {
      const response = await fetch(`${baseUrl}/${mailId}/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        onActionDone?.({ type: 'favoriteToggle', mailId, favorite: !isFavorite });
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <div className="MailRow">
      {!hideFavoriteButton && (
        <FavoriteMailButton isFavorite={isFavorite} onClick={handleFavoriteToggle} />
      )}
      <SpamMailButton isSpam={isSpam} onClick={handleSpamToggle} />
      <DeleteMailButton onClick={handleDelete} />
    </div>
  );
}

//MailRow without FavoriteButton
MailRow.WithoutFavButon = (props) => {
  return <MailRow {...props} hideFavoriteButton />;
};

export default MailRow;