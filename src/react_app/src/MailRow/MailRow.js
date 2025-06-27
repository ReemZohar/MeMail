import './MailRow.css';
import SpamMailButton from '../SpamMailButton/SpamMailButton';
import DeleteMailButton from '../DeleteMailButton/DeleteMailButton';
import FavoriteMailButton from '../FavoriteMailButton/FavoriteMailButton';
import MarkUnreadButton from '../MarkUnreadButton/MarkUnreadButton';
import ReplyButton from '../ReplyButton/ReplyButton';
import ForwardButton from '../ForwardButton/ForwardButton';

function MailRow({ mailId, isFavorite, isSpam, isDraft, onActionDone, hideFavoriteButton, onReply, onFwd, isItem = false }) {
  const token = localStorage.getItem('token');
  const baseUrl = isDraft
    ? 'http://localhost:9090/api/draft'
    : 'http://localhost:9090/api/mails';

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
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        onActionDone?.({ type: 'favoriteToggle', mailId, isFavorite: !isFavorite });
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const handleMarkUnread = async () => {
    try {
      const response = await fetch(`${baseUrl}/${mailId}/isRead`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isRead: false }),
      });
      if (response.ok) {
        onActionDone?.({ type: 'markAsUnread', mailId });
      }
    } catch (err) {
      console.error('Error marking as unread:', err);
    }
  };

  const handleReply = () => {
    onReply?.();
  };

  const handleForward = () => {
    onFwd?.();
  };

  return (
    <div>
      {!isItem && <div className="MailRow">
        <ReplyButton onClick={handleReply} />
        <ForwardButton onClick={handleForward} />
        {!hideFavoriteButton && (
          <FavoriteMailButton isFavorite={isFavorite} onClick={handleFavoriteToggle} />
        )}
        <SpamMailButton isSpam={isSpam} onClick={handleSpamToggle} />
        <DeleteMailButton onClick={handleDelete} />
        <MarkUnreadButton onClick={handleMarkUnread} />
      </div>}

      {isItem && <div className="MailRow">
        {!hideFavoriteButton && (
          <FavoriteMailButton isFavorite={isFavorite} onClick={handleFavoriteToggle} />
        )}
        <SpamMailButton isSpam={isSpam} onClick={handleSpamToggle} />
        <DeleteMailButton onClick={handleDelete} />
        <MarkUnreadButton onClick={handleMarkUnread} />
      </div>}
    </div>

  );
}

//MailRow without FavoriteButton
MailRow.WithoutFavButton = (props) => {
  return <MailRow {...props} hideFavoriteButton />;
};

export default MailRow;