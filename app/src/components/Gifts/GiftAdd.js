import React, {useState} from "react";
import './GiftAdd.css';

import { createGiftDB } from "../../services/GiftService.mjs";


const AddEditGiftForm = ( {toggleForm}) => {
    const [formValues, setFormValues] = useState({ title: "", brand: "", price: "0.00"});
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('typing');

    const handleChange = (event) => {
        var newFormValues = {...formValues, [event.target.name] : event.target.value};
        setFormValues(newFormValues);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await createGiftDB(formValues);
            setStatus('success');
        } catch (err) {
            setStatus('typing');
            setError(err);
        }
    }

    if (status === 'success') {
        return <p>Gift successfully added</p>
    }

    return (
        <div className="modal-background">
            <div className="modal-body">
                
                <form onSubmit={handleSubmit}>
                    <h2>Add Gift</h2>

                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={formValues.title} onChange={handleChange} />

                    <label htmlFor="brand">Brand</label>
                    <input type="text" name="brand" id="brand" value={formValues.brand} onChange={handleChange} />

                    <label htmlFor="price">Price ($)</label>
                    <input type="text" name="price" id="price" value={formValues.price} onChange={handleChange} />

                    <div className="actions">
                        <button onClick={() => toggleForm(false)}>Cancel</button>
                        <button disabled={formValues.title.length === 0 || formValues.brand.length === 0 || formValues.price.length === 0 || status === 'submitting'}>Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddEditGiftForm;