import { useState } from "react";
import UserInformation from "../../UserInformation/UserInformation"
import "./ChooseDateCard.css"
import "../RegisterCard.css"
import validateDate from "./validateDate";

function ChooseDateCard({ theme }) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("1");
    const [year, setYear] = useState("");
    const [gender, setGender] = useState("1");
    const [dateValid, setDateValid] = useState("");
    const [feedback, setFeedback] = useState("");
    var btnClass;

    if (theme === "dark") btnClass = "btn btn-secondary";
    else btnClass = "btn btn-primary";

    const handleNext = () => {
        //not all forms were filled scenario
        if (!day || !year) {
            setDateValid(false);
            setFeedback("Please fill in a complete date of birth");
            return;
        }
        else if (!validateDate(day, month, year)) {
            setDateValid(false);
            setFeedback("Please enter a valid date");
            return;
        }
        setDateValid(true);
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
                        <h2 className="text-start open-sans-text ms-3">Basic information</h2>
                        <p className="text-start open-sans-text mt-2 ms-3">Enter your birthday and gender</p>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-6 mt-5">
                    <UserInformation.Date
                        theme={theme}
                        isValid={dateValid}
                        dayValue={day}
                        monthValue={month}
                        yearValue={year}
                        onChangeDay={e => setDay(e.target.value)}
                        onChangeMonth={e => setMonth(e.target.value)}
                        onChangeYear={e => setYear(e.target.value)}
                    />
                    {dateValid === false && (
                        <div className="invalid-feedback d-block mt-1">
                            {feedback}
                        </div>
                    )}
                    <div className="mt-2 mb-2"></div>
                    <UserInformation.Gender
                        theme={theme}
                        value={gender}
                        onChange={e => setGender(e.target.value)}
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

export default ChooseDateCard