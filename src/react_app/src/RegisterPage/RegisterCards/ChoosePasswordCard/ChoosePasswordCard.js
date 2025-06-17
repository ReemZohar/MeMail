import { useState } from "react";
import UserInformation from "../../../UserInformation/UserInformation";
import LogoAndText from "../LogoAndText/LogoAndText";
import "../RegisterCard.css";
import "./ChoosePasswordCard.css"

function ChooseNameCard({ theme }) {
    const passGuideStart = "Your password must be 8-20 characters long, contain letters and numbers,";
    const passGuideEnd = " and must not contain spaces, special characters, or emoji.";
    const passHeader = "Create a strong password";
    const passMsg = "Create a strong password with a mixture of letters, numbers and symbols";
    var btnClass;

    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [passValid, setPassValid] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    if (theme === "dark") btnClass = "btn btn-secondary";
    else btnClass = "btn btn-primary";

    const handleNext = () => {
        //one or more fields are empty scenario
        if (!password || !confPassword) {
            setPassValid(false);
            setFeedback("Enter a password");
            return;
        }
        //invalid password scenario
        else if (!/^[A-Za-z0-9]{8,20}$/.test(password)) {
            setPassValid(false);
            setFeedback("Your password must be 8-20 characters long, contain letters and numbers, " +
                "and must not contain spaces, special characters, or emoji.");
                return;
        }
        //passwords don't match scenario
        else if (password !== confPassword) {
            setPassValid(false);
            setFeedback("Those passwords didn't match. Try again.");
            return;
        }
        //valid password scenario
        else {
            setPassValid(true);
            feedback("");
            return;
        }
    };

    return (
        <div data-bs-theme={theme} className="card register-card border shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="row align-items-start g-2">
                <LogoAndText
                    header={passHeader}
                    msg={passMsg}
                />
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
                        isValid={passValid}
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