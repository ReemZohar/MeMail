import './LabelMenu.css';
import Label from '../Label/Label';
import { MdInbox, MdStar, MdSend, MdReport } from 'react-icons/md';

function LabelMenu({ theme, clickOnLabel }) {
  //Labels array
  const labels = [
    { id: 'inbox', name: 'Inbox', icon: <MdInbox size={18} /> },
    { id: 'starred', name: 'Starred', icon: <MdStar size={18} /> },
    { id: 'sent', name: 'Sent', icon: <MdSend size={18} /> },
    { id: 'spam', name: 'Spam', icon: <MdReport size={18} /> },
  ];

  return (
    <div className="labelMenu">
      {labels.map(label => (
      <Label
        key={label.id}
        theme={theme}
        name={label.name}
        icon={label.icon}
        onClick={() => clickOnLabel(label.id)}
        />
      ))}
    </div>
  );
}

export default LabelMenu;