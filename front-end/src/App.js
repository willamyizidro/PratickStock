import  React  from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import CadUsuario from './components/cadastro/CadUsuario';
import Cadastro from './components/cadastro/Cadastro';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/cadastro" component={CadUsuario} />
          <Route path="/cadastrar" component={Cadastro} />
          <Route path="/login" component={Login} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
