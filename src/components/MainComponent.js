import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {getProfileFetch} from '../acitons/ActionCreators';

import Header from './AppHeaderComponent';
import Signup from './RegistrationComponent';
import Login from './LoginComponent';

class Main extends Component {

    componentDidMount = () => {
        this.props.getProfileFetch();
    }

    render() {

        return(
            <div>
                <Header/>
                <Switch>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/" />
                </Switch>
            </div>
        )

    }

}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));