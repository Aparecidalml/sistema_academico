import Aluno from './modelAluno.js'
import Disciplina from './modelDisciplina.js'
import Curso from './modelCurso.js'

export const relacionamento = () => {

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

Aluno.belongsToMany(Disciplina, { 
        through: 'aluno_disciplina', 
        foreignKey: 'idAluno',       
        otherKey: 'idDisciplina',    
        as: 'disciplinas',
        timestamps: false            
    });
    
    Disciplina.belongsToMany(Aluno, { 
        through: 'aluno_disciplina', 
        foreignKey: 'idDisciplina', 
        otherKey: 'idAluno',
        as: 'alunos',
        timestamps: false
    });

}