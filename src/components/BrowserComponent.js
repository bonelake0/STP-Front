import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getProfileFetch, fetchPlacards } from '../acitons/ActionCreators';

import Filter from './FilterComponent';


const RenderCardItem = ({placard}) => {
    return (
        <Card>
            <Card.Img variant="top"/>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button id='btn-primary' >Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

const LoadingCardItem = () =>{
    return (
        <Card>
            <Card.Title>Loading...</Card.Title>
            <Card.Text>
                If loading is going for to long, yall fucked up.
            </Card.Text>
            <Button id='btn-primary' >Help!</Button>
        </Card>
    )
}


const Browser = (props) => {

    console.log('zaloopa browser start');

    const[pageNo, setPage] = useState(1);

    useEffect(() => {
        console.log('zaloopa v ogne')
        props.fetchPlacards(pageNo);
    }, []);
        
    if (props.placards.isLoading) {
        return(
            <div id='browser'>
                <Container fluid>
                    <Row>
                        <Col md='4' mt='5'>
                            <RenderCardItem />
                        </Col>
                        <Col md='4' mt='5'>
                            <RenderCardItem />
                        </Col>
                        <Col md='4' mt='5'>
                            <RenderCardItem />
                        </Col>
                        <Col md='4' mt='5'>
                            <RenderCardItem />
                        </Col>
                        <LoadingCardItem />
                    </Row>
                </Container>
            </div>
        );
    } else if (props.placards.errMess) {
        return(
            <Container fluid>
                <Row id='browser'>
                    <h4>{props.errMess}</h4>
                </Row>
            </Container>
        );
    } else {
        
        const CardList = props.placards.placards.map((placard) => {
            return(
                <Col md='4' mt='5'>
                    <RenderCardItem placard={placard}/>
                </Col>
            )
        });

        return(
            
            <div id='browser'>
                <Container fluid>
                    <Row>
                        {CardList}
                    </Row>
                </Container>
            </div>
        );
    }
}

const CardLookup = () => {
    const [showLookup, setShowLookup] = useState(false);
  
    const handleCloseLookup = () => setShowLookup(false);
    const handleShowLookup = () => setShowLookup(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShowLookup}>
            Lookup
        </Button>
  
        <Modal show={showLookup} onHide={handleCloseLookup}>
            <Modal.Header closeButton>
                <Modal.Title>Card Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseLookup}>
                Close
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

const mapStateToProps = state => {
    return {
        placards: state.placards,
    }
};

const mapDispatchToProps = dispatch => ({
    fetchPlacards: (pageNo) => dispatch(fetchPlacards(pageNo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Browser);