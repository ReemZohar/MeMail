import './AdvancedSearch.css';
import AdvSearchForm from '../AdvSearchForm/AdvSearchForm';
import ThemeButton from '../ThemeButton/ThemeButton';

function AdvancedSearch({
    token,
    onSearchResults,
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
    setShowAdvanced
}) {

    const performAdvancedSearch = async () => {
        const params = new URLSearchParams();
        if (fromVal) params.set('sender', fromVal);
        if (toVal) params.set('receiver', toVal);
        if (subVal) params.set('subject', subVal);
        if (incVal) params.set('includes', incVal);
        if (notIncVal) params.set('excludes', notIncVal);

        const res = await fetch(
            `http://localhost:9090/api/mails/advanced?${params.toString()}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        );

        if (!res.ok) {
            console.error('Advanced search failed:', res.status);
            return;
        }

        const data = await res.json();

        //updates the search results
        onSearchResults(data);
        //closes the advanced search card
        setShowAdvanced(false);
    }

    return (
        <div className="card search-card">
            <div className="card-body">
                <AdvSearchForm filter={"From"} value={fromVal} onChange={onChgFrom} />
                <AdvSearchForm filter={"To"} value={toVal} onChange={onChgTo} />
                <AdvSearchForm filter={"Subject"} value={subVal} onChange={onChgSub} />
                <AdvSearchForm filter={"Includes the words"} value={incVal} onChange={onChgInc} />
                <AdvSearchForm filter={"Doesn't have"} value={notIncVal} onChange={onChgNotInc} />
            </div>
            <div className="d-flex justify-content-end mb-1 me-1">
                <ThemeButton btnText={"Search"} handleNext={performAdvancedSearch} />
            </div>
        </div>
    )
}

export default AdvancedSearch;