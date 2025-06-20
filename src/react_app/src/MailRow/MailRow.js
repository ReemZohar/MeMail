import './MailRow.css';
import SpamMailButton from '../SpamMailButton/SpamMailButton';
import DeleteMailButton from '../DeleteMailButton/DeleteMailButton';
import FavoriteMailButton from '../FavoriteMailButton/FavoriteMailButton';

function MailRow({ mailId, isFavorite, isSpam, onActionDone, hideFavoriteButton }) {
  const token = localStorage.getItem('token');
  const baseUrl = 'http://localhost:9090/api/mails';

const handleDelete = async () => {
  console.log(`[MailRow] Deleting mail with ID: ${mailId}`);
  try {
    const response = await fetch(`${baseUrl}/${mailId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`[MailRow] Delete response status: ${response.status}`);
    if (response.status === 204) {
      onActionDone?.({ type: 'delete', mailId });
    }
  } catch (err) {
    console.error('Error deleting mail:', err);
  }
};

const handleSpamToggle = async () => {
  const endpoint = isSpam ? 'unspam' : 'spam';
  console.log(`[MailRow] Toggling spam on mail ${mailId}, action: ${endpoint}`);
  try {
    const response = await fetch(`${baseUrl}/${mailId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`[MailRow] Spam toggle response status: ${response.status}`);
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
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('[FavoriteMailButton] Sending request to:', `${baseUrl}/${mailId}/${endpoint}`);
    console.log('[FavoriteMailButton] Response status:', response.status);

    if (response.ok) {
      onActionDone?.({ type: 'favoriteToggle', mailId, isFavorite: !isFavorite });
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
MailRow.WithoutFavButton = (props) => {
  return <MailRow {...props} hideFavoriteButton />;
};

export default MailRow;