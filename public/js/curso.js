

function abrirModalCurso(
    id,
    curso,
    codigo,
    ch,
    tipo
){

    document.getElementById('cursoNome').value = curso;
    document.getElementById('cursoCodigo').value = codigo;
    document.getElementById('cursoCH').value = ch;
    document.getElementById('cursoTipo').value = tipo;

    document.getElementById('formCurso').action =
        `/cursos/editar/${id}`;

    document.getElementById('modalCurso').style.display =
        'flex';
}

function fecharModalCurso(){

    document.getElementById('modalCurso').style.display =
        'none';
}

