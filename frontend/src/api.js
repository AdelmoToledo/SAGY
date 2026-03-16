//development local
const API_URL = import.meta.env.VITE_API_URL;

//deploy
//const API_URL = 'https://sagy.onrender.com';

export async function getHome() {
    const response = await fetch(`${API_URL}/home/home/`);
    return await response.json();
}