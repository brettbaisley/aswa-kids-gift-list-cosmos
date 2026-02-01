export const fetchGiftsDB = async () => {
    const data = await fetch(`/api/gifts`);
    const gifts = await data.json();
    return gifts;
}

export const fetchGiftDB = async (id) => {
    try {
        const response = await fetch(`/api/gifts/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;        
    } catch (error) {
        console.error('Error fetching gifts:', error);
        throw error;
    }
}

export const createGiftDB = async (gift) => {
    const data = await fetch(`/api/gifts`, { 
        method: 'POST', 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(gift)
    });
    const gifts = await data.json();
    return gifts;
}

export const updateGiftDB = async (id, newGift) => {
    const data = await fetch(`/api/gifts/${id}`, { method: 'PUT', body: JSON.stringify(newGift)} );
    const gifts = await data.json();
    return gifts;
}

export const deleteGiftDB = async (id) => {
    const response = await fetch(`/api/gifts/${id}`, { method: 'DELETE' });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to delete gift' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
}