import './AdvancedSearch.css';
import AdvSearchForm from '../AdvSearchForm/AdvSearchForm';
import ThemeButton from '../ThemeButton/ThemeButton';

function AdvancedSearch({
    theme,
    fromVal,
    onChgFrom,
    toVal,
    onChgTo,
    subVal,
    onChgSub,
    incVal,
    onChgInc,
    notIncVal,
    onChgNotInc,
}) {
    const handleNext = () => {

    }

    return (
        <div data-bs-theme={theme} class="card search-card">
            <div class="card-body">
                <AdvSearchForm filter={"From"} />
                <AdvSearchForm filter={"To"} />
                <AdvSearchForm filter={"Subject"} />
                <AdvSearchForm filter={"Includes the words"} />
                <AdvSearchForm filter={"Doesn't have"} />
            </div>
            <div className="d-flex justify-content-end mb-1 me-1">
                <ThemeButton theme={theme} btnText={"Search"} handleNext={handleNext} />
            </div>
        </div>
    )
}

export default AdvancedSearch;