import { useState } from "react";
import UserInformation from "../../../UserInformation/UserInformation";
import LogoAndText from "../LogoAndText/LogoAndText";
import "../RegisterCard.css";

function ChooseNameCard({ theme }) {
    const header = "Create a MeMail Account";
    const msg = "Enter your name";
    //name values
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    //validation state
    const [firstValid, setFirstValid] = useState(null);
    const [firstFb, setFirstFb] = useState("");
    var btnClass;

    if (theme === "dark") btnClass = "btn btn-secondary";
    else btnClass = "btn btn-primary";

    const handleNext = () => {
        //no first name was chosen scenario
        if (!firstName) {
            setFirstFb("Enter first name");
            setFirstValid(false);
            return;
        }
        setFirstValid(true);
        setFirstFb("");
    };

    return (
        <div data-bs-theme={theme} className="card register-card border shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="row align-items-start g-2">

                {/*left column*/}
                <LogoAndText
                    header={header}
                    msg={msg}
                />

                <div className="col-1"></div>

                {/*right column*/}
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