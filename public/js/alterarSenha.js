 const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        if (!token) {
            alert('Token inválido ou expirado!')
            window.location.href = '/esqueceuSenha'
        } else {
            document.getElementById('token').value = token
        }