import express from 'express'
import { autenticar } from '../middlewares/auth.js'
import { criarAluno, cadastroAluno, listarAlunos, buscarAluno, atualizarAluno, removerAluno, alterarAluno } from '../controllers/controllerAluno.js'

const routeAluno = express.Router()

routeAluno.get('/cadastro-aluno', autenticar, cadastroAluno)
routeAluno.post('/aluno', criarAluno)
routeAluno.get('/alunos', listarAlunos)
routeAluno.get('/aluno/:nome', buscarAluno)
routeAluno.put('/aluno/:idAluno', atualizarAluno)
routeAluno.delete('/aluno/:idAluno', removerAluno)
routeAluno.patch('/aluno/:idAluno', alterarAluno)

export default routeAluno