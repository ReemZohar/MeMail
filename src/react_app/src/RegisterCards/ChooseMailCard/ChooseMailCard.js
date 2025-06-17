import { useState } from "react";
import "../RegisterCard.css"
import UserInformation from "../../UserInformation/UserInformation";
import LogoAndText from "../LogoAndText/LogoAndText";

function ChooseMailCard({ theme }) {
  const header = "Choose your MeMail address";
  const msg = "Pick a MeMail address or create your own";
  const [mail, setMail] = useState(null);
  const [isMailValid, setIsMailValid] = useState("");
  const [feedback, setFeedback] = useState("You can use letters, numbers and full stops");
  var btnClass

  if (theme === "dark") btnClass = "btn btn-secondary"
  else btnClass = "btn btn-primary";

  const handleNext = () => {
    //TODO: add implementation when creating the register page
  };

  return (
    <div data-bs-theme={theme} className="card register-card border shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="row align-items-start g-2">

        {/*left column*/}
        <LogoAndText
          header={header}
          msg={msg}
        />

        {/*right column*/}
        <div className="col-6 ms-5 mt-5">
          <div className="mb-5"></div>
          <UserInformation
            requiredInfo={"Create a MeMail address"}
            theme={theme}
            value={mail}
            onChange={e => setMail(e.target.value)}
            isValid={isMailValid}
            feedback={feedback}
          ></UserInformation>
          <div className="mt-4 mb-4"></div>
          <div className="d-flex justify-content-end mt-5 ms-5">
            <button
              type="button"
              className={btnClass + " mt-4"}
              onClick={handleNext}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseMailCard
