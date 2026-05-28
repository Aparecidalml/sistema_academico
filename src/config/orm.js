import { Sequelize } from "sequelize"
import path from 'path'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(import.meta.dirname, '../database', 'bd.sqlite')
})

const conexaoBD = async () => {
    try{
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
    }catch(error){
        console.error('Erro ao conectar com o banco de dados:', error)
    }
}

conexaoBD()

export const sincronizarBD = async () => {
    try{
        await sequelize.sync({force: false})
        console.log('Banco de dados sincronizado com sucesso!')
    }catch(error){
        console.error('Erro ao sincronizar o banco de dados:', error)
    }
}

sincronizarBD()

export default sequelize