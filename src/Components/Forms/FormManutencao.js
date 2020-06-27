import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class FormManutencao extends React.Component {
  state = {
    idAtivo:'',
    descAtivo: '',
    tipoAtivo: '',
    dtVencimentoOrcamento: '',
    precoOrcamento: 0.00
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(`http://localhost:8080/api/v1/ativo/${this.state.idAtivo}/manutencao`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
        ativo: {
          descricao: this.state.descAtivo,
          tipo: this.state.tipoAtivo
        },
        dataVencimento: this.state.dtVencimentoOrcamento,
        valor: this.state.precoOrcamento
       }
      )
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { descAtivo, tipoAtivo, dtVencimentoOrcamento, precoOrcamento} = this.props.item
      this.setState({ descAtivo, tipoAtivo, dtVencimentoOrcamento, precoOrcamento })
    }
  }

  render() {
    return (
      <Form onSubmit={ this.submitFormAdd}>
        <FormGroup>
          <Label for="dataPlanejadaManutencao">Data Planejada Manutenção</Label>
          <Input type="text" name="dataPlanejadaManutencao" id="dataPlanejadaManutencao" onChange={this.onChange} value={this.state.descAtivo === null ? '' : this.state.descAtivo} />
        </FormGroup>
        <FormGroup>
          <Label for="dataRealizadaManutencao">Data Realizada Manutenção</Label>
          <Input type="text" name="dataRealizadaManutencao" id="dataRealizadaManutencao" onChange={this.onChange} value={this.state.tipoAtivo === null ? '' : this.state.tipoAtivo}  placeholder="[ veiculo, movel, eletronico, imovel ]"/>
        </FormGroup>
        <FormGroup>
          <Label for="comentario">Comentarios</Label>
          <Input type="text" name="comentario" id="comentario" onChange={this.onChange} value={this.state.dtVencimentoOrcamento === null ? '' : this.state.dtVencimentoOrcamento}   placeholder="ex. 2019-02-03 10:08:02" />
        </FormGroup>
    
        <Button>Enviar</Button>
      </Form>
    );
  }
}

export default FormManutencao