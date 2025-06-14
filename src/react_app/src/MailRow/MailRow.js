import "./MailRow.css";
import SpamMailButton from '../SpamMailButton/SpamMailButton';
import DeleteMailButton from '../DeleteMailButton/DeleteMailButton';

function MailRow({ mailId, title, content, onActionDone }) {
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
        //Return callback to the parent
        onActionDone?.({ type: 'delete', mailId });
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting mail:", err);
    }
  };

  const handleSpam = async () => {
    const extractUrls = (text) => {
      const regex = /((?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?)/gi;
      return text.match(regex) || [];
    };

    const urls = [...extractUrls(title), ...extractUrls(content)];

    try {
      for (const url of urls) {
        await fetch(`/api/blacklist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ url })
        });
      }

      //Move the mail to Spam
      const patchResponse = await fetch(`/api/mails/${mailId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          folder: 'spam'
        })
      });

      if (patchResponse.ok) {
        onActionDone?.({ type: 'spam', mailId });
      } else {
        alert("Failed to mark as spam");
      }

    } catch (err) {
      console.error("Error marking mail as spam:", err);
    }
  };

  return (
    <div className="MailRow">
      <SpamMailButton onClick={handleSpam} />
      <DeleteMailButton onClick={handleDelete} />
    </div>
  );
}

export default MailRow;
