import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Button, Modal, Image, Form, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchPlacards, postPlacardFetch } from '../acitons/ActionCreators';

import Filter from './FilterComponent';

const CardLookupImage = ({src: src, ...rest}) => (
    src
    ? <Image src={src} {...rest} alt=''/>
    : <></>
)

const RenderCardItem = (porps) => {
    return (
        <Card>
            <CardLookupImage src={`data:image;base64,${porps.placard.picture}`} variant="top"/>
            <Card.Body>
                <Card.Title>{porps.placard.name}</Card.Title>
                <Card.Text>{porps.placard.shortDescription}</Card.Text>
                <Link to={`/placard/${porps.placard.id}`}><Button id='btn-primary' >Check out</Button></Link>
            </Card.Body>
        </Card>
    );
}

const LoadingCardItem = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Loading...</Card.Title>
                <Card.Text>
                    If loading is going for to long, yall fucked up.
                </Card.Text>
                <Button id='btn-primary' >Help!</Button>
            </Card.Body>
        </Card>
    )
};

const CreateForm = (props) => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [pic, setPic] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [tbLink, setTbLink] = useState('');
    const [fbLink, setFbLink] = useState('');
    const [discLink, setDiscLink] = useState('');

    console.log('user id in create' + props.userId)
    const handleInputChange = (event) => {
        const target = event.target;
        const targetName = target.name;
        const value = target.value;
        
        console.log(targetName);
        if (targetName == 'name') {
            setName(value);
        }
        if (targetName == 'shortDescription') {
            setShortDescription(value);
        }
        if (targetName == 'picture') {
            setPic(target.files[0]);
        }
        if (targetName == 'fullDescription') {
            setFullDescription(value);
        }
        if (targetName == 'tbLink') {
            setTbLink(value);
        }
        if (targetName == 'fbLink') {
            setFbLink(value);
        }
        if (targetName == 'discLink') {
            setDiscLink(value);
        }
    } 

    const handleCloseCreateForm = () => setShowCreateForm(false);
    const handleShowCreateForm = () => setShowCreateForm(true);
    const handleCreateClick = () => {
        var formData = new FormData();
        formData.append('Name', name);
        formData.append('ShortDescription', shortDescription);
        formData.append('Picture', pic);
        formData.append('FullDescription', fullDescription);
        formData.append('TbLink', tbLink);
        formData.append('FbLink', fbLink);
        formData.append('DiscordLink', discLink);

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        props.postPlacardFetch(formData);
        handleCloseCreateForm();
    }

    return(
        <React.Fragment>
            <Button roundedCircle onClick={handleShowCreateForm}>
                Create
            </Button>
            <Modal show={showCreateForm} onHide={handleCloseCreateForm}>
                <Form className='create-form'>
                    <h2>Create Your Placard</h2>
                    <FormGroup>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' id='name' name='name' onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control type='text' id='shortDescription' name='shortDescription' onChange={handleInputChange} />
                    </FormGroup>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.File id="picture" name='picture' onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Full Description</Form.Label>
                        <Form.Control rows='3' type='text' as='textarea' id="fullDescription" name='fullDescription' onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telegram</Form.Label>
                        <Form.Control type='text' id="tbLink" name='tbLink' onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control type='text' id="fbLink" name='fbLink' onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discord</Form.Label>
                        <Form.Control type='text' id="discLink" name='discLink' onChange={handleInputChange}/>
                    </Form.Group>
                    <Button onClick={handleCreateClick}>
                        Create
                    </Button>
                </Form>
            </Modal>
        </React.Fragment>
    )
}


const Browser = (props) => {

    console.log('user id in browser' + props.user.id)

    const[pageNo, setPage] = useState(1);

    useEffect(() => {
        props.fetchPlacards(pageNo);
    }, [pageNo]);

    if (props.placards.isLoading) {
        return(
            <div id='browser'>
                <Container fluid>
                    <Row>
                        <Col md='4' mt='5'>
                            <LoadingCardItem />
                        </Col>
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
                <Col md={4} className='mt-5'>
                    <RenderCardItem placard={placard}/>
                </Col>
            )
        });

        return(
            
            <div id='browser'>
                <Container fluid>
                    <Row className='browser-button-row'>
                        <Col>
                            <CreateForm 
                                userId={props.user.id} 
                                postPlacardFetch={props.postPlacardFetch}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {CardList}
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        placards: state.placards,
    }
};

const mapDispatchToProps = dispatch => ({
    fetchPlacards: (pageNo) => dispatch(fetchPlacards(pageNo)),
    postPlacardFetch: (formData) => dispatch(postPlacardFetch(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Browser);