import { useState } from "react";
import "../RegisterCard.css"
import UserInformation from "../../UserInformation/UserInformation";

function ChooseMailCard({ theme }) {
  const [mail, setMail] = useState(null);
  const [isMailValid, setIsMailValid] = useState("");
  const [feedback, setFeedback] = useState("You can use letters, numbers and full stops");
  var btnClass

  if (theme === "dark") btnClass = "btn btn-secondary"
  else btnClass = "btn btn-primary";

  const handleNext = () => {
    //empty form was submitted scenario
    if (!mail) {
      setIsMailValid(false);
      setFeedback("Enter a MeMail address");
      return;
    }
    //TODO: bad mail address chosen (2 @, etc..)
    //else if () {}

    //TODO: mail address already used
    //else if() {}
    setIsMailValid(true);
  };

  return (
    <div data-bs-theme={theme} className="card register-card border shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="row align-items-start g-2">
        <div className="col-5">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" fill="currentColor"
              className="bi bi-envelope text-start mt-2 mb-2 ms-3" viewBox="0 0 16 16" color="#0d6efd">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1
                                 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8
                                 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
            <h2 className="text-start open-sans-text ms-3">Choose your MeMail address</h2>
            <p className="text-start open-sans-text ms-3">Pick a MeMail address or create your own</p>
          </div>
        </div>
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
