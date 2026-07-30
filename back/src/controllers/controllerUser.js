import User from '../models/modelUser.js'
import crypto from 'crypto'
import path from 'path'
import bcrypt from 'bcrypt'
import { where } from 'sequelize'

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll()
        if (!usuarios) return res.status(400).json({ mensagem: 'Não tem usuários!' })
            res.status(200).json({usuarios})
        // res.render('listarUsuarios', { usuarios: usuarios })
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro no servidor!' })
    }
}

export const salvarUsuario = async (req, res) => {
    const { nome, email, perfil, senha } = req.body
    if (!nome && !email && !senha) return res.status(400).json({ mensagem: 'Preencha todos os campos!' })
    try {
        const senhaCript = await bcrypt.hash(senha, 10) // criptografa a senha
        await User.create({ nome: nome, email: email, perfil: perfil, senha: senhaCript })
        res.status(200).send(`
                <script>
                    alert("Usuário cadastrado com sucesso!")
                    window.location.href="/usuarios"
                </script>
            `)
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro no servidor!' })
    }
}

export const cadastrarUsuario = (req, res) => {
    res.render('cadastroUsuario')
}

export const atualizarUsuario = async (req, res) => {
    const { nome, email, perfil, senha } = req.body
    if (!nome && !email && !senha) return res.status(400).json({ mensagem: 'Preencha todos os campos!' })
    try {
        const usuarioBD = await User.findOne({ where: { email: email } })
        if (!usuarioBD) return res.status(400).json({ msg: 'Usuário não existe!' })
        const senhaCript = await bcrypt.hash(senha, 10) 
        await User.update({ nome: nome, email: email, perfil: perfil, senha: senhaCript }, { where: { idUser: usuarioBD.idUser } })
        res.status(200).send(`
                <script>
                    alert("Usuário atualizado com sucesso!")
                    window.location.href="/usuarios"
                </script>
            `)
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro no servidor!' })
    }
}

export const removerUsuario = async (req, res) => {
    const idUser = req.params.idUser
    try {
        const usuarioBD = await User.findByPk(idUser)
        if (!usuarioBD) return res.status(404).json({mensagem: 'Usuário não encontrado!'})
        if (req.usuario.id === Number(idUser)) {
            return res.status(400).send(`
                <script>
                    alert('Você não pode excluir seu próprio usuário!')
                    window.location.href="/usuarios"
                </script>
            `)
        }
        await User.destroy({ where: { idUser: idUser } })
        res.redirect('/usuarios')
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro no servidor!' })
    }
}

export const atualizarParcialUsuario = async (req, res) => {
    const idUser = req.params.idUser
    const { nome, email, perfil, senha } = req.body
    try {
        const usuarioNovo = {}
        if (nome) usuarioNovo.nome = nome
        if (email) usuarioNovo.email = email
        if (perfil) usuarioNovo.perfil = perfil
        if (senha) {
            const senhaCript = await bcrypt.hash(senha, 10) // criptografa a senha
            usuarioNovo.senha = senhaCript
        }
        const usuarioBD = await User.findOne({ where: { idUser: idUser } })
        if (!usuarioBD) return res.status(400).json({ msg: 'Usuário não existe!' })
        await User.update(usuarioNovo, { where: { idUser: idUser } })
        res.redirect('/usuarios')
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro no servidor!' })
    }
}


export async function usuarioAdmin() {
    try {
        const adminExists = await User.findOne({ where: { perfil: 'Administrador' } })
        if (adminExists) {
            console.log('Usuário admin já existe!')
            return
        }
        const senhaCript = await bcrypt.hash('a12345', 10)
        const usuario = await User.create({
            nome: 'admin',
            email: 'admin@email.com',
            senha: senhaCript,
            perfil: 'Administrador'
        });
        console.log('Usuário criado!')
    } catch (error) {
        console.error('Erro ao criar usuário!', error)
    }
}