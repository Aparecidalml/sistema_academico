import express, { Router } from 'express'
import { autenticar, validarPerfil} from '../middlewares/auth.js'
import { listarUsuarios, salvarUsuario, cadastrarUsuario, atualizarUsuario, removerUsuario, atualizarParcialUsuario } from '../controllers/controllerUser.js'

const routeUser = express.Router()

routeUser.get('/cadastroUsuario',autenticar, validarPerfil(['Admin']), cadastrarUsuario)
routeUser.post('/usuario', autenticar, validarPerfil(['Admin']), salvarUsuario)
// routeUser.get('/usuarios', autenticar, listarUsuarios)
routeUser.get('/usuarios', listarUsuarios)
routeUser.put('/usuario', autenticar,validarPerfil(['Admin']),  atualizarUsuario)
routeUser.delete('/usuario/:idUser', autenticar,validarPerfil(['Admin']),  removerUsuario)
routeUser.patch('/usuario/:idUser', autenticar,validarPerfil(['Admin']),  atualizarParcialUsuario)

export default routeUser