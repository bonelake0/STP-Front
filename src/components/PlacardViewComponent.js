import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroup, ButtonGroup, Button, Image, Card, Modal } from 'react-bootstrap';
import { placardInfoFetch, deletePlacardFetch, postLikePlacard, deleteLikePlacard, authorInfoFetch, fetchPlacards } from '../acitons/ActionCreators';
import history from '../history';

const CardLookupImage = ({src: src, ...rest}) => (
    src
    ? <Image src={src} className='img-centered mh-100' {...rest}/>
    : <Image src={process.env.PUBLIC_URL + '/assets/img/CardBackground.png'} className='img-fluid mh-100' {...rest}/>
)

const UserLookupImage = ({src: src, ...rest}) => (
    src
    ? <Image src={src} className='profile-lookup-on-card' {...rest}/>
    : <Image src={process.env.PUBLIC_URL + '/assets/img/account.png'} className='profile-lookup-on-card' {...rest}/>
)

const ProfileLookup = (props) => {
    
    const [showProfileLookup, setShowProfile] = useState(false);
    
    useEffect(() => {
        props.authorInfoFetch(props.userId);
    }, []);

    const handleCloseProfileLookup = () => setShowProfile(false);
    const handleShowProfileLookup = () => setShowProfile(true);
    return(
        <React.Fragment>
            <UserLookupImage src={`data:image;base64,${props.author.profilePicture}`} roundedCircle onClick={handleShowProfileLookup} />
            
            <Modal show={showProfileLookup} onHide={handleCloseProfileLookup}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={6}>
                                <Card.Title>{props.author.login}</Card.Title>
                                <Card.Text>
                                    <h4>Name: {props.author.name}</h4>
                                    <hr/>
                                    <p>Bio: {props.author.description}</p>
                                    <hr/>
                                    <p>Joined: {props.author.createdDate}</p>
                                </Card.Text>
                            </Col>
                            <Col xs={6}>
                                <UserLookupImage className='user-image-on-placard' src={`data:image;base64,${props.author.profilePicture}`}/>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Button className='btn-dark' onClick={handleCloseProfileLookup}>Close</Button>
                </Card>
            </Modal>
        </React.Fragment>
    )
}

const LinksView = (props) => {
    return(
        <ListGroup>
            {props.placard.tbLink ? (
                <ListGroup.Item><a href={props.placard.tbLink}>Telegram</a></ListGroup.Item>                     
            ) : (
                <></>
            )}
            {props.placard.fbLink ? (
                <ListGroup.Item><a href={props.placard.fbLink}>Facebook</a></ListGroup.Item>                     
            ) : (
                <></>
            )}
            {props.placard.discordLink ? (
                <ListGroup.Item><a href={props.placard.discordLink}>Discord</a></ListGroup.Item>                     
            ) : (
                <></>
            )}
        </ListGroup>
    )
}

const PlacardView = (props) => {

    console.log(props.placard);

    useEffect(() => {
        console.log('Placard with id ' + props.match.params.cardId + ' is loading...');
        props.placardInfoFetch(props.match.params.cardId);
        console.log(props.placard);
    }, []);
    
    const handleDelete = () => {
        console.log('Delete pressed');
        props.deletePlacardFetch(props.match.params.cardId);
        history.push('/browse')
    }

    const handleLike = () => {
        console.log('Like pressed');
        
    }

    if (props.placard.isLoading) {
        return(
            <div className='placard-view'>
                <Container className='placard-view-container'>
                    Loading...
                </Container>
            </div>
        )
    } else {
        return(
            <div className='placard-view'>
                <Container className='placard-view-container'>
                    <Row className='justify-content-center align-items-center'>
                        <Col xs={12}>
                            <CardLookupImage src={`data:image;base64,${props.placard.placard.picture}`} />
                        </Col>
                    </Row>
                    <div className='p-5'>
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={8}>
                                <h1 >{props.placard.placard.name}</h1>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={8}>
                                <p>{props.placard.placard.fullDescription}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <LinksView placard={props.placard.placard}/>
                            </Col>
                            <Col md={2}>
                                <ProfileLookup userId={props.placard.placard.userId} authorInfoFetch={props.authorInfoFetch} author={props.author.author}/>
                            </Col>
                            <Col md={4}>
                                <h3>{props.placard.placard.userLogin}</h3>
                                <h4>{props.placard.placard.userName}</h4> 
                                <p>{props.placard.placard.userDescription}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={'auto'}>
                                <Button onClick={handleLike}>Like</Button>
                            </Col>
                            {
                                (props.placard.placard.userId === props.user.id )
                                ?   <Col sm={'auto'}>
                                        <Button onClick={handleDelete}>Delete</Button> 
                                    </Col>
                                : <></>
                            }
                            
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        placard: state.placard,
        author: state.postAuthor,
    }
};

const mapDispatchToProps = dispatch => ({
    placardInfoFetch: (cardId) => dispatch(placardInfoFetch(cardId)),
    deletePlacardFetch: (cardId) => dispatch(deletePlacardFetch(cardId)),
    postLikePlacard: (body) => dispatch(postLikePlacard(body)),
    deleteLikePlacard: (body) => dispatch(deleteLikePlacard(body)),
    authorInfoFetch: (userId) => dispatch(authorInfoFetch(userId)),
    c: () => dispatch(fetchPlacards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacardView);