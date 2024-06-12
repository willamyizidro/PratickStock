import React, { useState } from 'react';
import styles from '../css/Cadastro.module.css';

function CadUsuario() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [telefone, setTelefone] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [email, setEmail] = useState('');


    function formatarNumeroTelefone(valor) {
        
        const limpo = ('' + valor).replace(/\D/g, '');
        const correspondencia = limpo.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
        if (correspondencia) {
          return `${correspondencia[1] ? '(' + correspondencia[1] : ''}${correspondencia[2] ? ') ' + correspondencia[2] : ''}${correspondencia[3] ? '-' + correspondencia[3] : ''}`;
        }
        return valor;
    }

    const TrocaNumero = (e) => {
    const valor = e.target.value;
    if (valor.length <= 15) { // Verifica o comprimento total, incluindo a máscara
      const formatado = formatarNumeroTelefone(valor);
      setTelefone(formatado);
    }
    };
    const TrocaNumero2 = (e) => {
        const valor = e.target.value;
        if (valor.length <= 15) { // Verifica o comprimento total, incluindo a máscara
          const formatado = formatarNumeroTelefone(valor);
          setTelefone2(formatado);
        }
        };

    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const formatarCPF = (cpf) => {
    // Remove caracteres não numéricos
    const numericCPF = cpf.replace(/\D/g, '');

    // Aplica a formatação do CPF (###.###.###-##)
    const cpfFormatado = numericCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return cpfFormatado;
    };

    const trocaCpf = (event) => {
        let novoCPF = event.target.value;

    // Limita o comprimento do CPF a 14 caracteres
    if (novoCPF.length <= 14) {
      setCpf(formatarCPF(novoCPF));
    }
  };

    function cadastrarUsuario(e) {
        e.preventDefault();
        if (!validarEmail(email)) {
            setMensagem('Insira um email válido');
            return; 
        }
        if (cpf.length < 14){
            setMensagem('Insira um CPF válido');
            return;
        } 
        if(telefone.length < 15){
            setMensagem('Insira um telefone válido');
            return;
        }
        const formData = {
            nome,
            cpf,
            endereco,
            telefone,
            telefoneSec: telefone2,
            email
        };
    
        fetch('/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                setNome('');
                setCpf('');
                setEmail('');
                setEndereco('');
                setTelefone('');
                setTelefone2('');
            } else {
                setMensagem('Erro ao cadastrar usuário. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            setMensagem('Erro ao cadastrar usuário. Tente novamente.');
        });
    }

    return (
        <div>
        
            <form className={styles.form} onSubmit={cadastrarUsuario}>
                <h1>CADASTRO DE CLIENTE</h1>
                <div className={styles.inputcontainer}>
                    <div className={styles.inputgroup}>
                        <p className={styles.namegroup}>NOME</p>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Digite o nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required
                        />
                        <p className={styles.namegroup}>ENDERECO</p>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Digite o endereco"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                            required
                        />
                        
                        <p className={styles.namegroup}>EMAIL</p>
                        <input type="text"
                        className={styles.input} 
                        placeholder="Digite o email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                    </div>
                    <div className={styles.inputgroup}>
                        <p className={styles.namegroup}>CPF</p>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Digite o CPF"
                            value={cpf}
                            onChange={trocaCpf}
                            required
                        />
                        <p className={styles.namegroup}>TELEFONE</p>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="(XX) XXXXX-XXXX"
                            value={telefone}
                            onChange={TrocaNumero}
                            maxLength={15}
                            required
                        />
                        <p className={styles.namegroup}>TELEFONE SECUNDARIO</p>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="(XX) XXXXX-XXXX"
                            value={telefone2}
                            onChange={TrocaNumero2}
                            maxLength={15}
                            required
                        />
                    </div>
                </div>
                <div>
                    <p>{mensagem}</p>
                </div>
                <div>
                    <input className={styles.bottomgroup} type="submit" value="CADASTRAR" />
                </div>
            </form>
        </div>
    );
}

export default CadUsuario;
