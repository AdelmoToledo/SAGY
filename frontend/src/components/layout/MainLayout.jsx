import { useNavigate, useLocation } from "react-router-dom"

export default function MainLayout({ children }) {

    const navigate = useNavigate()
    const location = useLocation()

    console.log("Rota atual:", location.pathname)

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
        navigate("/login")
    }

    return (
        <div className="flex min-h-screen bg-[hsl(var(--primary-soft))]">

            <aside className="w-64 bg-white/80 backdrop-blur border-r p-5 shadow-sm flex flex-col">

                <h1 className="text-2xl font-bold text-[hsl(var(--primary))] mb-8">
                    SAGY
                </h1>

                <nav className="flex flex-col gap-2 flex-1">

                    <button
                        onClick={() => navigate("/")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                        ${
                            location.pathname === "/"
                                ? "bg-[hsl(var(--primary-soft))] text-[hsl(var(--primary))] shadow-sm"
                                : "hover:bg-[hsl(var(--primary-soft))]"
                        }`}
                    >
                        🗃 Cadastro
                    </button>
                    
                    <button
                        onClick={() => navigate("/vendedoras")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                        ${
                            location.pathname === "/vendedoras"
                                ? "bg-[hsl(var(--primary-soft))] text-[hsl(var(--primary))] shadow-sm"
                                : "hover:bg-[hsl(var(--primary-soft))]"
                        }`}
                    >
                        👱🏼‍♀️ Vendedoras
                    </button>

                    <button
                        onClick={() => navigate("/estoque")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                        ${
                            location.pathname.startsWith("/estoque")
                                ? "bg-[hsl(var(--primary-soft))] text-[hsl(var(--primary))] shadow-sm"
                                : "hover:bg-[hsl(var(--primary-soft))]"
                        }`}
                    >
                        📦 Estoque
                    </button>

                    <button
                        onClick={() => navigate("/produtos")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                        ${
                            location.pathname.startsWith("/produtos")
                                ? "bg-[hsl(var(--primary-soft))] text-[hsl(var(--primary))] shadow-sm"
                                : "hover:bg-[hsl(var(--primary-soft))]"
                        }`}
                    >
                        🏷️ Produtos
                    </button>

                </nav>

                <button
                    onClick={logout}
                    className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                    Sair
                </button>

            </aside>

            <div className="flex-1 flex flex-col">

                <header className="h-14 flex items-center justify-between px-6">
                    <span className="text-sm text-gray-600">
                        Sistema de Gestão
                    </span>

                    <span className="text-sm text-gray-500">
                        Olá 👋
                    </span>
                </header>

                <main className="p-8">
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        {children}
                    </div>
                </main>

            </div>

        </div>
    )
}

function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh")

    window.location.href = "/login"
}

