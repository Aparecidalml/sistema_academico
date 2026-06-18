function abrirModal(id, nome, email, tel){

    document.getElementById('editNome').value = nome;
    document.getElementById('editEmail').value = email;
    document.getElementById('editTel').value = tel;

    document.getElementById('formEditar').action =
        `/aluno/${id}?_method=PATCH`;

    document.getElementById('modalEditar').style.display =
        'flex';
}

function fecharModal(){

    document.getElementById('modalEditar').style.display =
        'none';
}

window.onclick = function(event){

    const modal =
        document.getElementById('modalEditar');

    if(event.target === modal){

        fecharModal();
    }
}

