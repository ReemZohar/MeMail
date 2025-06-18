import "../RegisterCard.css"

{/*provides a column with the app logo, a header and a message*/}
function LogoAndText({header, msg}) {
    return (
        <div className="col-5">
            <div className="mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" fill="currentColor"
                    className="bi bi-envelope text-start mt-3 mb-4 ms-3" viewBox="0 0 16 16" color="#0d6efd">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1
                                1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8
                                9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
                <h2 className="text-start open-sans-text ms-3">{header}</h2>
                <p className="text-start open-sans-text mt-2 ms-3">{msg}</p>
            </div>
        </div>
    )
}

export default LogoAndText