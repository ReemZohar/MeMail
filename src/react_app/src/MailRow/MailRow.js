import "./MailRow.css";
import SpamMailButton from '../SpamMailButton/SpamMailButton';
import DeleteMailButton from '../DeleteMailButton/DeleteMailButton';


function MailRow() {

  return (
    <div className="MailRow">
      <SpamMailButton /> <DeleteMailButton />
    </div>
  );

};

export default MailRow;