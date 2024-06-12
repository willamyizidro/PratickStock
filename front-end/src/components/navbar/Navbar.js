import { useState, useEffect } from 'react';
import styles from '../css/Navbar.module.css';
import { useHistory } from 'react-router-dom';
import logoutIcon from '../images/logout.png';

function Navbar() {

    useEffect(() => {
        fetch('/infusuario')
          .then(response => response.json())
          .then(data => {
            setTipoUsuario(data.tipo);
          })
          .catch(error => {
            console.error('Erro ao obter dados:', error);
          });
      }, []); 

    const [tipoUsuario, setTipoUsuario] = useState('');
    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [numeroOS, setNumeroOS] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleOS = () => {
      setModalOpen(true);
    };
    
    const handleCloseOS = () => {
      setModalOpen(false);
    };

    const handleConfirm = async (e) => {
      if (numeroOS<=0){
        setMensagem('Insiria um numero valido.');
        return;
      }
      console.log(numeroOS);
      setModalOpen(false);
    };

    const handleSubitemClick = (rota) => {
        history.push(rota);
    };

    return(
      <div>
        <header className={styles.Header}>
                <div className={styles.titulo} onClick={() => handleSubitemClick('/home')}>PraticStock</div>
                
                {tipoUsuario === '' && (
                <li className={styles.subitem}>
                <div className={styles.titulos} onClick={() => handleSubitemClick('/login')}>LOGIN</div>
                </li>
                )}
                {tipoUsuario === 'tecnico' && (
                    <>
                <li className={styles.subitem}> <div className={styles.titulos}>ORDEM DE SERVIÇO</div>
                <ul className={styles.submenu}>
                    <button className={styles.Button} onClick={() => handleSubitemClick('/novaOs')}>NOVA O.S</button>
                    <button className={styles.Button} onClick={() => handleOS()}>PESQUIASR O.S</button>
                    
                </ul>
                </li>
                <li className={styles.subitem}>
                <div className={styles.titulos} onClick={() => handleSubitemClick('/a')}>ESTOQUE</div>
                </li>
                <li className={styles.subitem}>
                <div className={styles.titulos} onClick={() => handleSubitemClick('/cadastro')}>CADASTRAR</div>
                </li>
                </>
                )}
                {tipoUsuario === 'estabelecimento' && (
                    <>
                <li className={styles.subitem}>
                <div className={styles.titulos} onClick={() => handleSubitemClick('/cadastrar')}>CADASTRAR TEC</div>
                </li>
                <li className={styles.subitem}>
                <div className={styles.titulos} onClick={() => handleSubitemClick('/cadastro')}>CADASTRAR</div>
                </li>
                </>
                )}
                {tipoUsuario !== '' && (
                    <div className={styles.imagediv}>
                            <img src={logoutIcon} 
                            className={styles.image}
                            alt="Logout" 
                            onClick={() => handleSubitemClick('/logout')} />
                    </div>
                    )}
        </header>
        {modalOpen &&(
        <div className={styles.fullScreenModal}>
        <section className={styles.modalContent}>
        <p className={styles.namegroup}>Numero da OS:</p>
            <input
              type="number"
              className={styles.input}
              placeholder='Numero da OS'
              value={numeroOS}
              onChange={e => {
                const valor = parseInt(e.target.value);
                if (!isNaN(valor) && valor >= 0) {
                  setNumeroOS(valor);
                }
              }}
              required
            />
          <p className={styles.mensage}>{mensagem}</p>
          <div className={styles.botoes}>
          <button className={styles.bottomgroup} onClick={handleCloseOS}>CANCELAR</button>
          <button className={styles.bottomgroup} onClick={handleConfirm}>PESQUISAR</button>
          </div>
        </section>
        </div>
      )}
      </div>
            
    )
}
export default Navbar;

