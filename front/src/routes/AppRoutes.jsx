import { Routes, Route } from "react-router-dom"
import Usuarios from "../pages/Usuarios.jsx"
import Login from "../pages/Login.jsx"
import Dashboard from "../pages/Dashboard.jsx"

import ProtectedRoute from "./ProtectedRoute.jsx"

function AppRoutes(){
    return(
        <Routes>
             <Route path="/"
                element={<Usuarios />}
            />

            <Route path="/dashboard"
                element={<Dashboard />}
            />
            <Route path="/usuarios" 
                element={
                    <ProtectedRoute>
                        <Usuarios/>
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes