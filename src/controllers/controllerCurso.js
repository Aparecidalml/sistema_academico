import path from "path"
import Curso from '../models/modelCurso.js'
import {Op} from 'sequelize'

export  const criarCurso = async(req, res) => {
    const {cod, curso, ch, tipo} = req.body     
    if(!cod || !curso || !ch || !tipo) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    try{
        const cursoNovo = await Curso.create(req.body )
        // res.status(200).json({mensagem: 'Curso criado com sucesso', cursoNovo})
        res.redirect('/cursos')  
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }    
}

export async function listarCursos (req, res) {
    try{
        const cursos = await Curso.findAll()
        // res.status(200).json(cursos)
        res.render('listarCursos', {cursos})
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }
}

export const buscarCurso = async (req, res) => {
    const nomeCurso = req.params.curso

    try{
       const cursoEncontrado =  await Curso.findAll({where: {curso: {[Op.like]: `%${nomeCurso}%`}}})
       //select * from cursos where curso like '%nomeCurso%'
       res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
    }catch(err){
        console.log(err)
        res.status(500).json({ mensagem: 'Curso não encontrado', erro: err.message})  
    }
}

export async function atualizarCurso (req, res) {
    try{
        const idCurso = req.params.idCurso       
        const cursoEncontrado = await Curso.findByPk(idCurso)
        if(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'})
        const {curso, ch, tipo} = req.body
        if(!curso || !ch || !tipo) {            
            return res.status(400).json({mensagem: 'Preencha todos os campo!'})
        }
        await Curso.update ({curso, ch, tipo}, {where: {idCurso: idCurso}})
        res.redirect('/cursos')           
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}

export const removerCurso = async (req,res) => {
    const idCurso = req.params.idCurso
    try{
        const cursoEncontrado = await Curso.findByPk(idCurso)
        if(!cursoEncontrado) return res.status(404).json({mensagem: 'Curso não encontrado'})

        await Curso.destroy({where: {idCurso: idCurso}})
        res.redirect('/cursos')
    }
    catch(err){
        res.status (500).json({mensagem: 'nao encontrei seu curso, volte mais tarde',err})
    }
}

export const alterarCurso = async (req, res) => {  
    try{
        const idCurso = req.params.idCurso
        const dados = await Curso.findByPk(idCurso)
        if(!dados) return res.status(404).json({mensagem: 'Curso não encontrado'}) 
        const dadosParciais = {}   
        if(req.body.curso) dadosParciais.curso = req.body.curso
        if(req.body.ch) dadosParciais.ch = req.body.ch
        if(req.body.tipo) dadosParciais.tipo = req.body.tipo
        await Curso.update (dadosParciais, {where: {idCurso: idCurso}})
        res.redirect('/cursos')
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}


export const cadastroCurso = (req, res) => {
    res.render('cadastroCurso', { usuario: req.usuario })
}