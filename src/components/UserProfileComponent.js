import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Button, Image } from 'react-bootstrap';
import { profileInfoFetch, putProfileInfoFetch } from '../acitons/ActionCreators';

const ProfileBody = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [profilePic, setPic] = useState('');

    const handleInputChange = (event) => {
        const target = event.target;
        const targetName = target.name;
        const value = target.value;
        
        console.log(targetName);
        if (targetName == 'name') {
            setName(value);
        }
        if (targetName == 'description') {
            setDescription(value);
        }
        if (targetName == 'profilePic') {
            setPic(target.files[0]);
        }
    } 

    const handleConfirmEdit = () => {
        var formData = new FormData();
        console.log(profilePic);

        formData.append('Name', name);
        formData.append('Description', description);
        formData.append('ProfilePicture', profilePic);

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        props.putProfileFetch(formData);
        props.onEditPressed();
    }
    
    if (props.user.isLoading) {
        return(
            <Row>
                Loading
            </Row>
        )
    } else {
        if (props.isEditable) {
            return(
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' id='name' name='name' onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' id='description' name='description' onChange={handleInputChange} />
                            </FormGroup>
                            <Form.Group>
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.File id="profilePic" name='profilePic' onChange={handleInputChange}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button type='submit' value='submit' className='btn-primary' onClick={handleConfirmEdit}>ConfirmChanges</Button>
                        <Button className='btn-secondary' onClick={props.onCancelPressed}>Cancel</Button>
                    </Col>
                </Row>
            )
        } else {
            return(
                <React.Fragment>
                    <Row>
                        <Col>
                            <Image src={`data:image;base64,${props.user.profilePic}`}/>
                        </Col>
                        <Col>
                            <h2>{props.user.username}</h2>
                            <h4>{props.user.name}</h4>
                        </Col>
                        <Col>
                            <p>Joined: {props.user.createdDate}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className='btn-secondary' onClick={props.onEditPressed}>Edit</Button>
                        </Col>
                    </Row>
                </React.Fragment>
            )
        }
    }
}

const UserProfile = (props) => {
    const [editableMode, setEditable] = useState(false);

    useEffect(() => {
        console.log('trying to fetch user');
        props.profileInfoFetch();
    }, []);

    const handleTurnEditable = () => setEditable(true);
    const handleCancelEditable = () => setEditable(false);
    

    console.log(editableMode);
    return(
        <div id='browser'>
            <Container className='profile-container'>
                <ProfileBody 
                    user={props.user}
                    isEditable={editableMode} 
                    onEditPressed={handleTurnEditable}
                    onCancelPressed={handleCancelEditable}
                    putProfileFetch={props.putProfileInfoFetch}
                />
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

const mapDispatchToProps = dispatch => ({
    profileInfoFetch: () => dispatch(profileInfoFetch()),
    putProfileInfoFetch: (formData) => dispatch(putProfileInfoFetch(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

