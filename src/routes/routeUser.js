import express, { Router } from 'express'
import { autenticar} from '../middlewares/auth.js'
import { listarUsuarios, salvarUsuario, cadastrarUsuario, atualizarUsuario, removerUsuario, atualizarParcialUsuario } from '../controllers/controllerUser.js'

const routeUser = express.Router()

routeUser.get('/cadastroUsuario', cadastrarUsuario)
routeUser.post('/usuario', autenticar, salvarUsuario)
routeUser.get('/usuarios', autenticar, listarUsuarios)
routeUser.put('/usuario', autenticar, atualizarUsuario)
routeUser.delete('/usuario/:id', autenticar, removerUsuario)
routeUser.patch('/usuario/:id', autenticar, atualizarParcialUsuario)

export default routeUser