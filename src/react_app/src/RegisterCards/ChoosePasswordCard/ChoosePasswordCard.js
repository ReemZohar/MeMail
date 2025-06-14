import { useState } from "react";
import UserInformation from "../../UserInformation/UserInformation";
import "../RegisterCard.css";
import "./ChoosePasswordCard.css"

function ChooseNameCard({ theme }) {
    const passGuideStart = "Your password must be 8-20 characters long, contain letters and numbers,";
    const passGuideEnd = " and must not contain spaces, special characters, or emoji.";
    var btnClass;

    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [passValid, setPassValid] = useState(null);
    const [confValid, setConfValid] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    if (theme === "dark") btnClass = "btn btn-secondary";
    else btnClass = "btn btn-primary";

    const handleNext = () => {

        //TODO add validation through server
        //if(!validatePassword)
        //no name chosen scenario
        if (!password || !confPassword) {
            setPassValid(false);
            setConfValid(false)
            setFeedback("Enter a password");
            return;
        } else if (password != confPassword) {
            setPassValid(false);
            setConfValid(false);
            setFeedback("Those passwords didn't match. Try again.");
            return;
        }
        setPassValid(true);
        setConfValid(true);
        setFeedback("");
    };

    return (
        <div data-bs-theme={theme} className="card register-card border shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="row align-items-start g-2">
                <div className="col-5">
                    <div className="mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" fill="currentColor"
                            className="bi bi-envelope text-start mt-3 mb-4 ms-3" viewBox="0 0 16 16" color="#0d6efd">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1
                             1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8
                             9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                        </svg>
                        <h2 className="text-start open-sans-text ms-3">Create a strong password</h2>
                        <p className="text-start open-sans-text mt-2 ms-3 small">
                            Create a strong password with a mixture of letters, numbers and symbols
                        </p>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-6 mt-5">
                    <UserInformation
                        requiredInfo="Password"
                        theme={theme}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        isValid={passValid}
                    />
                    <div className="mt-4 mb-4"></div>
                    <UserInformation
                        requiredInfo="Confirm"
                        theme={theme}
                        value={confPassword}
                        onChange={e => setConfPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        isValid={confValid}
                        feedback={feedback}
                    />
                    <p className="small gray ms-3">{passGuideStart + passGuideEnd}</p>
                    <div className="form-check mb-3 ms-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="showPasswordCheck"
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="showPasswordCheck">
                            Show password
                        </label>
                    </div>
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