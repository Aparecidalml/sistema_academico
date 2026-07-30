import { Sequelize } from "sequelize"
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()


let sequelize

if(process.env.MODE_NODE === "dev"){
    console.log('Modo: ', process.env.MODE_NODE)
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(import.meta.dirname, '../database', 'bd.sqlite'),
        logging: false
    })
}else{
    console.log('Modo: ', process.env.MODE_NODE)
    sequelize = new Sequelize(
        process.env.DATABASE_URL,
        {    
            dialect: 'postgres',
            dialectOptions: {
                ssl: {require: true, rejectUnauthorized: false } //true se estiver em produção
            },
            logging: false
        }
    )
}

export const conexaoBD = async () => {

    try{
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
        await sequelize.sync({force: false})
        console.log('Banco de dados sincronizado com sucesso!')
    }catch(error){
        console.error('Erro ao conectar com o banco de dados:', error)
    }
}

export default sequelize