const API_URL = import.meta.env.VITE_API_URL;

export async function getHome() {
    const response = await fetch(`${API_URL}/home/home/`);
    return await response.json();
}