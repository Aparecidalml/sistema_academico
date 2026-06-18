import express from 'express'
import { autenticar } from '../middlewares/auth.js'
import { criarCurso, cadastroCurso, listarCursos, buscarCurso, atualizarCurso , removerCurso, alterarCurso} from '../controllers/controllerCurso.js'

const routeCurso = express.Router()

routeCurso.get('/cadastro-curso', autenticar, cadastroCurso)

//Rota para adicionar curso
routeCurso.post('/curso', criarCurso)

//rota para mostrar todos os cursos
routeCurso.get('/cursos', listarCursos)

// rota para buscar um curso pelo nome do curso
routeCurso.get('/curso/:curso', buscarCurso)

// // rota atulizar todos os dados
routeCurso.put('/curso/:idCurso', atualizarCurso)

// // Rota para remover curso pelo código
routeCurso.delete('/curso/:idCurso', removerCurso)

// // atualizar um ou mais dados do curso
 routeCurso.patch('/curso/:idCurso', alterarCurso)

export default routeCurso
