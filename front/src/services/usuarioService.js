import api from './api';

async function listar(){
    return await api.get("/usuarios")
}

async function salvar(dados){
    return await api.post("/usuario",dados)
}

async function editar(id,dados){
    return await api.put(`/usuario/${id}`,dados)
}

async function excluir(id){
    return await api.delete(`/usuario/${id}`)
}

export default{listar, salvar, editar, excluir }