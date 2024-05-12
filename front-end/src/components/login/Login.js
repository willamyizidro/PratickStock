import React, { useState } from 'react';
import styles from '../css/Login.module.css';

function Login() {
    const [username, setUsuario] = useState('');
    const [password, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
   
    function logar(e) {
        e.preventDefault();

        if (password.length < 6) {
            setMensagem('Insira uma senha com pelo menos 6 caracteres');
            return;
        }
        // Preparar os dados a serem enviados
        const formData = {
            username,
            password
        };
        
        // Enviar dados para o Flask via requisição POST
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Limpar campos e exibir mensagem de sucesso
                setUsuario('');
                setSenha('');
                setMensagem('Erro ao logar');
            } else {
                // Exibir mensagem de erro caso a requisição falhe
                setMensagem('Erro ao logar, verifique seus dados.');
            }
        })
        .catch(error => {
            console.error('Erro ao logar:', error);
            setMensagem('Erro ao logar, verifique seus dados.');
        });
    }

    return (
        <div>
            <div className={styles.divLateral}>
            <form className={styles.form} onSubmit={logar}>
                <h1>LOGIN</h1>
                <div className={styles.inputcontainer}>
                    <div className={styles.inputgroup}>
                        <p className={styles.namegroup}>USUARIO</p>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Digite o usuário"
                            value={username}
                            onChange={e => setUsuario(e.target.value)}
                            required
                        />
                        <p className={styles.namegroup}> SENHA</p>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="Digite a senha"
                            value={password}
                            onChange={e => setSenha(e.target.value)}
                            required
                        />
                        
                    </div>
                </div>
                <div>
                    <p>{mensagem}</p>
                </div>
                <div>
                    <input className={styles.bottomgroup} type="submit" value="ENTRAR" />
                </div>
            </form>
            <div className={styles.footer}>
            <p>Direitos autorais © 2024 PRATIC STOCK. Todos os direitos reservados. Alunosuepb é uma marca registrada.</p>
            <p><a href="#">Termos de Uso</a> | <a href="#">Política de Privacidade</a> | <a href="#">Contato</a></p>
            </div>
            </div>
        </div>
    );
}

export default Login;
