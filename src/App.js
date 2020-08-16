import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddEditForm from './Components/Forms/FormAddEdit';
import AtivosTable from './Components/AtivosTable';
import OrcamentosTable from './Components/OrcamentosTable.';
import FormOrcamento from './Components/Forms/FormOrcamento';
import Home from './Components/Home';
import { isAuthenticated } from "./services/auth";
import Routes from './routes';


const App = () =><Routes/>;



export default App