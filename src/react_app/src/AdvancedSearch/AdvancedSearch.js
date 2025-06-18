import './AdvancedSearch.css';
import AdvSearchForm from '../AdvSearchForm/AdvSearchForm';

function AdvancedSearch({
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
    return (
        <div class="card search-card">
            <div class="card-body">
                <AdvSearchForm filter={"From"} />
                <AdvSearchForm filter={"To"} />
                <AdvSearchForm filter={"Subject"} />
                <AdvSearchForm filter={"Includes the words"} />
                <AdvSearchForm filter={"Doesn't have"} />
            </div>
        </div>
    )
}

export default AdvancedSearch;