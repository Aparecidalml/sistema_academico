import express from 'express'
import { autenticar } from '../middlewares/auth.js'
import { criarDisciplina, cadastroDisciplina, listarDisciplinas, buscarDisciplina, atualizarDisciplina, removerDisciplina, alterarDisciplina } from '../controllers/controllerDisciplina.js'

const routeDisciplina = express.Router()

routeDisciplina.get('/cadastro-disciplina', autenticar, cadastroDisciplina)

routeDisciplina.post('/disciplina', criarDisciplina)

routeDisciplina.get('/disciplinas', listarDisciplinas)

routeDisciplina.get('/disciplina/:nome', buscarDisciplina)

routeDisciplina.put('/disciplina/:idDisciplina', atualizarDisciplina)

routeDisciplina.delete('/disciplina/:idDisciplina', removerDisciplina)

routeDisciplina.patch('/disciplina/:idDisciplina', alterarDisciplina)

export default routeDisciplina