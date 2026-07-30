import sequelize from "../config/orm.js"
import { DataTypes } from "sequelize"

const Aluno = sequelize.define('Aluno', {
    idAluno: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    matricula: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false       
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'alunos',
     timestamps: false,
    charset: 'utf8',
})

export default Aluno