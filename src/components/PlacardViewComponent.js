import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ButtonGroup, Button, Image, Card, Modal } from 'react-bootstrap';

const CardLookupImage = ({src: src, ...rest}) => (
    src
    ? <Image src={src} {...rest}/>
    : <Image src={process.env.PUBLIC_URL + '/assets/img/CardBackground.png'} className='img-fluid mh-100' {...rest}/>
)

const UserLookupImage = ({src: src, ...rest}) => (
    src
    ? <Image src={src} {...rest}/>
    : <Image src={process.env.PUBLIC_URL + '/assets/img/account.png'} className='img-fluid mh-100' {...rest}/>
)

const ProfileLookup = (props) => {
    const [showProfileLookup, setShowProfile] = useState(false);
    
    const handleCloseProfileLookup = () => setShowProfile(false);
    const handleShowProfileLookup = () => setShowProfile(true);
    return(
        <React.Fragment>
            <UserLookupImage roundedCircle onClick={handleShowProfileLookup} />
            
            <Modal show={showProfileLookup} onHide={handleCloseProfileLookup}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={props.src} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="btn-primary" onClick={handleCloseProfileLookup}>Close</Button>
                        </Card.Body>
                </Card>
            </Modal>
        </React.Fragment>
    )
}

const PlacardView = (props) => {
    
    useEffect(() => {
        console.log('Placard with id ' + 'props.placard.id' + ' is loading...')
    }, []);
    
    return(
        <div className='placard-view'>
            <Container className='placard-view-container'>
                <Row>
                    <Col xs={12}>
                        <CardLookupImage />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h1>Props Placard Title</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p>Placard description</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <ListGroup>
                            <ListGroup.Item>Telegram Link</ListGroup.Item>
                            <ListGroup.Item>Facebook Link</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
                        <ButtonGroup>
                            <Button>Like</Button>
                            <Button>Dislike</Button> 
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <ProfileLookup />
                    </Col>
                    <Col md={3}>
                        <h3> Props Author Username </h3>
                        <h4> Props Autho Full Name</h4> 
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PlacardView