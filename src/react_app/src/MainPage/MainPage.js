import React, { useState } from 'react';
import LeftMenu from '../LeftMenu/LeftMenu';
import MailList from '../MailList/MailList';

function MainPage({ token }) {
  const [folder, setFolder] = useState('inbox');
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [label, setLabel] = useState(undefined);

  const handleLabelClick = (type, value) => {
    if (type === 'folder') {
      setFolder(value);
      setIsFavorite(undefined);
      setLabel(undefined);
    } else if (type === 'favorite') {
      setFolder(undefined);
      setIsFavorite(true);
      setLabel(undefined);
    } else if (type === 'customLabel') {
      setFolder(undefined);
      setIsFavorite(undefined);
      setLabel(value);
    }
  };

  const activeLabelId = isFavorite
    ? 'favorites'
    : label
    ? label
    : folder;

  return (
    <div style={{ display: 'flex' }}>
      <LeftMenu
        onComposeClick={() => {}}
        clickOnLabel={handleLabelClick}
        activeLabelId={activeLabelId}
        theme="light"
      />
      <div style={{ flexGrow: 1 }}>
        <MailList
          folder={folder}
          isFavorite={isFavorite}
          labelId={label}
          token={token}
        />
      </div>
    </div>
  );
}

export default MainPage;
