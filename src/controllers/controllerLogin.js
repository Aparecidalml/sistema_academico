import User from '../models/modelUser.js'
import path from   'path'
import bcrypt from 'bcrypt'
import session from 'express-session'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const login = (req, res) => {
    res.sendFile(path.resolve('./public/html/login.html'))
}

export const validarLogin = async (req, res) => {
    const {email, senha} = req.body
    if(!email && !senha) return res.status(400).send('Preencha todos os campos!')
    try{
        const usuario = await User.findOne({where: {email: email}})
        if(!usuario) return res.status(400).json({msg: 'E-mail inválido!'})
        const senhaDescript = await bcrypt.compare(senha, usuario.senha)
        // console.log(senhaDescript)
        if(!senhaDescript) return res.status(400).json({msg: 'Senha Inválida!'})
         
        // session    
        // req.session.regenerate((err) => {
        //     if(err) return res.status(500).json({msg: 'Erro ao salvar a sessão.'})
        //     req.session.usuario = {
        //         id: usuario.idUser,
        //         nome: usuario.nome,
        //         perfil: usuario.perfil
        //     }
        //     res.render('index', {usuario: usuario})
        // })     

        //JWT
        const token = jwt.sign(
            {
                id: usuario.idUser,
                nome: usuario.nome,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1min',
                algorithm: 'HS256',
                issuer: 'sys-academico'
            }
        )

        res.cookie('token', token, 
            { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                maxAge: 1000 * 60 * 10 
            })

        res.render('dashboard', {usuario: usuario})

    }catch(err){
        res.status(500).json({msg: 'Erro no servidor!'})
    }
}

export const logout = (req, res) => {
    // req.session.destroy((err) => {
    //     if(err) return res.status(500).send('Erro ao sair!')
    //     res.clearCookie('connect.sid')
    //     return res.redirect('/login')
    // })

    res.clearCookie('token',   
        { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 1000 * 60 * 10 
        })
    return res.redirect('/login')
}

export const dashboard = (req, res) => {
    res.render('dashboard', {usuario: req.usuario})
}