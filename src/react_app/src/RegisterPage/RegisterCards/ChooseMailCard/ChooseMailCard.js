import { useState } from "react";
import "../RegisterCard.css"
import UserInformation from "../../../UserInformation/UserInformation";
import LogoAndText from "../LogoAndText/LogoAndText";

function ChooseMailCard({
  theme,
  value,
  onChange,
  onNext,
}) {
  const header = "Choose your MeMail address";
  const msg = "Pick a MeMail address or create your own";
  const [isMailValid, setIsMailValid] = useState("");
  const [feedback, setFeedback] = useState("You can use letters, numbers and full stops");
  var btnClass

  if (theme === "dark") btnClass = "btn btn-secondary"
  else btnClass = "btn btn-primary";

  const handleNext = async () => {
    //empty field scenario
    if (!value) {
      setIsMailValid(false);
      setFeedback("Enter a MeMail address");
      return;
    }
    //invalid mail address scenario
    else if (!/^[A-Za-z0-9.]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(value)) {
      setIsMailValid(false);
      setFeedback("Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.");
      return;
    }
    //existing mail address scenario
    const res = await fetch('http://localhost:9090/api/users/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 2, username: value })
    });

    if (res.ok) {
      onNext();
    } else {
      const { error } = await res.json();
      setIsMailValid(false);
      setFeedback(error);
    }
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
            value={value}
            onChange={onChange}
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
