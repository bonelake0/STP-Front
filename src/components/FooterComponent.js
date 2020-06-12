import React from "react";
import { Row, Col, Button, Form, FormGroup, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Footer(props) {
    return(
        <div id="footer">
        <Container fluid>
            <div className="row justify-content-center">             
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <a style={{fontSize: '36px',}} className="btn btn-social-icon btn-google" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><i className="fa fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2020 'P L I N T'</p>
                </div>
            </div>
        </Container>
    </div>
    );
}