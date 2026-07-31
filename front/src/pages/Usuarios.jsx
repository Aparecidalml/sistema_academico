import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import usuarioService from "../services/usuarioService"
import '../styles/style.css'

function Usuarios(){
    const [usuarios,setUsuarios] = useState([])
    useEffect(()=>{
        async function carregar(){
            const resposta = await usuarioService.listar()            
            setUsuarios(resposta.data)
        }
        carregar()

    },[])

    return(
        <MainLayout>
            <div class="page-header">
                <div>
                    <h2>Usuários Cadastrados</h2>
                    
            
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario=>(
                            <tr key={usuario.idUser}>
                                <td>{usuario.idUser}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </MainLayout>
    )
}

export default Usuarios