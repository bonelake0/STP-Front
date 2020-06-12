import React, { Component } from 'react';
import { withRouter, Switch, Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { userTokenCheck } from '../acitons/ActionCreators';

import Header from './AppHeaderComponent';
import Footer from './FooterComponent';
import Signup from './RegistrationComponent';
import Login from './LoginComponent';
import Browser from './BrowserComponent';
import PlacardView from './PlacardViewComponent';
import UserProfile from './UserProfileComponent';

class Main extends Component {

    componentDidMount = () => {
        this.props.userTokenCheck();
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

        const HomePage = () => {
            return(
                <div className='signup-body'>
                    <h1 style={{textAlign: 'center'}}>Wellcome to the Internet</h1>
                    <p style={{textAlign: 'center'}}>Please follow me</p>
                </div>
            )
        }

        return(
            <div>
                <Header user={this.props.user}/>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/browse" render={() =>{
                        return this.props.user.isLoggedIn 
                            ? <BrowserPage /> 
                            : <Login />
                    }}/>
                    <Route path="/profile" render={() =>{
                        return this.props.user.isLoggedIn
                            ? <UserProfile />
                            : <Login />
                    }}/>
                    <Route path="/settings" />
                    <Route path="/placard/:cardId" component={PlacardView} />
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
    userTokenCheck: () => dispatch(userTokenCheck()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));