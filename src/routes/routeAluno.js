import express from 'express'
import { criarAluno, cadastroAluno, listarAlunos, buscarAluno, atualizarAluno, removerAluno, alterarAluno } from '../controllers/controllerAluno.js'

const routeAluno = express.Router()

routeAluno.get('/cadastro-aluno', cadastroAluno)
routeAluno.post('/aluno', criarAluno)
routeAluno.get('/alunos', listarAlunos)
routeAluno.get('/aluno/:nome', buscarAluno)
routeAluno.put('/aluno/:matricula', atualizarAluno)
routeAluno.delete('/aluno/:matricula', removerAluno)
routeAluno.patch('/aluno/:matricula', alterarAluno)

export default routeAluno