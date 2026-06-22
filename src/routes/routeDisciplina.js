import express from 'express'
import { autenticar, validarPerfil } from '../middlewares/auth.js'
import { criarDisciplina, cadastroDisciplina, listarDisciplinas, buscarDisciplina, atualizarDisciplina, removerDisciplina, alterarDisciplina } from '../controllers/controllerDisciplina.js'

const routeDisciplina = express.Router()

routeDisciplina.get('/cadastro-disciplina', autenticar, validarPerfil(['Administrador', 'Coordenador']), cadastroDisciplina)
routeDisciplina.post('/disciplina', autenticar,validarPerfil(['Administrador', 'Coordenador']), criarDisciplina)
routeDisciplina.get('/disciplinas', autenticar, listarDisciplinas)
routeDisciplina.get('/disciplina/:nome', autenticar, buscarDisciplina)
routeDisciplina.put('/disciplina/:idDisciplina', autenticar,validarPerfil(['Administrador', 'Coordenador']), atualizarDisciplina)
routeDisciplina.delete('/disciplina/:idDisciplina', autenticar, validarPerfil(['Administrador', 'Coordenador']), removerDisciplina)
routeDisciplina.patch('/disciplina/:idDisciplina', autenticar, validarPerfil(['Administrador', 'Coordenador']), alterarDisciplina)

export default routeDisciplina