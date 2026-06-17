function abrirModal(nome, email, perfil){
    alert('entrou   ')
    document.getElementById('editNome').value = nome
    document.getElementById('editEmail').value = email
    document.getElementById('editPerfil').value = perfil

    document.getElementById('formEditar').action = `/usuario/${id}`
    document.getElementById('modalEditar').style.display = 'flex'
}

function fecharModal(){
    document.getElementById('modalEditar').style.display = 'none';
}

window.onclick = function(event){

    const modal = document.getElementById('modalEditar')
    if(event.target === modal){
        fecharModal()
    }
}

