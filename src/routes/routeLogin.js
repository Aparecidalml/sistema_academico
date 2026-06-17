import express from 'express'
import { autenticar} from '../middlewares/auth.js'
import { login, validarLogin, logout, dashboard } from '../controllers/controllerLogin.js'

const routeLogin = express.Router()

routeLogin.get('/login', login)
routeLogin.post('/validarLogin', validarLogin)
routeLogin.get('/logout', autenticar, logout)
routeLogin.get('/dashboard', autenticar, dashboard)

export default routeLogin