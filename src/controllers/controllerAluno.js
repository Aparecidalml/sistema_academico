import path from "path"
import Aluno from '../models/modelAluno.js'
import { Op } from 'sequelize'

export const criarAluno = async(req, res) => {
    const { matricula, nome, email, tel, curso } = req.body     
    if(!matricula && !nome && !email && !tel && !curso) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    try{
        const dados = { matricula, nome, email, telefone: tel, curso }
        await Aluno.create(dados)
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
        const idAluno = req.params.idAluno       
        const alunoEncontrado = await Aluno.findByPk(idAluno)
        if(!alunoEncontrado) return res.status(404).json({mensagem: 'Aluno não encontrado'})
        
        const { nome, email, tel, curso } = req.body
        
        if(!nome && !email && !tel && !curso) {            
            return res.status(400).json({mensagem: 'Preencha todos os campos!'})
        }
        const dados = { nome, email, telefone: tel, curso }
        await Aluno.update (dados, {where: {idAluno: idAluno}}) 
        res.redirect('/alunos')
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}

export const removerAluno = async (req,res) => {
    const idAluno = req.params.idAluno
    try{
        const alunoEncontrado = await Aluno.findByPk(idAluno)
        if(!alunoEncontrado) return res.status(404).json({mensagem: 'Aluno não encontrado'})

        await Aluno.destroy({where: {idAluno: idAluno}})
        res.redirect('/alunos')
    }
    catch(err){
        res.status (500).json({mensagem: 'Não encontrei o aluno, volte mais tarde', err})
    }
}

export const alterarAluno = async (req, res) => {  
    try{
        const idAluno = req.params.idAluno
        const dados = await Aluno.findByPk(idAluno)
        if(!dados) return res.status(404).json({mensagem: 'Aluno não encontrado'}) 
        
        const dadosParciais = {}   
        if(req.body.nome) dadosParciais.nome = req.body.nome
        if(req.body.email) dadosParciais.email = req.body.email
        if(req.body.tel) dadosParciais.telefone = req.body.tel
        if(req.body.curso) dadosParciais.curso = req.body.curso

        await Aluno.update (dadosParciais, {where: {idAluno: idAluno}}) 
        res.redirect('/alunos')
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}

export const cadastroAluno = (req, res) => {
    res.render('cadastroAluno', { usuario: req.usuario })
}