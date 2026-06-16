function abrirModalDisciplina(
    id,
    nome,
    codigo,
    ch,
    professor
){

    document.getElementById('discNome').value = nome;
    document.getElementById('discCodigo').value = codigo;
    document.getElementById('discCH').value = ch;
    document.getElementById('discProfessor').value = professor;

    document.getElementById('formDisciplina').action =
        `/disciplinas/editar/${id}`;

    document.getElementById('modalDisciplina').style.display =
        'flex';
}

function fecharModalDisciplina(){

    document.getElementById('modalDisciplina').style.display =
        'none';
}
