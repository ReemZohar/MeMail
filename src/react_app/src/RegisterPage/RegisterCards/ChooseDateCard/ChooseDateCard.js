import { useState } from "react";
import UserInformation from "../../../UserInformation/UserInformation"
import LogoAndText from "../LogoAndText/LogoAndText";
import "./ChooseDateCard.css"
import "../RegisterCard.css"
import validateDate from "./validateDate";

function ChooseDateCard({
    theme,
    dayValue,
    onChangeDay,
    monthValue,
    onChangeMonth,
    yearValue,
    onChangeYear,
    genderValue,
    onChangeGender,
    onNext
}) {
    const header = "Basic information";
    const msg = "Enter your birthday and gender";
    const [dateValid, setDateValid] = useState("");
    const [feedback, setFeedback] = useState("");
    var btnClass;

    if (theme === "dark") btnClass = "btn btn-secondary";
    else btnClass = "btn btn-primary";

     const handleNext = () => {
        //one or more fields are empty scenario
        if (!dayValue || !monthValue || !yearValue) {
            setDateValid(false);
            setFeedback("Please fill in a complete date of birth");
            return;
        }
        //invalid date scenario
        else if (!validateDate(Number(dayValue), Number(monthValue), Number(yearValue))) {
            setDateValid(false);
            setFeedback("Please enter a valid date");
            return;
        } else { //valid date scenario
            setDateValid(true);
            setFeedback("");
            onNext();
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

                <div className="col-1"></div>

                {/*right column*/}
                <div className="col-6 mt-5">
                    <UserInformation.Date
                        theme={theme}
                        isValid={dateValid}
                        dayValue={dayValue}
                        monthValue={monthValue}
                        yearValue={yearValue}
                        onChangeDay={onChangeDay}
                        onChangeMonth={onChangeMonth}
                        onChangeYear={onChangeYear}
                    />
                    {dateValid === false && (
                        <div className="invalid-feedback d-block mt-1">
                            {feedback}
                        </div>
                    )}
                    <div className="mt-2 mb-2"></div>
                    <UserInformation.Gender
                        theme={theme}
                        value={genderValue}
                        onChange={onChangeGender}
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