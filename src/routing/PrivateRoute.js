import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component,isAuthenticated,...rest}) => (
    <Route
    {...rest}
        render={props => !isAuthenticated ? ( <Redirect to='/' /> ) : (
                    <Component {...props} />
                )
            }
        />
    );

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.authenticationReducer.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);