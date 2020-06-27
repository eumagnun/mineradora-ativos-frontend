import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import api from '../../services/api'


class DataTableAtivos extends Component {




  aprovarOrcamento = id => {
    let confirmDelete = window.confirm('Aprovar Orçamento?')
    if(confirmDelete){

      api.post(`/orcamento/avaliar/${encodeURIComponent(id)}`,`"aprovado"`
      
      )
      .then(res => {
        const item = res.data;
        this.props.updateState(item)
      })
    }
  }


  reprovarOrcamento = id => {
    let confirmDelete = window.confirm('Reprovar Orçamento?')
    if(confirmDelete){

      api.post(`/orcamento/avaliar/${encodeURIComponent(id)}`,`"reprovado"`
      
      )
      .then(res => {
        const item = res.data;
        this.props.updateState(item)
      })
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