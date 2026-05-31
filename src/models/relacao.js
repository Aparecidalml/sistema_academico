import Aluno from './modelAluno.js'
import Disciplina from './modelDisciplina.js'
import Curso from './modelCurso.js'

Aluno.belongsTo(Curso,{
    foreignKey:'idCurso'
})

Curso.hasMany(Aluno,{
    foreignKey:'idCurso'
})

Disciplina.belongsTo(Curso,{
    foreignKey:'idCurso'
})

Curso.hasMany(Disciplina,{
    foreignKey:'idCurso'
})