import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ isUserLoggedIn: isLoggedIn, component: Component, ...rest }) => (
    <Route {...rest} render = {props => {
        console.log(isLoggedIn);
        return(isLoggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: {from: props.location} }} />)
    }} />
)