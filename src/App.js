import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddEditForm from './Components/Forms/FormAddEdit';
import AtivosTable from './Components/AtivosTable';
import OrcamentosTable from './Components/OrcamentosTable.';
import FormOrcamento from './Components/Forms/FormOrcamento';

class App extends Component {
  state = {
    items: []
  }

  render() {
    return (

      <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">
            Home
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/orcamentos"} className="nav-link">
                Pesquisar Orçamentos
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/submeterOrcamento"} className="nav-link">
                Submeter Orçamento
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/ativos"} className="nav-link">
                Pesquisar Ativos
              </Link>
            </li>

            
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} />
            <Route exact path="/orcamentos" component={OrcamentosTable} />
            <Route path="/orcamentos/:id" component={AddEditForm} />
            <Route exact path="/ativos" component={AtivosTable} />
            <Route path="/ativos/:id" component={AddEditForm} />
            <Route path="/submeterOrcamento" component={FormOrcamento} />

          </Switch>
        </div>
      </div>
    </Router>
  );

    
  }
}

export default App