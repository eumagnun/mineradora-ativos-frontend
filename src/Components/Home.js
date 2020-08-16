import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Image from 'react-bootstrap/Image'

class Home extends Component {
    render() {
        return (

            <Container className="App">
                <Row>
                    <Col>
                        <img
                            src="images/represa.jpg"
                            alt="Represa Mineradora"
                        />
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Home