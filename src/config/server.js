import express from 'express'
import path from 'path'
import routeCurso from '../routes/routeCurso.js'
import routeAluno from '../routes/routeAluno.js'
import routeDisciplina from '../routes/routeDisciplina.js'
import sequelize from './orm.js'
import Cursos from '../models/modelCurso.js'

const server = express()

server.use(express.json()) //middleware para fazer o parsear JSON no corpo das requisições
server.use(express.urlencoded({extended: true})) //middleware para fazer o parsear dados de formulários (x-www-form-urlencoded)

server.use(express.static(path.join(import.meta.dirname, '../', '../public'))) //middleware para arquivos estáticos (como HTML, CSS, JS) da pasta 'public'

server.set('view engine', 'ejs') //configuração para usar o EJS como template engine
server.set('views', path.join(import.meta.dirname, '../views')) //configuração para definir a pasta onde estão as views do EJS

server.use(routeCurso)
server.use(routeAluno)
server.use(routeDisciplina)

server.get('/', (req, res) => {
    res.render('index', {nome: 'SENAC'})
})

export default server