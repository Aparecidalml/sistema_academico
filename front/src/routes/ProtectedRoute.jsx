import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.jsx"

function ProtectedRoute({children}){
    const {usuario} = useAuth()
    if(!usuario){
        return <Navigate to="/"/>
    }
    return children

}

export default ProtectedRoute