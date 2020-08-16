import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { CSVLink } from "react-csv"
import DataTable from './Tables/DataTableOrcamentos'
import api from '../services/api'

class OrcamentosTable extends Component {
  state = {
    items: []
  }

  
  getItems(){
    api.get("/orcamento")
    .then(res => {
      const items = res.data;
      this.setState({ items });
    })
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  updateListItens = (id) => {
    this.getItems()
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (

        <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Gestão de Orçamentos - Mineradora Inc.</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Baixar CSV
            </CSVLink>
          </Col>
        </Row>

        
      </Container>
  );

    
  }
}

export default OrcamentosTable