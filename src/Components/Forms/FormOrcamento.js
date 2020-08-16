import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../../services/api';

class FormOrcamento extends React.Component {
  state = {
    descAtivo: '',
    tipoAtivo: '',
    dtVencimentoOrcamento: '',
    precoOrcamento: 0.00
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitFormAdd = e => {
    e.preventDefault()


    api.post("/orcamento/submeter",
      {
        ativo: {
          descricao: this.state.descAtivo,
          tipo: this.state.tipoAtivo
        },
        dataVencimento: this.state.dtVencimentoOrcamento,
        valor: this.state.precoOrcamento
      }
    )

      .then(item => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { descAtivo, tipoAtivo, dtVencimentoOrcamento, precoOrcamento } = this.props.item
      this.setState({ descAtivo, tipoAtivo, dtVencimentoOrcamento, precoOrcamento })
    }
  }

  render() {
    return (


      <Form onSubmit={this.submitFormAdd}>

        <h1 style={{ margin: "20px 0" }}>Novo Orçamento</h1>
        <FormGroup>
          <Label for="descAtivo">Descrição Ativo</Label>
          <Input type="text" name="descAtivo" id="descAtivo" onChange={this.onChange} value={this.state.descAtivo === null ? '' : this.state.descAtivo} />
        </FormGroup>
        <FormGroup>
          <Label for="tipoAtivo">Tipo Ativo</Label>
          <Input type="text" name="tipoAtivo" id="tipoAtivo" onChange={this.onChange} value={this.state.tipoAtivo === null ? '' : this.state.tipoAtivo} placeholder="[ veiculo, movel, eletronico, imovel ]" />
        </FormGroup>
        <FormGroup>
          <Label for="dtVencimentoOrcamento">Data Vencimento Orçamento</Label>
          <Input type="datetime" name="dtVencimentoOrcamento" id="dtVencimentoOrcamento" onChange={this.onChange} value={this.state.dtVencimentoOrcamento === null ? '' : this.state.dtVencimentoOrcamento} placeholder="ex. 2019-02-03 10:08:02" />
        </FormGroup>
        <FormGroup>
          <Label for="precoOrcamento">Preço Orçamento</Label>
          <Input type="number" name="precoOrcamento" id="precoOrcamento" onChange={this.onChange} value={this.state.precoOrcamento === null ? '' : this.state.precoOrcamento} />
        </FormGroup>
        <Button>Enviar</Button>
      </Form>
    );
  }
}

export default FormOrcamento