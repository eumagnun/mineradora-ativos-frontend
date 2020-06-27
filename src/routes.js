import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import AddEditForm from "./Components/Forms/FormAddEdit";
import AtivosTable from "./Components/AtivosTable";
import OrcamentosTable from "./Components/OrcamentosTable.";
import Home from "./Components/Home";
import FormOrcamento from "./Components/Forms/FormOrcamento";
import SignIn from "./Components/SignIn";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Login
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
          <Route exact path="/orcamentos" component={OrcamentosTable} />
          <Route path="/orcamentos/:id" component={AddEditForm} />
          <Route exact path="/ativos" component={AtivosTable} />
          <Route path="/ativos/:id" component={AddEditForm} />
          <Route path="/submeterOrcamento" component={FormOrcamento} />
          <Route exact path="/" component={SignIn} />
          <PrivateRoute path="/app" component={() => <h1>App</h1>} />
          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>

      </div>
    </div>
  </BrowserRouter>
);

export default Routes;