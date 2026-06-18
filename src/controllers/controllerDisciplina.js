import path from "path"
import Disciplina from '../models/modelDisciplina.js'
import { Op } from 'sequelize'

export const criarDisciplina = async(req, res) => {
    const { cod_disciplina, disciplina, ch_disciplina, prof } = req.body     
    if(!cod_disciplina && !disciplina && !ch_disciplina && !prof) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    try{
        await Disciplina.create(req.body)
        res.redirect('/disciplinas')  
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }    
}

export async function listarDisciplinas (req, res) {
    try{
        const disciplinas = await Disciplina.findAll()
        res.render('listarDisciplinas', { disciplinas })
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }
}

export const buscarDisciplina = async (req, res) => {
    const nomeDisciplina = req.params.disciplina // Ajustado para o parametro da rota

    try{
       const disciplinaEncontrada = await Disciplina.findAll({where: {disciplina: {[Op.like]: `%${nomeDisciplina}%`}}})
       res.status(200).json({mensagem: 'Disciplina Encontrada: ', disciplinaEncontrada})
    }catch(err){
        console.log(err)
        res.status(500).json({ mensagem: 'Disciplina não encontrada', erro: err.message})  
    }
}

export async function atualizarDisciplina (req, res) {
    try{
        const idDisciplina = req.params.idDisciplina       
        const disciplinaEncontrada = await Disciplina.findByPk(idDisciplina)
        if(!disciplinaEncontrada) return res.status(404).json({mensagem: 'Disciplina não encontrada'})
        
        const { disciplina, ch_disciplina, prof } = req.body
        
        if(!disciplina && !ch_disciplina && !prof) {            
            return res.status(400).json({mensagem: 'Preencha todos os campos!'})
        }
        const dados = { disciplina, ch_disciplina, professor: prof }
        await Disciplina.update (dados, {where: {idDisciplina: idDisciplina}}) 
        res.redirect('/disciplinas')
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}

export const removerDisciplina = async (req,res) => {
    const idDisciplina = req.params.idDisciplina
    try{
        const disciplinaEncontrada = await Disciplina.findByPk(idDisciplina)
        if(!disciplinaEncontrada) return res.status(404).json({mensagem: 'Disciplina não encontrada'})

        await Disciplina.destroy({where: {idDisciplina: idDisciplina}})
        res.redirect('/disciplinas')
    }
    catch(err){
        res.status (500).json({mensagem: 'Não encontrei a disciplina, volte mais tarde', err})
    }
}

export const alterarDisciplina = async (req, res) => {  
    try{
        const idDisciplina = req.params.idDisciplina
        const dados = await Disciplina.findByPk(idDisciplina)
        if(!dados) return res.status(404).json({mensagem: 'Disciplina não encontrada'}) 
        
        const dadosParciais = {}   
        if(req.body.disciplina) dadosParciais.disciplina = req.body.disciplina
        if(req.body.ch_disciplina) dadosParciais.ch_disciplina = req.body.ch_disciplina
        if(req.body.prof) dadosParciais.professor = req.body.prof
        
        await Disciplina.update (dadosParciais, {where: {idDisciplina: idDisciplina}}) 
        res.redirect('/disciplinas')
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})
    }
}

export const cadastroDisciplina = (req, res) => {
    res.render('cadastroDisciplina', { usuario: req.usuario })
}