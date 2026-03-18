import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export default function Login({ authService }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        setLoading(true)
        setError("")

        try {
            const response = await authService.login({
                username,
                password
            })

            console.log("Resposta final:", response)

            // ❌ erro tratado
            if (response.error) {
                setError(response.error)
                setLoading(false)
                return
            }

            // ✅ sucesso
            if (response.access) {
                localStorage.setItem("token", response.access)
                localStorage.setItem("refresh", response.refresh)

                navigate("/", { replace: true })
                return
            }

            setError("Erro inesperado")

        } catch (err) {
            console.error(err)
            setError("Erro ao conectar com o servidor")
        }

        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--primary-soft))]">

            <Card className="w-[360px] bg-white shadow-md rounded-2xl border-0">

                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-[hsl(var(--primary))]">
                        SAGY
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <Label>Usuário</Label>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Senha</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <Button
                            className="w-full bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary-dark))] text-white"
                            disabled={loading}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>

                    </form>
                </CardContent>

            </Card>
        </div>
    )
}