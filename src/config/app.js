import express from 'express'
import path from 'path'
import Cursos from '../models/modelCurso.js'
import User from '../models/modelUser.js'
import Aluno from '../models/modelAluno.js'
import { relacionamento } from '../models/relacao.js'
import Disciplina from '../models/modelDisciplina.js'
import sequelize, {conexaoBD} from './orm.js'
import routeCurso from '../routes/routeCurso.js'
import routeAluno from '../routes/routeAluno.js'
import routeDisciplina from '../routes/routeDisciplina.js'
import routeUser from '../routes/routeUser.js'
import routeLogin from '../routes/routeLogin.js'
import session from 'express-session'
import connectSqlite from 'connect-sqlite3'
import { apagarCache } from '../middlewares/auth.js'
import cookieParser from 'cookie-parser'

const app = express()

relacionamento()

conexaoBD()

async function usuarioAdmin() {
  try {
    const adminExists = await User.findOne({ where: { perfil: 'Admin' } })
    if (adminExists) {
      console.log('Usuário admin já existe!')
      return
    }
    const usuario = await User.create({
      nome: 'admin',
      email: 'admin@email.com',
      senha: 'admin123',
      perfil: 'Admin'
    });
    console.log('Usuário criado!')
  } catch (error) {
    console.error('Erro ao criar usuário!', error)
  }
}

usuarioAdmin()

const sqliteStore = connectSqlite(session)

app.use(express.json()) //middleware para fazer o parsear JSON no corpo das requisições
app.use(express.urlencoded({extended: true})) //middleware para fazer o parsear dados de formulários (x-www-form-urlencoded)

app.use(express.static(path.join(import.meta.dirname, '../', '../public'))) //middleware para arquivos estáticos (como HTML, CSS, JS) da pasta 'public'

app.set('view engine', 'ejs') //configuração para usar o EJS como template engine
app.set('views', path.join(import.meta.dirname, '../views')) //configuração para definir a pasta onde estão as views do EJS

app.use(session ({
        store: new sqliteStore ({
            db: 'session.db',
            dir: './src/database',
            table: 'sessions',
            ttl: 60 * 60 * 24
        }),  
        secret: 'sistema_academico',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: { 
            maxAge: 1000 * 60 * 1, //ms tempo de interatividade
            httpOnly: true
            // expires: 1000 * 60 * 1 // tempo fixo       
        }
    })
)

app.use(apagarCache)

app.use(cookieParser())

app.use(routeCurso)
app.use(routeAluno)
app.use(routeDisciplina)
app.use(routeUser)
app.use(routeLogin)

app.get('/', (req, res) => {
     res.sendFile(path.resolve('./public/html/index.html'))
})

export default app