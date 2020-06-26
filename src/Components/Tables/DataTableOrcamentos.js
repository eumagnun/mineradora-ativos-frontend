import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'


class DataTableAtivos extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/crud', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }


  aprovarOrcamento = id => {
    let confirmDelete = window.confirm('Aprovar Orçamento?')
    if(confirmDelete){
      fetch(`http://localhost:8080/api/v1/orcamento/avaliar/${encodeURIComponent(id)}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `"aprovado"`
    })
      .then(response => response.json())  
      .then(item => {
        this.props.updateState(item)
      })
      .catch(err => console.log(err))
    }

  }


  reprovarOrcamento = id => {
    let confirmDelete = window.confirm('Reprovar Orçamento?')
    if(confirmDelete){
      fetch(`http://localhost:8080/api/v1/orcamento/avaliar/${encodeURIComponent(id)}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `"reprovado"`
    })
      .then(response => response.json())  
      .then(item => {
        this.props.updateState(item)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (

        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.valor}</td>
          <td>{item.dataVencimento}
          </td>
          <td>{item.situacaoOrcamento}</td>
          <td>{item.dataAvaliacao}</td>
          <td>{item.nomeAvaliador}</td>
          <td>
            <div style={{width:"110px"}}>
             <Button color="info" onClick={() => this.aprovarOrcamento(item.id)}>Aprovar</Button>
              {' '}
              <Button color="danger" onClick={() => this.reprovarOrcamento(item.id)}>Rejeitar</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor</th>
            <th>Data Vencimento</th>
            <th>Situação</th>
            <th>Data Avaliação</th>
            <th>Avaliador</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTableAtivos