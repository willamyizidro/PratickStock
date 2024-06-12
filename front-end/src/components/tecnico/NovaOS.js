import React, { useState, useEffect } from 'react';
import styles from '../css/NovaOS.module.css';
import axios from 'axios';


function NovaOS() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cpf, setCpf] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [tecnico, setTecnico] = useState('');
  const [modelo, setModelo] = useState('');
  const [mensagem,setMensagem] = useState('');
  const [imei, setImei] = useState('');
  const [valorServico, setvalorServico] = useState('');
  const [valorProdutos, setvalorProdutos] = useState('');
  const [relato, setRelato] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tecnicos, setTecnicos] = useState([]);
  const [checklist, setChecklist] = useState({
    'Camera frontal': false,
    'Camera traseira': false,
    'Alto falante': false,
    'Microfone': false,
    'Fone auricular': false,
    'Carregamento': false,
    'Vidro': false,
    'Touch': false,
    'Tela': false,
    'Botao power': false,
    'Botoes volume': false,
    'Botao home': false,
    'Wifi': false,
    'Bluethooth': false,
    'Sinal de rede': false,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/tecnico');
        console.log('Tipo de resposta:', typeof response.data);
        console.log('Conteúdo da resposta:', response.data);
    
        if (Array.isArray(response.data)) { // Verifica se a resposta é um array
          const nomesTecnicos = response.data.map(tecnico => tecnico.nome);
          setTecnicos(nomesTecnicos);
          console.log('Nomes técnicos:', nomesTecnicos);
        } else {
          console.error('Resposta da rota /tecnico não é um array:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar os técnicos:', error);
      }
    };
    fetchData();
  }, []);

  
  
  const handleEnviarOs = () => {
    cadastrarOs(); // Chama a função para enviar os dados para o backend
  };
  const cadastrarOs = async () => {
    try {
      const response = await axios.post('/os', {
        cpf,
        datainicial: dataInicial,
        datafinal: dataFinal,
        nome: tecnico,
        modelo,
        imei,
        valorservico: valorServico,
        valorpeca: valorProdutos,
        relato_cliente: relato,
        diagnostico,
        checklist
      });
      console.log('OS cadastrada com sucesso:', response.data);
      // Faça algo com a resposta do servidor, se necessário
    } catch (error) {
      console.error('Erro ao cadastrar OS:', error);
    }
  };

  const trocaDataInicial = (event) => {
    setDataInicial(event.target.value);
  };
  const trocaDataFinal = (event) => {
    setDataFinal(event.target.value);
  };
  const escolheTecnico = (event) => {
    setTecnico(event.target.value);
  };
  const handleToggle = (item) => {
    setChecklist({
      ...checklist,
      [item]: !checklist[item],
    });
  };

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
  const trocaImei = (event) => {
    let valor = event.target.value;
    // Remove tudo exceto os números
    const numeroLimpo = valor.replace(/\D/g, '');
    setImei(numeroLimpo);
  };
  const handleKeyDown = (event) => {
    // Impede a inserção de caracteres não numéricos
    if (event.key.match(/[^0-9]/)&& event.keyCode !== 8) {
      event.preventDefault();
    }
  };
  const handleCL = () => {
    setModalOpen(true);
  };
  
  const handleCloseCL = () => {
    setModalOpen(false);
  };

  const handleConfirm = async (e) => {
    setModalOpen(false);
  };

  return (
<div>
<div className={styles.divPrinc}>
      <h1>NOVA OS</h1>
      <ul className={styles.listaMesas}>

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
      </div>
      
      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>TECNICO RESPONSAVEL</p>
      <select className={styles.inputlist} value={tecnico} onChange={escolheTecnico}>
        <option value="">Selecione um tecnico</option>
        {tecnicos.map((tecnico, index) => (
        <option key={index} value={tecnico}>{tecnico}</option>
        ))}
      </select>
      </div>

      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>DATA INICIAL</p>
      <input
        className={styles.input}
        type="date"
        value={dataInicial}
        onChange={trocaDataInicial}
      />
      </div>

      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>DATA FINAL</p>
      <input
        className={styles.input}
        type="date"
        value={dataFinal}
        onChange={trocaDataFinal}
      />
      </div>

      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>MODELO DO APARELHO</p>
        <input
        type="text"
        className={styles.input}
        placeholder="Digite o modelo"
        value={modelo}
        onChange={e => setModelo(e.target.value)}
        required
      />
      </div>

      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>IMEI/SN</p>
        <input
        type="text"
        className={styles.input}
        placeholder="Digite o IMEI/SN"
        value={imei}
        onChange={trocaImei}
        onKeyDown={handleKeyDown}
        maxLength={15}
        required
      />
      </div>
        
      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>VALOR DO SERVIÇO</p>
        <input
        type="number"
        className={styles.input}
        placeholder="Digite o valor do servico"
        value={valorServico}
        onChange={e => {
          const valor = parseFloat(e.target.value);
          if (!isNaN(valor) && valor >= 0) {
            setvalorServico(valor);
          }
        }}
        required
      />

      </div>
      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>VALOR DA PEÇA/PRODUTO</p>
        <input
        type="number"
        className={styles.input}
        placeholder="Digite o valor da peça/produto"
        value={valorProdutos}
        onChange={e => {
          const valor = parseFloat(e.target.value);
          if (!isNaN(valor) && valor >= 0) {
            setvalorProdutos(valor);
          }
        }}
        required
      />
      </div>

      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>VALOR TOTAL</p>
      <input
        type="number"
        className={styles.input}
        value={valorProdutos+valorServico}
        readOnly
      />
      </div>
      
      <div className={styles.inputgroup}>
      <p className={styles.namegroup}>CHECK LIST</p>
      <input
        type="text"
        className={styles.inputclick}
        value='REALIZAR CHECK LIST'
        readOnly
        onClick={handleCL} 
      />
      </div>

      </ul>

    <div className={styles.divInterna}>

    <div className={styles.inputgroup}>
      <p className={styles.namegroup2}>RELATO DO CLIENTE</p>
      <textarea
        id="texto"
        value={relato}
        className={styles.input2}
        onChange={e => setRelato(e.target.value)}
        placeholder="Digite o relato do cliente..."
        rows={5} // Define o número inicial de linhas
        cols={50} 
        required// Define o número inicial de colunas
      />
      </div>

      <div className={styles.inputgroup}>
      <p className={styles.namegroup2}>DIAGNOSTICO TECNICO</p>
      <textarea
        id="texto"
        value={diagnostico}
        className={styles.input2}
        onChange={e => setDiagnostico(e.target.value)}
        placeholder="Digite o diagnostico..."
        rows={5} // Define o número inicial de linhas
        cols={50}
        required // Define o número inicial de colunas
      />
      </div>
    </div>

    <div>
      <p>{mensagem}</p>
    </div>
    <div className={styles.botaodiv}>
      <input className={styles.bottomgroup} onClick={handleEnviarOs} type="submit" value="GRAVAR" />
    </div>
    </div>

    {modalOpen &&(
        <div className={styles.fullScreenModal}>
        <section className={styles.modalContent}>
        <h1>CHECK LIST</h1>
        <div className={styles.tablediv}>
        <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(checklist).map(([item, status]) => (
            <tr key={item}>
              <td className={styles.item}>{item}</td>
              <td>
                <button className={styles.bottomcheck}onClick={() => handleToggle(item)}>
                  {status ? 'OK' : ''}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        
          <div className={styles.botoes}>
          <button className={styles.bottomgroupmodal} onClick={handleCloseCL}>VOLTAR</button>
          <button className={styles.bottomgroupmodal} onClick={handleConfirm}>ENVIAR</button>
          </div>
        </section>
        </div>
      )}
</div>
  );
}

export default NovaOS;