import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { login, logout } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            console.log(email)
            try {
                const response = await api.post("/autenticacao",
                    {
                        "senha": password,
                        "usuario": email
                    }
                );
                login(response.data.token);
                this.props.history.push("/orcamentos");
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="text"
                        placeholder="Usuário"
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <button type="submit">Entrar</button><br/>
                    <button type="button" onClick={logout()}>Sair</button>

                </Form>
        
            </Container>
        );
    }
}

export default withRouter(SignIn);