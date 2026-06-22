import express from 'express'
import { autenticar, validarPerfil } from '../middlewares/auth.js'
import { criarCurso, cadastroCurso, listarCursos, buscarCurso, atualizarCurso , removerCurso, alterarCurso} from '../controllers/controllerCurso.js'

const routeCurso = express.Router()

routeCurso.get('/cadastro-curso', autenticar, validarPerfil(['Administrador', 'Coordenador']), cadastroCurso)
routeCurso.post('/curso', autenticar,criarCurso)
routeCurso.get('/cursos', autenticar,listarCursos)
routeCurso.get('/curso/:curso', autenticar,validarPerfil(['Administrador', 'Coordenador']),buscarCurso)
routeCurso.put('/curso/:idCurso',autenticar, validarPerfil(['Administrador', 'Coordenador']),atualizarCurso)
routeCurso.delete('/curso/:idCurso',autenticar, validarPerfil(['Administrador', 'Coordenador']),removerCurso)
routeCurso.patch('/curso/:idCurso', autenticar,validarPerfil(['Administrador', 'Coordenador']),alterarCurso)

export default routeCurso
