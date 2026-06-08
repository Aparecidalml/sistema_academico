import express from 'express'
import { criarDisciplina, cadastroDisciplina, listarDisciplinas, buscarDisciplina, atualizarDisciplina, removerDisciplina, alterarDisciplina } from '../controllers/controllerDisciplina.js'

const routeDisciplina = express.Router()

// Rota para a página de cadastro (ajustada para não conflitar com curso)
routeDisciplina.get('/cadastro-disciplina', cadastroDisciplina)

// Rota para adicionar disciplina
routeDisciplina.post('/disciplina', criarDisciplina)

// Rota para mostrar todas as disciplinas
routeDisciplina.get('/disciplinas', listarDisciplinas)

// Rota para buscar uma disciplina pelo nome
routeDisciplina.get('/disciplina/:nome', buscarDisciplina)

// Rota para atualizar todos os dados da disciplina
routeDisciplina.put('/disciplina/:cod', atualizarDisciplina)

// Rota para remover disciplina pelo código
routeDisciplina.delete('/disciplina/:cod', removerDisciplina)

// Rota para atualizar um ou mais dados da disciplina
routeDisciplina.patch('/disciplina/:cod', alterarDisciplina)

export default routeDisciplina