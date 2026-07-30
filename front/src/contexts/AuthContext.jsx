import { createContext, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [usuario,setUsuario] = useState(null)

    function login(dados){
        setUsuario(dados)
    }

    function logout(){
        setUsuario(null)
    }

    return(
        <AuthContext.Provider value={{ usuario,login,logout }} >
            {children}
        </AuthContext.Provider>
    )
}