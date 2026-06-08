import path from "path"
import Aluno from '../models/modelAluno.js'
import { Op } from 'sequelize'

export const criarAluno = async(req, res) => {
    const { matricula, nome, email, telefone, curso } = req.body     
    if(!matricula && !nome && !email && !telefone && !curso) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    try{
        await Aluno.create(req.body)
        res.redirect('/alunos')  
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }    
}

export async function listarAlunos (req, res) {
    try{
        const alunos = await Aluno.findAll()
        res.render('listarAlunos', { alunos })
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }
}

export const buscarAluno = async (req, res) => {
    const nomeAluno = req.params.nome
    try{
       const alunoEncontrado = await Aluno.findAll({where: {nome: {[Op.like]: `%${nomeAluno}%`}}})
       res.status(200).json({mensagem: 'Aluno Encontrado: ', alunoEncontrado})
    }catch(err){
        console.log(err)
        res.status(500).json({ mensagem: 'Aluno não encontrado', erro: err.message})  
    }
}

export async function atualizarAluno (req, res) {
    try{
        const matricula = req.params.matricula       
        const alunoEncontrado = await Aluno.findOne({where: {matricula: matricula}}, {raw: true})
        if(!alunoEncontrado) return res.status(404).json({mensagem: 'Aluno não encontrado'})
        
        const id = alunoEncontrado.idAluno    
        const { nome, email, telefone, curso } = req.body
        
        if(!nome && !email && !telefone && !curso) {            
            return res.status(400).json({mensagem: 'Preencha todos os campos!'})
        }
        await Aluno.update (req.body, {where: {idAluno: id}}) 
        res.status(200).json({ mensagem: 'Aluno atualizado com sucesso'})     
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}

export const removerAluno = async (req,res) => {
    const matricula = req.params.matricula
    try{
        const alunoEncontrado = await Aluno.findOne({where: {matricula: matricula}}, {raw: true})
        if(!alunoEncontrado) return res.status(404).json({mensagem: 'Aluno não encontrado'})

        await Aluno.destroy({where: {idAluno: alunoEncontrado.idAluno}})
        res.status(200).json({mensagem: 'Aluno removido com sucesso'})
    }
    catch(err){
        res.status (500).json({mensagem: 'Não encontrei o aluno, volte mais tarde', err})
    }
}

export const alterarAluno = async (req, res) => {  
    try{
        const dados = await Aluno.findOne({where: {matricula: req.params.matricula}}, {raw: true})
        if(!dados) return res.status(404).json({mensagem: 'Aluno não encontrado'}) 
        
        const dadosParciais = {}   
        if(req.body.nome) dadosParciais.nome = req.body.nome
        if(req.body.email) dadosParciais.email = req.body.email
        if(req.body.telefone) dadosParciais.telefone = req.body.telefone
        if(req.body.curso) dadosParciais.curso = req.body.curso

        await Aluno.update (dadosParciais, {where: {idAluno: dados.idAluno}}) 
        res.status(200).json({ mensagem: 'Aluno updated com sucesso'})
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}

export const cadastroAluno = (req, res) => {
    res.sendFile(path.resolve('./public/html/cadastroAluno.html'))
}