document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: Defina seu usuário e senha aqui
    const USUARIO_VALIDO = 'suporte';
    const SENHA_VALIDA = '1234';

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio do formulário

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        if (usernameInput === USUARIO_VALIDO && passwordInput === SENHA_VALIDA) {
            // Se o login for bem-sucedido:
            errorMessage.textContent = '';
            // 1. Salva um "token" na sessão do navegador
            sessionStorage.setItem('isLoggedIn', 'true');
            // 2. Redireciona para a página principal da aplicação
            window.location.href = 'app.html'; // Redireciona para o seu arquivo renomeado
        } else {
            // Se o login falhar:
            errorMessage.textContent = 'Usuário ou senha inválidos.';
        }
    });
});
