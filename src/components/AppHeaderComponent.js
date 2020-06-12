import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';

const navbarStyle ={
    background: '#293241',
}

const navbarTextColor = {
    color: '#FFFFFF',
};

class Header extends Component {

    render() {
        return(
            <React.Fragment>
                <Navbar style={navbarStyle}>
                    <Navbar.Brand style={navbarTextColor}>
                        <Nav.Link as={Link} style={navbarTextColor} to='/' className='project-logo'>
                            P L I N T
                        </Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle style={navbarTextColor} aria-controls='nav-toggle' />
                    <Navbar.Collapse id='nav-toggle'>
                    <Nav className="mr-auto">
                    {this.props.user.isLoggedIn ? (
                        <React.Fragment>
                            <Nav.Item>
                                <Nav.Link as={Link} style={navbarTextColor} to='/browse'>
                                    Browse
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} style={navbarTextColor} to='/profile'>
                                    My Profile
                                </Nav.Link>
                            </Nav.Item>
                        </React.Fragment>                        
                    ) : (
                        <React.Fragment>
                            <Nav.Item>
                                <Nav.Link as={Link} style={navbarTextColor} to='/signup'>
                                    Signup
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} style={navbarTextColor} to='/login'>
                                    Login
                                </Nav.Link>
                            </Nav.Item>
                        </React.Fragment>
                    )}
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button className='btn-primary'>Search</Button>
                    </Form>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        )
    }

}

export default Header;