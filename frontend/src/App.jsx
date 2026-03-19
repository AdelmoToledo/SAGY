import React, { useState} from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./views/Login"
import WakeUp from "./views/WakeUp"
import MainLayout from "@/components/layout/MainLayout"

export default function App({ authService }) {

    //1. Estado para controlar se o servidor já está online
    const [isServerAwake, setServerAwake] = useState(false)

    function PrivateRoute({ children }) {
        const token = localStorage.getItem("token")

        if (!token) {
            return <Navigate to="/login" replace />
        }

        return children
    }

    // 2. 🛡️ GUARDA DE SEGURANÇA: 
    // Enquanto o servidor não estiver acordado, mostramos APENAS a tela WakeUp.
    // Isso evita que o authService tente fazer login em um servidor "dormindo".
    // Em prodrução
    if (!isServerAwake) {
        return <WakeUp onReady={() => setServerAwake(true)} />
    }
    
    return (
        <Routes>

            {/* LOGIN */}
            <Route
                path="/login"
                element={<Login authService={authService} />}
            />

            {/* PROTEGIDO */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <h1 className="text-3xl font-bold">
                                Cadastro
                            </h1>
                        </MainLayout>
                    </PrivateRoute>
                }
            />

            <Route
                path="/Vendedoras"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <h1 className="text-3xl font-bold">Vendedoras</h1>
                        </MainLayout>
                    </PrivateRoute>
                }
            />

            <Route
                path="/estoque"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <h1 className="text-3xl font-bold">Estoque</h1>
                        </MainLayout>
                    </PrivateRoute>
                }
            />

            <Route
                path="/produtos"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <h1 className="text-3xl font-bold">Produtos</h1>
                        </MainLayout>
                    </PrivateRoute>
                }
            />
            {/* QUALQUER OUTRA ROTA */}
            <Route path="*" element={<Navigate to="/" />} />

        </Routes>
    )
}