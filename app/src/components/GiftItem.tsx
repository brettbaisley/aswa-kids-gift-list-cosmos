import { useState } from 'react';
import './GiftItem.css';
import { useAuthContext } from '../context/AuthContext';
import type { Gift } from '../types/gift';

import Ban from '../assets/icons/ban.svg?react';
import Trashcan from '../assets/icons/trash.svg?react';
import Pen from '../assets/icons/square-pen.svg?react';

type DisplayGiftItemProps = {
  gift: Gift;
  handleStartEdit: () => void;
  handleDelete: () => void;
  handleTogglePurchased: () => void;
};

type EditGiftItemProps = {
  gift: Gift;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateGift: () => void;
  handleStopEdit: () => void;
};

type GiftItemProps = {
  gift: Gift;
  handleUpdate: (gift: Gift) => void;
  handleDelete: (giftId: string) => void;
};

const DisplayGiftItem = ({ gift, handleStartEdit, handleDelete, handleTogglePurchased }: DisplayGiftItemProps) => {
  const { userInfo, isAdmin } = useAuthContext();
  const kids = gift.kids ?? [];
  const price = Number(gift.price) || 0;
  
  // Check if current user can unmark the gift as purchased
  const canUnmarkPurchase = !gift.purchased || isAdmin || (gift.purchasedBy === userInfo?.userDetails);
  
  return (
    <div className={gift.purchased ? 'gift-card gift-card--purchased' : 'gift-card'}>
      <div className="gift-card__image">
        {gift.imageUrl ? (
          <img src={gift.imageUrl} alt={gift.title} loading="lazy" />
        ) : (
          <div className="gift-card__placeholder">No image</div>
        )}
      </div>
      <div className="gift-card__content">
        <div className="gift-card__header">
          <h3 className="giftTitle">{gift.title}</h3>
          <span className="giftPrice">${price.toFixed(2)}</span>
        </div>
        <p className="giftBrand">{gift.brand}</p>
        <div className="gift-card__meta">
          <span className={gift.purchased ? 'giftStatus giftStatus--purchased' : 'giftStatus giftStatus--available'}>
            {gift.purchased ? 'Purchased' : 'Available'}
          </span>
          {gift.purchased && gift.purchasedBy && (
            <span className="giftPurchasedBy">by {gift.purchasedBy}</span>
          )}
        </div>
        <div className="giftKids">
          {kids.length > 0 ? (
            kids.map((kid) => (
              <span key={kid} className="giftKidPill">
                {kid}
              </span>
            ))
          ) : (
            <span className="giftKidPill giftKidPill--none">No kid assigned</span>
          )}
        </div>
      </div>
      {userInfo && (
        <>
          <div className="gift-card__actions">
            <button className="gift-card__edit" onClick={handleStartEdit} aria-label="Edit gift">
              <Pen className="icon" aria-hidden="true" />
              {/* <span className="btn-text">Edit</span> */}
            </button>
            {isAdmin && (
              <button className="gift-card__delete" onClick={handleDelete} aria-label="Delete gift">
                <Trashcan className="icon" aria-hidden="true" />
                {/* <span className="btn-text">Delete</span> */}
              </button>
            )}
          </div>
          <button 
            className={gift.purchased ? 'gift-card__purchased-btn gift-card__purchased-btn--purchased' : 'gift-card__purchased-btn'}
            onClick={handleTogglePurchased}
            disabled={!canUnmarkPurchase}
            title={!canUnmarkPurchase ? `Only ${gift.purchasedBy} or admins can unmark this gift` : ''}
            aria-label={gift.purchased ? 'Mark as not purchased' : 'Mark as purchased'}
          >
            {gift.purchased ? 'Mark as Not Purchased' : 'Mark as Purchased'}
          </button>
        </>
      )}
    </div>
  );
};

const EditGiftItem = ({
  gift,
  handleTextChange,
  handleCheckboxChange,
  handleUpdateGift,
  handleStopEdit
}: EditGiftItemProps) => {
  return (
    <div className="gift-card gift-card--editing">
      <div className="gift-card__content">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={gift.title} onChange={handleTextChange} />

        <label htmlFor="brand">Brand</label>
        <input type="text" name="brand" id="brand" value={gift.brand} onChange={handleTextChange} />

        <label htmlFor="price">Price</label>
        <input type="text" name="price" id="price" value={String(gift.price)} onChange={handleTextChange} />

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="url"
          name="imageUrl"
          id="imageUrl"
          value={gift.imageUrl ?? ''}
          onChange={handleTextChange}
          placeholder="https://..."
        />

        <div className="gift-card__checkboxes">
          <label className="checkbox">
            <input
              type="checkbox"
              name="purchased"
              id="purchased"
              checked={gift.purchased}
              onChange={handleCheckboxChange}
            />
            Purchased
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="Mateo"
              id="Mateo"
              checked={(gift.kids ?? []).includes('Mateo')}
              onChange={handleCheckboxChange}
            />
            Mateo
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="Lucas"
              id="Lucas"
              checked={(gift.kids ?? []).includes('Lucas')}
              onChange={handleCheckboxChange}
            />
            Lucas
          </label>
        </div>
      </div>

      <div className="btn-group">
        <button className="success" onClick={handleUpdateGift} aria-label="Save gift">
          <Pen className="icon" aria-hidden="true" />
          <span>Save</span>
        </button>
        <button className="warning" onClick={handleStopEdit} aria-label="Cancel edit">
          <Ban className="icon" aria-hidden="true" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

const GiftItem = ({ gift, handleUpdate, handleDelete }: GiftItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedGift, setUpdatedGift] = useState<Gift>({ ...gift, kids: gift.kids ?? [] });

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleStopEdit = () => {
    setIsEditing(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedGift((prev) => ({ ...prev, [e.target.name]: e.target.value } as Gift));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === 'purchased') {
      setUpdatedGift((prev) => ({ ...prev, purchased: checked }));
      return;
    }

    setUpdatedGift((prev) => {
      const kidsList = prev.kids ?? [];
      const kids = checked ? [...kidsList, name] : kidsList.filter((kid) => kid !== name);
      return { ...prev, kids };
    });
  };

  const handleUpdateGift = () => {
    handleUpdate(updatedGift);
    setIsEditing(false);
  };

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this gift?')) {
      handleDelete(gift._id);
    }
  };

  const handleTogglePurchased = () => {
    const updatedGiftData = { ...gift, purchased: !gift.purchased };
    handleUpdate(updatedGiftData);
  };

  if (isEditing) {
    return (
      <EditGiftItem
        gift={updatedGift}
        handleTextChange={handleTextChange}
        handleCheckboxChange={handleCheckboxChange}
        handleUpdateGift={handleUpdateGift}
        handleStopEdit={handleStopEdit}
      />
    );
  }
  return <DisplayGiftItem gift={gift} handleStartEdit={handleStartEdit} handleDelete={onDelete} handleTogglePurchased={handleTogglePurchased} />;
};

export default GiftItem;