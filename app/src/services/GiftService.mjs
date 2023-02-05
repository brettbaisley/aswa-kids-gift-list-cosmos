export const fetchGiftsDB = async () => {
    const data = await fetch(`/api/gifts`);
    const gifts = await data.json();
    return gifts;
}

export const fetchGiftDB = async (id) => {
    const data = await fetch(`/api/gifts/${id}`);
    const gifts = await data.json();
    return gifts;
}

export const createGiftDB = async () => {
    const data = await fetch(`/api/gifts`, { method: 'POST' });
    const gifts = await data.json();
    return gifts;
}

export const updateGiftDB = async (id, newGift) => {
    const data = await fetch(`/api/gifts/${id}`, { method: 'PUT', body: JSON.stringify(newGift)} );
    const gifts = await data.json();
    return gifts;
}

export const deleteGiftDB = async (id) => {
    const data = await fetch(`/api/gifts/${id}`, { method: 'DELETE' });
    const gifts = await data.json();
    return gifts;
}