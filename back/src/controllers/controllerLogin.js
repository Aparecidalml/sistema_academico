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

export const esqueceuSenha = (req, res) => {
    res.sendFile(path.resolve('./public/html/esqueceuSenha.html'))
}

export const recuperarSenha = async (req, res) => {
    const { email } = req.body
    if (!email) return res.status(400).send(`
                <script>
                    alert("Preencha o email!")
                    window.location.href = "/esqueceuSenha"
                </script> `)
    try {
        const usuario = await User.findOne({ where: { email: email } })
        if (!usuario) return res.status(400).send(`
                <script>
                    alert("E-mail não cadastrado!")
                    window.location.href = "/esqueceuSenha"
                </script> `)

        const token = jwt.sign(
            {
                id: usuario.idUser,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10m',
                algorithm: 'HS256',
                issuer: 'sys-academico'
            }
        )

        return res.redirect(`/alterarSenha?token=${token}`)
    } catch (err) {
        res.status(500).json({ msg: 'Erro no servidor!' })
    }
}

export const formularioAlterarSenha = (req, res) => {
    res.sendFile(path.resolve('./public/html/alterarSenha.html'))
}

export const alterarSenha = async (req, res) => {
    const { token, senha, confirmarSenha } = req.body
    if (!token || !senha || !confirmarSenha) return res.status(400).send(`
                <script>
                    alert("Preencha todos os campos!")
                    window.location.href = "/alterarSenha"
                </script> `)

    if (senha !== confirmarSenha) return res.status(400).send(`
                <script>
                    alert("As senhas não conferem!")
                    window.location.href = "/alterarSenha?token=${token}"
                </script> `)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            issuer: 'sys-academico',
            algorithms: ['HS256']
        })

        const usuario = await User.findOne({ where: { idUser: decoded.id } })
        if (!usuario) return res.status(400).send(`
                <script>
                    alert("Usuário não encontrado!")
                    window.location.href = "/esqueceuSenha"
                </script> `)

        const senhaCript = await bcrypt.hash(senha, 10)
        await User.update({ senha: senhaCript }, { where: { idUser: usuario.idUser } })

        res.status(200).send(`
                <script>
                    alert("Senha alterada com sucesso!")
                    window.location.href = "/login"
                </script> `)
    } catch (err) {
        return res.status(400).send(`
                <script>
                    alert("Token inválido ou expirado!")
                    window.location.href = "/esqueceuSenha"
                </script> `)
    }
}

export const validarLogin = async (req, res) => {
    const {email, senha} = req.body
    if(!email && !senha) return res.status(400).send(`
                <script>
                    alert("Preencha todos os campos!")
                    window.location.href = "/login"
                </script> `)
    try{
        const usuario = await User.findOne({where: {email: email}})
        if(!usuario) return res.status(400).send(`
                <script>
                    alert("E-mail inválido!")
                    window.location.href = "/login"
                </script> `)
        const senhaDescript = await bcrypt.compare(senha, usuario.senha)
        if(!senhaDescript) return res.status(400).send(`
                <script>
                    alert("Senha Inválida!")
                    window.location.href = "/login"
                </script> `)
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
                secure: true, 
                maxAge: 1000 * 60 * 10 
            })

        res.render('dashboard', {usuario: usuario})

    }catch(err){
        res.status(500).json({msg: 'Erro no servidor!'})
    }
}

export const logout = (req, res) => {
     res.clearCookie('token',   
        { 
            httpOnly: true, 
            secure: true, 
            maxAge: 1000 * 60 * 10 
        })
    return res.redirect('/login')
}

export const dashboard = (req, res) => {
    res.render('dashboard', {usuario: req.usuario})
}