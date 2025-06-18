function ThemeButton({ theme, btnText, handleNext }) {
    var btnClass

    if (theme === "dark") btnClass = "btn btn-secondary"
    else btnClass = "btn btn-primary";

    return (
        <div>
            <button
                type="button"
                className={btnClass + " mt-4"}
                onClick={handleNext}
            >{btnText}</button>
        </div>
    )
}

export default ThemeButton;