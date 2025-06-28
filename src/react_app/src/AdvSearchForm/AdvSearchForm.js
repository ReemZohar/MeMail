import './AdvSearchForm.css'

let counter = 0;

const generateId = (bootstrapId) => bootstrapId + '-' + String(counter++);

function AdvSearchForm({ filter, value, onChange }) {
    const inputId = generateId("colFormLabelSm");
    
    return (
        <div className="row mb-3">
            <label
                htmlFor={inputId}
                className="col-form-label col-form-label-sm col-auto gray mt-1"
            >
                {filter}
            </label>
            <div className="col ms-4">
                <input
                    type="text"
                    className="form-control form-control-sm underline-input"
                    id={inputId}
                    value={value}
                    onChange={onChange}
                    placeholder=""
                />
            </div>
        </div>
    )
}

export default AdvSearchForm