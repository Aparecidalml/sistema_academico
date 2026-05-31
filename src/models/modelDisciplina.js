import sequelize from "../config/orm.js"
import { DataTypes } from "sequelize"

const Disciplina = sequelize.define('Disciplina', {
    idDisciplina: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    codigo: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    disciplina: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    cargaHoraria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    professor: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'disciplinas',
    timestamps: false,
    charset: 'utf8',
})

export default Disciplina