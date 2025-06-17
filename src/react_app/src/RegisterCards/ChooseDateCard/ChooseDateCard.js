import { useState } from "react";
import UserInformation from "../../UserInformation/UserInformation"
import LogoAndText from "../LogoAndText/LogoAndText";
import "./ChooseDateCard.css"
import "../RegisterCard.css"

function ChooseDateCard({ theme }) {
    const header = "Basic information";
    const msg = "Enter your birthday and gender";
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("1");
    const [year, setYear] = useState("");
    const [gender, setGender] = useState("1");
    const [dateValid, setDateValid] = useState("");
    const [feedback, setFeedback] = useState("");
    var btnClass;

    if (theme === "dark") btnClass = "btn btn-secondary";
    else btnClass = "btn btn-primary";

    //TODO: add implementation when creating the register page
    const handleNext = () => {};

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