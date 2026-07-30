import { Router } from "express"

import routeCurso from './routeCurso.js'
import routeAluno from './routeAluno.js'
import routeDisciplina from './routeDisciplina.js'
import routeUser from './routeUser.js'
import routeLogin from './routeLogin.js'
import routeIndex from './routeIndex.js'

const routerApi = Router()

routerApi.use(routeCurso)
routerApi.use(routeAluno)
routerApi.use(routeDisciplina)
routerApi.use(routeUser)
routerApi.use(routeLogin)
routerApi.use(routeIndex)

export default routerApi