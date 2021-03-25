import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from "../services/Auth";

const PrivateRoute = ({component, ...rest}:any) => {
    const currentUser = useContext(AuthContext);

    return (
        <Route {...rest} render={props => (
            currentUser ? React.createElement(component, props) : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;