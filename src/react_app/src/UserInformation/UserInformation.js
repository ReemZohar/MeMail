import "./UserInformation.css"

let counter = 0;

const generateId = (bootstrapId) => bootstrapId + '-' + String(counter++);

function UserInformation({ requiredInfo, theme, type = "text", isValid = "", feedback = "", min = "", max = "", value = "",
    onChange = () => { } }) {
    const inputIds = [generateId("floatingInput"), generateId("floatingInput"), generateId("floatingInput")];
    //valid user information scenario
    if (isValid === true) {
        return (
            <div className="form-floating" data-bs-theme={theme}>
                <input type={type} className="form-control is-valid" id={inputIds[0]} placeholder="" min={min} max={max}
                    value={value} onChange={onChange}></input>
                <label data-bs-theme={theme} htmlFor={inputIds[0]}>{requiredInfo}</label>
                <div className="valid-feedback">
                    {feedback}
                </div>
            </div>
        )
    }
    //invalid user information scenario
    else if (isValid === false) {
        return (
            <div className="form-floating" data-bs-theme={theme}>
                <input type={type} className="form-control is-invalid" id={inputIds[1]} placeholder="" min={min} max={max}
                    value={value} onChange={onChange}></input>
                <label data-bs-theme={theme} htmlFor={inputIds[1]}>{requiredInfo}</label>
                <div className="invalid-feedback">
                    {feedback}
                </div>
            </div>
        )
    }
    //no feedback user information form scenario
    else {
        return (
            <div className="form-floating" data-bs-theme={theme}>
                <input type={type} className="form-control" id={inputIds[2]} placeholder="" min={min} max={max}
                    value={value} onChange={onChange}></input>
                <label data-bs-theme={theme} htmlFor={inputIds[2]}>{requiredInfo}</label>
                <div className="form-text ms-3">
                    {feedback}
                </div>
            </div>
        )
    }
}

//password form component
UserInformation.Password = props => {
    return (
        <UserInformation {...props} type="password" />
    )
}

//number form component
UserInformation.Num = props => {
    return (
        <UserInformation {...props} type="number" />
    )
}

//month form component
UserInformation.Month = ({ theme, value, onChange, isValid }) => {
    var className = "form-select";
    const selectId = generateId("floatingSelect");

    if (isValid === false) className += " is-invalid";

    return (
        <div className="form-floating" data-bs-theme={theme}>
            <select className={className} id={selectId} value={value} onChange={onChange}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">Spetember</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <label htmlFor={selectId}>Month</label>
        </div>
    )
}

//gender form component
UserInformation.Gender = ({ theme, value, onChange }) => {
    const selectId = generateId("floatingSelect");
    return (
        <div className="form-floating col-4-5" data-bs-theme={theme}>
            <select className="form-select" id={selectId} value={value} onChange={onChange}>
                <option value="1">Female</option>
                <option value="2">Male</option>
                <option value="3">Rather not say</option>
            </select>
            <label htmlFor={selectId}>Gender</label>
        </div>
    )
}

//day month and year form component
UserInformation.Date = ({ theme, dayValue, monthValue, yearValue, onChangeDay, onChangeMonth, onChangeYear, isValid = "" }) => {
    const date = new Date();
    const currYear = date.getFullYear();

    return (
        <div className="row g-2">
            <div className="col-1-5">
                <UserInformation.Num
                    requiredInfo={"Day"}
                    theme={theme}
                    isValid={isValid}
                    min={1}
                    max={31}
                    value={dayValue}
                    onChange={onChangeDay}
                ></UserInformation.Num>
            </div>
            <div className="col-1-5">
                <UserInformation.Month
                    theme={theme}
                    isValid={isValid}
                    value={monthValue}
                    onChange={onChangeMonth}
                ></UserInformation.Month>
            </div>
            <div className="col-1-5">
                <UserInformation.Num
                    requiredInfo={"Year"}
                    theme={theme}
                    isValid={isValid}
                    min={1}
                    max={currYear}
                    value={yearValue}
                    onChange={onChangeYear}
                ></UserInformation.Num>
            </div>
        </div>
    )
}

export default UserInformation