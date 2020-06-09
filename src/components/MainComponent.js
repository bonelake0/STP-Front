import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileFetch } from '../acitons/ActionCreators';

import Header from './AppHeaderComponent';
import Footer from './FooterComponent';
import Signup from './RegistrationComponent';
import Login from './LoginComponent';
import Browser from './BrowserComponent';
import {PrivateRoute} from './PrivateRoute';

class Main extends Component {

    componentDidMount = () => {
        this.props.getProfileFetch();
    }

    render() {
        
        const BrowserPage = (props) => {
            return(
                <Browser 
                    user={this.props.user}
                    placards={this.props.placards}
                    fetchPlacards={this.props.fetchPlacards}
                />
            )
        }

        return(
            <div>
                <Header/>
                <Switch>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute isUserLoggedIn={this.props.user.isLoggedIn} path="/browse" component={BrowserPage}/>
                    <Route path="/settings" />
                </Switch>
                <Footer />
            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));