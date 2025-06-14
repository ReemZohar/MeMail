import { useState } from "react";
import UserInformation from "../../UserInformation/UserInformation";
import "../RegisterCard.css";

function ChooseNameCard({ theme }) {
    //name values
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    //validation state
    const [firstValid, setFirstValid] = useState(null);
    const [firstFb, setFirstFb] = useState("");
    var btnClass;

    if(theme === "dark") btnClass = "btn btn-secondary";
    else btnClass = "btn btn-primary";

    const handleNext = () => {
        let isValid = true;

        //no name chosen scenario
        if (!firstName.trim()) {
            setFirstValid(false);
            setFirstFb("Enter first name");
            isValid = false;
        } else {
            setFirstValid(true);
        }

        if(isValid) {
            //TODO - continue to next register card
        }
    };

    return (
        <div data-bs-theme={theme} className="card register-card border shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="row align-items-start g-2">
                <div className="col-5">
                    <div class="mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" fill="currentColor"
                            class="bi bi-envelope text-start mt-3 mb-4 ms-3" viewBox="0 0 16 16" color="#0d6efd">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1
                             1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8
                             9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                        </svg>
                        <h2 class="text-start open-sans-text ms-3">Create a MeMail Account</h2>
                        <p class="text-start open-sans-text mt-2 ms-3">Enter your name</p>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-6 mt-5">
                    <UserInformation
                        requiredInfo="First name"
                        theme={theme}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        isValid={firstValid}
                        feedback={firstFb}
                    />
                    <div className="mt-4 mb-4"></div>
                    <UserInformation
                        requiredInfo="Surname (optional)"
                        theme={theme}
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                    <div className="d-flex justify-content-end mt-5">
                        <button
                            type="button"
                            className={btnClass + " mt-4"}
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseNameCard;