import sequelize from './config/orm.js'
import server from './config/app.js'
import dotenv from 'dotenv'

dotenv.config()

let PORT = process.env.EXPRESS_PORT 
let HOST = process.env.EXPRESS_HOST 

if(process.env.MODE_NODE === 'dev'){
    PORT = 3000
    HOST = 'localhost'
}

server.listen(PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})

