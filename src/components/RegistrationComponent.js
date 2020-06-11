import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../acitons/ActionCreators';
import { Row, Col, Button, Form, FormGroup, Container } from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        login: "",
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        description: "",
    }
} 

handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  });
}

handleSubmit = event => {
  event.preventDefault();
  console.log('Trying to register a user');
  this.props.userPostFetch(this.state);
}

render() {
  return (
    <div className='signup-body'>
      <Container>
        <Row>
          <Col md={{span:6, offset:3}} xl={{span:4, offset:4}} className='mt-5'>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' id='login' name='login'
                        value={this.state.login} onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' id='email' name='email'
                        value={this.state.email} onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' id='password' name='password'
                        value={this.state.password} onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type='password' id='confirmPassword' name='confirmPassword'
                        value={this.state.confirmPassword} onChange={this.handleChange}
                    />
                </FormGroup>
                <Button type='submit' value='submit' color='primary'>Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup);