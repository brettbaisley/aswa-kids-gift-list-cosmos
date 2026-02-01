import { useState } from 'react';
import './GiftItem.css';
import { useAuthContext } from '../context/AuthContext';
import type { Gift } from '../types/gift';

type DisplayGiftItemProps = {
  gift: Gift;
  handleStartEdit: () => void;
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
};

const DisplayGiftItem = ({ gift, handleStartEdit }: DisplayGiftItemProps) => {
  const [userInfo] = useAuthContext();
  return (
    <>
      <p className="giftId">{gift._id}</p>
      <p className="giftTitle">{gift.title}</p>
      <p className="giftBrand">{gift.brand}</p>
      <p className="giftPrice">${gift.price}</p>
      <p className="giftIdPurchased">{gift.purchased ? 'Purchased' : 'Available'}</p>
      <p className="giftKids">{gift.kids.join(', ')}</p>

      {userInfo && (
        <button onClick={handleStartEdit}>
          <i className="fa-light fa-square-pen"></i>
        </button>
      )}
    </>
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
    <>
      <p className="giftId">{gift._id}</p>

      <input type="text" name="title" id="title" value={gift.title} onChange={handleTextChange} />

      <input type="text" name="brand" id="brand" value={gift.brand} onChange={handleTextChange} />

      <input type="text" name="price" id="price" value={String(gift.price)} onChange={handleTextChange} />

      <div>
        <input
          type="checkbox"
          name="purchased"
          id="purchased"
          checked={gift.purchased}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="purchased">Purchased</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="Mateo"
          id="Mateo"
          checked={gift.kids.includes('Mateo')}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Mateo">Mateo</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="Lucas"
          id="Lucas"
          checked={gift.kids.includes('Lucas')}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Lucas">Lucas</label>
      </div>

      <div className="btn-group">
        <button className="success" onClick={handleUpdateGift}>
          <i className="fa-light fa-pen"></i>
        </button>
        <button className="warning" onClick={handleStopEdit}>
          <i className="fa-light fa-ban"></i>
        </button>
      </div>
    </>
  );
};

const GiftItem = ({ gift, handleUpdate }: GiftItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedGift, setUpdatedGift] = useState<Gift>({ ...gift });

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
      const kids = checked
        ? [...prev.kids, name]
        : prev.kids.filter((kid) => kid !== name);
      return { ...prev, kids };
    });
  };

  const handleUpdateGift = () => {
    handleUpdate(updatedGift);
    setIsEditing(false);
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
  return <DisplayGiftItem gift={gift} handleStartEdit={handleStartEdit} />;
};

export default GiftItem;