import sequelize from './config/orm.js'
import server from './config/app.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.EXPRESS_PORT || 3000
const HOST = process.env.EXPRESS_HOST || 'localhost'

server.listen(PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})

