import './LabelMenu.css';
import Label from '../Label/Label';
import { MdInbox, MdStar, MdSend, MdReport, MdMail, MdDrafts } from 'react-icons/md';

function LabelMenu({ theme, clickOnLabel, isCollapsed }) {
  const labels = [
    { id: 'inbox', name: 'Inbox', icon: <MdInbox size={18} /> },
    { id: 'sent', name: 'Sent', icon: <MdSend size={18} /> },
    { id: 'drafts', name: 'Drafts', icon: <MdDrafts size={18} /> },
    { id: 'allmail', name: 'All Mail', icon: <MdMail size={18} /> },
    { id: 'spam', name: 'Spam', icon: <MdReport size={18} /> },
  ];

  return (
    <div className="labelMenu">
      {labels.map(label => (
 <div className="tooltip-container" key={label.id}>
  <div
    className="label-item"
    onClick={() => clickOnLabel(label.id)}
  >
    <div className="label-content">
      {label.icon}
      {!isCollapsed && <span className="label-name">{label.name}</span>}
    </div>
  </div>
  <span className="tooltip-text">{label.name}</span>
</div>
     ))}
    </div>
  );
}

export default LabelMenu;
