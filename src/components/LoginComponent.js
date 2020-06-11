import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../acitons/ActionCreators';
import { Row, Col, Button, Form, FormGroup, Container } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
          login: "",
          password: "",
      }
  } 

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.userLoginFetch(this.state);
    console.log(localStorage.getItem("token"));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{span:6, offset:3}} xl={{span:4, offset:4}} className='mt-5'>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' id='username' name='username'
                        value={this.state.username} onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' id='password' name='password'
                        value={this.state.password} onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup check>
                    <Form.Check type='checkbox' name='remember' label='Remember me'
                        // copy
                    />
                </FormGroup>
                <Button type='submit' value='submit' color='primary'>Log in</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Login);