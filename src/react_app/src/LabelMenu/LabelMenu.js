import './LabelMenu.css';
import { MdInbox, MdSend, MdOutlineDrafts, MdMail, MdReport, MdStar } from 'react-icons/md';

function LabelMenu({ theme, onLabelClick, activeFolder, isCollapsed }) {
  const labels = [
    { id: 'inbox', name: 'Inbox', icon: <MdInbox size={18} />, isFavorite: false },
    { id: 'sent', name: 'Sent', icon: <MdSend size={18} />, isFavorite: false },
    { id: 'drafts', name: 'Drafts', icon: <MdOutlineDrafts size={18} />, isFavorite: false },
    { id: 'allmail', name: 'All Mail', icon: <MdMail size={18} />, isFavorite: false },
    { id: 'favorite', name: 'Favorite', icon: <MdStar size={18} />, isFavorite: true },
    { id: 'spam', name: 'Spam', icon: <MdReport size={18} />, isFavorite: false },
  ];

  return (
    <div className="labelMenu">
      {labels.map(label => (
        <div
          key={label.id}
          className={`label-item ${activeFolder === label.id ? 'active' : ''}`}
          onClick={() => {
            if (label.id === 'favorite') {
              onLabelClick(null, true, null, false);
            } else {
              onLabelClick(label.id, false, label.id, false);
            }
          }}
        >
          {label.icon}
          {!isCollapsed && <span className="label-name">{label.name}</span>}
        </div>
      ))}
    </div>
  );
}

export default LabelMenu;