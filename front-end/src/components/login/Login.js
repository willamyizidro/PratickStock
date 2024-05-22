import React, { useState } from 'react';
import styles from '../css/Login.module.css';

function Login() {

    const handleChange = (event) => {
        let { value } = event.target;
    
        value = value.replace(/\D/g, '');
        value = value.slice(0, 14);
    
        if (value.length <= 2) {
            value = value.replace(/^(\d{0,2})/, '$1');
          } else if (value.length <= 5) {
            value = value.replace(/^(\d{0,2})(\d{0,3})/, '$1.$2');
          } else if (value.length <= 8) {
            value = value.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
          } else if (value.length <= 12) {
            value = value.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})/, '$1.$2.$3/$4');
          } else {
            value = value.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, '$1.$2.$3/$4-$5');
            
          }
    
          setUsuario(value);
      };

    const [username, setUsuario] = useState('');
    const [password, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoLogin, setTipoLogin] = useState('Funcionario');

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
                setMensagem('Sucesso ao logar');
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

    const trocaUsuario = (opcao) => {
        setUsuario('');
        setSenha('');
        if (tipoLogin === opcao) {
          setTipoLogin(null);
        } else {
          setTipoLogin(opcao);
        }
      };


    return (
        <div>
            <div className={styles.divLateral}>
            <form className={styles.form} onSubmit={logar}>
                <h1>LOGIN</h1>
                <label className={styles.labelgroup}>
          <input
            className={styles.checkboxgoup}
            type="checkbox"
            checked={tipoLogin === 'Funcionario'}
            onChange={(e) => trocaUsuario('Funcionario')}
          />
          Funcionário
        </label>
        <label className={styles.labelgroup}>
          <input
            className={styles.checkboxgoup}
            type="checkbox"
            checked={tipoLogin === 'Empresa'}
            onChange={(e) => trocaUsuario('Empresa')}
          />
          Empresa
        </label>

        <div className={styles.inputcontainer}>
          <div className={styles.inputgroup}>
            {tipoLogin === 'Funcionario' && (
            <>
            <p className={styles.namegroup}>Login:</p>
            <input
              type="text"
              className={styles.input}
              placeholder="Digite seu login"
              value={username}
              onChange={(e) => setUsuario(e.target.value)}
              required/>
            </>
          )}
            {tipoLogin === 'Empresa' && (
            <>
            <p className={styles.namegroup}>CNPJ:</p>
              <input type="text" 
              className={styles.input}
              placeholder="Digite seu CNPJ"
              value={username} 
              onChange={handleChange}
              required/>
              </>
            )}
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
