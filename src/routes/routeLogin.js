import express from 'express'
import { autenticar} from '../middlewares/auth.js'
import { login, validarLogin, logout, dashboard, esqueceuSenha, recuperarSenha, formularioAlterarSenha, alterarSenha } from '../controllers/controllerLogin.js'

const routeLogin = express.Router()

routeLogin.get('/login', login)
routeLogin.post('/validarLogin', validarLogin)
routeLogin.get('/esqueceuSenha', esqueceuSenha)
routeLogin.post('/esqueceuSenha', recuperarSenha)
routeLogin.get('/alterarSenha', formularioAlterarSenha)
routeLogin.post('/alterarSenha', alterarSenha)
routeLogin.get('/logout', autenticar, logout)
routeLogin.get('/dashboard', autenticar, dashboard)

export default routeLogin