import './AdvSearchForm.css'

function AdvSearchForm({ filter, value, onChange }) {
    return (
        <div className="row mb-3">
            <label
                htmlFor="colFormLabelSm"
                className="col-form-label col-form-label-sm col-auto gray mt-1"
            >
                {filter}
            </label>
            <div className="col ms-4">
                <input
                    type="text"
                    className="form-control form-control-sm underline-input"
                    id="colFormLabelSm"
                    value={value}
                    onChange={onChange}
                    placeholder=""
                />
            </div>
        </div>
    )
}

export default AdvSearchForm