export const apiClient = {
    post: async (url, data) => {

        // Development local
        //const response = await fetch("http://127.0.0.1:8001" + url, {
        // Production        
        const response = await fetch("https://sagy.onrender.com" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        return response.json()
    }
}