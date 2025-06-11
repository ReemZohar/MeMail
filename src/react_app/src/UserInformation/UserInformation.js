import "./UserInformation.css"

function UserInformation({ requiredInfo, theme, type="text", isValid="", feedback="", min="", max="" }) {
    //valid user information scenario
    if(isValid === true) {
        return (
        <div class="form-floating" data-bs-theme={theme}>
            <input type={type} class="form-control is-valid" id="floatingInput" placeholder="" min={min} max={max}></input>
            <label data-bs-theme={theme} for="floatingInput">{requiredInfo}</label>
        </div>
        )
    }
    //invalid user information scenario
    else if(isValid === false) {
        return (
        <div class="form-floating" data-bs-theme={theme}>
            <input type={type} class="form-control is-invalid" id = "floatingInput" placeholder="" min={min} max={max}></input>
            <label data-bs-theme={theme} for="floatingInput">{requiredInfo}</label>
            <div class="invalid-feedback">
                {feedback}
            </div>
        </div>
        )
    }
    //no feedback user information form scenario
    else {
        return (
        <div class="form-floating" data-bs-theme={theme}>
            <input type={type} class="form-control" id = "floatingInput" placeholder="" min={min} max={max}></input>
            <label data-bs-theme={theme} for="floatingInput">{requiredInfo}</label>
        </div>
        )
    }
}

//password form component
UserInformation.Password = props => {
    //TODO: password validation function
    //props.isValid =
    //props.feedback =
    return (
        <UserInformation {...props} type="password" />
    )
}

//number form component
UserInformation.Num = props => {
    //TODO: password validation function
    //props.isValid =
    //props.feedback =
    return (
        <UserInformation {...props} type="number"/>
    )
}

//month form component
UserInformation.Month = ({ theme }) => {
    return (
        <div class="form-floating" data-bs-theme={theme}>
            <select class="form-select" id="floatingSelect">
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
            <label for="floatingSelect">Month</label>
        </div>
    )
}

//gender form component
UserInformation.Gender = ({ theme }) => {
    return (
        <div class="form-floating col-4-5" data-bs-theme={theme}>
            <select class="form-select" id="floatingSelect">
                <option value="1">Female</option>
                <option value="2">Male</option>
                <option value="3">Rather not say</option>
            </select>
            <label for="floatingSelect">Gender</label>
        </div>
    )
}

//day month and year form component
UserInformation.Date = ({ theme }) => {
    //TODO: date validation function
    //const isValid =
    //const feedback =
    const date = new Date();
    const currYear = date.getFullYear();

    return (
        <div class="row g-2">
            <div class="col-1-5">
                <UserInformation.Num requiredInfo={"Day"} theme={theme} min={1} max={31}></UserInformation.Num> 
            </div>
            <div class="col-1-5">
                <UserInformation.Month theme={theme}></UserInformation.Month>
            </div>
            <div class="col-1-5">
                <UserInformation.Num requiredInfo={"Year"} theme={theme} min={1} max={currYear}></UserInformation.Num>
            </div>
        </div>
    )
}

export default UserInformation