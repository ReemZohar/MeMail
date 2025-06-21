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

    const performAdvancedSearch = async () => {
        const params = new URLSearchParams();
        if (fromVal) params.set('sender', fromVal);
        if (toVal) params.set('receiver', toVal);
        if (subVal) params.set('subject', subVal);
        if (incVal) params.set('includes', incVal);
        if (notIncVal) params.set('excludes', notIncVal);

        const res = await fetch(`/api/mails/advanced?${params.toString()}`, {
            headers: { 'Accept': 'application/json' }
        });

        console.log(res.json());
    }

    return (
        <div data-bs-theme={theme} className="card search-card">
            <div className="card-body">
                <AdvSearchForm filter={"From"} value={fromVal} onChange={onChgFrom} />
                <AdvSearchForm filter={"To"} value={toVal} onChange={onChgTo} />
                <AdvSearchForm filter={"Subject"} value={subVal} onChange={onChgSub} />
                <AdvSearchForm filter={"Includes the words"} value={incVal} onChange={onChgInc} />
                <AdvSearchForm filter={"Doesn't have"} value={notIncVal} onChange={onChgNotInc} />
            </div>
            <div className="d-flex justify-content-end mb-1 me-1">
                <ThemeButton theme={theme} btnText={"Search"} onClick={performAdvancedSearch} />
            </div>
        </div>
    )
}

export default AdvancedSearch;