import express from 'express'
import { autenticar, validarPerfil  } from '../middlewares/auth.js'
import { criarAluno, cadastroAluno, listarAlunos, buscarAluno, atualizarAluno, removerAluno, alterarAluno } from '../controllers/controllerAluno.js'

const routeAluno = express.Router()

routeAluno.get('/cadastro-aluno', autenticar, validarPerfil(['Administrador', 'Coordenador']), cadastroAluno)
routeAluno.post('/aluno', autenticar, validarPerfil(['Administrador', 'Coordenador']), criarAluno)
routeAluno.get('/alunos', autenticar,listarAlunos)
routeAluno.get('/aluno/:nome',autenticar, buscarAluno)
routeAluno.put('/aluno/:idAluno',autenticar, validarPerfil(['Administrador', 'Coordenador']),atualizarAluno)
routeAluno.delete('/aluno/:idAluno',autenticar,validarPerfil(['Administrador', 'Coordenador']), removerAluno)
routeAluno.patch('/aluno/:idAluno',autenticar,validarPerfil(['Administrador', 'Coordenador']), alterarAluno)

export default routeAluno