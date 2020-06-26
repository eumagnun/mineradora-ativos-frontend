import React, { Component } from 'react'
import { Table } from 'reactstrap'
import ModalForm from '../Modals/Modal'


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

  render() {

    const items = this.props.items.map(item => {
      return (

        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.descricao}</td>
          <td>{item.dataAquisicao}
          </td>
          <td>{item.tipo}</td>
          <td>{item.situacao}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Manutenção" item={item} updateState={this.props.updateState}/>
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
            <th>Descrição</th>
            <th>Data Aquisição</th>
            <th>Tipo Ativo</th>
            <th>Situação</th>
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