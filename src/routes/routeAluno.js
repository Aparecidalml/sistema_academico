import express from 'express'
import { criarAluno, cadastroAluno, listarAlunos, buscarAluno, atualizarAluno, removerAluno, alterarAluno } from '../controllers/controllerAluno.js'

const routeAluno = express.Router()

// Rota para a página de cadastro (ajustada para não conflitar com curso)
routeAluno.get('/cadastro-aluno', cadastroAluno)

// Rota para adicionar aluno
routeAluno.post('/aluno', criarAluno)

// Rota para mostrar todos os alunos
routeAluno.get('/alunos', listarAlunos)

// Rota para buscar um aluno pelo nome
routeAluno.get('/aluno/:nome', buscarAluno)

// Rota para atualizar todos os dados do aluno (usando matrícula como identificador)
routeAluno.put('/aluno/:matricula', atualizarAluno)

// Rota para remover aluno pela matrícula
routeAluno.delete('/aluno/:matricula', removerAluno)

// Rota para atualizar um ou mais dados do aluno
routeAluno.patch('/aluno/:matricula', alterarAluno)

export default routeAluno