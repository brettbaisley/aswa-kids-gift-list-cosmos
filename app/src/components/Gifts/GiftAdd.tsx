import { useState } from 'react';
import './GiftAdd.css';
import { createGiftDB } from '../../services/GiftService.mjs';
import type { Gift } from '../../types/gift';

type GiftFormValues = {
  title: string;
  brand: string;
  price: string;
};

type GiftAddProps = {
  handleAdd: (gift: Gift) => void;
  toggleForm: (value: boolean) => void;
};

const AddEditGiftForm = ({ handleAdd, toggleForm }: GiftAddProps) => {
  const [formValues, setFormValues] = useState<GiftFormValues>({
    title: '',
    brand: '',
    price: '0.00'
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<'typing' | 'submitting' | 'success'>('typing');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFormValues = { ...formValues, [event.target.name]: event.target.value } as GiftFormValues;
    setFormValues(newFormValues);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const data = (await createGiftDB(formValues)) as Gift;
      handleAdd(data);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  if (status === 'success') {
    return <p>Gift successfully added</p>;
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
            <button type="button" onClick={() => toggleForm(false)}>
              Cancel
            </button>
            <button
              disabled={
                formValues.title.length === 0 ||
                formValues.brand.length === 0 ||
                formValues.price.length === 0 ||
                status === 'submitting'
              }
            >
              Save
            </button>
          </div>

          {error && <p className="message error">Error: {error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddEditGiftForm;