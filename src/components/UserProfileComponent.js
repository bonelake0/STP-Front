import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'; 

const ProfileBody = (props) => {
    if (props.isEditable) {
        return(
            <Row>
                <Col>
                    <Form>
                    <FormGroup>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' id='name' name='name'
                            // value={this.state.username} onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' id='description' name='description'
                            // value={this.state.email} onChange={this.handleChange}
                        />
                    </FormGroup>
                    </Form>
                </Col>
                <Col>
                    <Button type='submit' value='submit' className='btn-primary'>ConfirmChanges</Button>
                    <Button className='btn-secondary' onClick={props.onCancelPressed}>Cancel</Button>
                </Col>
            </Row>
        )
    } else {
        return(
            <Row>
                <Col>
                    <Button className='btn-secondary' onClick={props.onEditPressed}>Edit</Button>
                </Col>
            </Row>
        )
    }
}

const UserProfile = (props) => {
    const [editableMode, setEditable] = useState(false);

    const handleTurnEditable = () => setEditable(true);
    const handleCancelEditable = () => setEditable(false);
    // const handleConfirmEdit = () => 

    console.log(editableMode);
    return(
        <Container>
            <ProfileBody 
                isEditable={editableMode} 
                onEditPressed={handleTurnEditable} 
                onCancelPressed={handleCancelEditable} 
            />
        </Container>
    )
}

export default UserProfile;

