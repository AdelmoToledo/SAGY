export class AuthService {

    constructor(apiClient) {
        this.api = apiClient
    }

    async login({ username, password }) {

        console.log("Chamando backend...")

        const data = await this.api.post("/login/login/", {
            username,
            password
        })

        console.log("Resposta:", data)

        // 🔥 IMPORTANTE: tratar erro 400 do Django
        if (data.username || data.password) {
            return { error: "Campos inválidos" }
        }

        if (data.detail) {
            return { error: "Usuário ou senha inválidos" }
        }

        // sucesso
        return data
    }
}