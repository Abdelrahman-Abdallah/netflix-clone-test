import React from "react";
import "./Login.scss";
import * as actionTypes from '../../store/actions';
import { Redirect } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { connect } from "react-redux";
const Login = ({ loading, error, authenticated, authStart }: any) => {


    const submit = (value: any) => {
        authStart(value.email, value.password, false);
    }
    return (
        <div>
            {authenticated ? <Redirect to="/" /> : null}
            <AuthForm type="login" submit={submit} loading={loading} error={error}>
            </AuthForm></div>
    );
};
const mapStateToProps = (state: any) => ({

    authenticated: state.auth.authenticated,
    loading: state.auth.loading,
    error: state.auth.error
})

const mapDispatchToProps = (disptach: any) => {
    return {
        authStart: (email: string, password: string, newRegisted: boolean) => disptach(actionTypes.auth(email, password, newRegisted))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
