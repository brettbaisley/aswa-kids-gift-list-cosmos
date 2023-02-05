export const fetchGiftsJSON = async () => {
    const data = await fetch("/api/gifts");
    const gifts = await data.json();
    return gifts;
}