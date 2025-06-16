import React from 'react';
import ReactDOM from 'react-dom/client';
import ChooseDateCard from './RegisterCards/ChooseDateCard/ChooseDateCard';
import ChooseMailCard from './RegisterCards/ChooseMailCard/ChooseMailCard';
import ChooseNameCard from './RegisterCards/ChooseNameCard/ChooseNameCard';
import ChoosePasswordCard from './RegisterCards/ChoosePasswordCard/ChoosePasswordCard'
import ChooseAvatarCard from './RegisterCards/ChooseAvatarCard/ChooseAvatarCard'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChooseAvatarCard theme={"dark"}/>
  </React.StrictMode>
);