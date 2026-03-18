import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

import { apiClient } from "./api/client"
import { AuthService } from "./services/authService"

// 🔥 usa o objeto, não classe
const authService = new AuthService(apiClient)

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App authService={authService} />
  </BrowserRouter>
)