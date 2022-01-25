import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest //this represents all the other props we didnt destructure
}) => (
    <Route {...rest} component={(props)=>(
        isAuthenticated ? (
            <div>
                <Header/>
                <Component {...props}/>
            </div>
        ) :(
            <Redirect to='/'/>
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid //if state.auth.uid exist we are authenticated it will be true if not we are not it will be false
});

export default connect(mapStateToProps)(PrivateRoute);
