import "./UserInformation.css"

function UserInformation({ requiredInfo, theme, className="form-control", type="text" }) {
    return (
        <div class="form-floating" data-bs-theme={theme}>
            <input type={type} class={className} id="floatingInput" placeholder=""></input>
            <label data-bs-theme={theme} for="floatingInput">{requiredInfo}</label>
        </div>
    )
}

//password form component
UserInformation.Password = props => (
    <UserInformation {...props} type="password" />
)

UserInformation.Month = ({ theme }) => {
    return (
        <div class="form-floating" data-bs-theme={theme}>
            <select class="form-select date" id="floatingSelect">
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

UserInformation.Gender = ({ theme }) => {
    return (
        <div class="form-floating" data-bs-theme={theme}>
            <select class="form-select" id="floatingSelect">
                <option value="1">Female</option>
                <option value="2">Male</option>
                <option value="3">Rather not say</option>
            </select>
            <label for="floatingSelect">Gender</label>
        </div>
    )
}

UserInformation.Date = props => (
    <UserInformation {...props} className="form-control date" />
)


export default UserInformation