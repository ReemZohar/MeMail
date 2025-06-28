import './LabelMenu.css';
import Label from '../Label/Label';

function LabelMenu({ theme, onLabelClick, activeFolder}) {
  const labels = [
    {
      id: 'inbox',
      name: 'Inbox',
      icon: <i className="bi bi-inbox"></i>,
      isFavorite: false,
    },
    {
      id: 'sent',
      name: 'Sent',
      icon: <i className="bi bi-send"></i>,
      isFavorite: false,
    },
    {
      id: 'drafts',
      name: 'Drafts',
      icon: <i className="bi bi-file-earmark-text"></i>, 
      isFavorite: false,
    },
    {
      id: 'allmail',
      name: 'All Mail',
      icon: <i className="bi bi-envelope"></i>,
      isFavorite: false,
    },
    {
      id: 'favorite',
      name: 'Favorite',
      icon: <i className="bi bi-star"></i>,
      isFavorite: true,
    },
    {
      id: 'spam',
      name: 'Spam',
      icon: <i className="bi bi-exclamation-triangle spam-icon"></i>,
      isFavorite: false,
    },
  ];

  return (
    <div className="labelMenu">
      {labels.map(label => (
        <Label
          key={label.id}
          icon={label.icon}
          name={label.name}
          isActive={activeFolder === label.id}
          theme={theme}
          onClick={() => {
            if (label.id === 'favorite') {
              onLabelClick('favorite', true, 'favorite', false);
            } else {
              onLabelClick(label.id, false, label.id, false);
            }
          }}
          showMenuButton={false}
        />
      ))}
    </div>
  );
}

export default LabelMenu;