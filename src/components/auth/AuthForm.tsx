import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react'
import Loader from '../shared/loaders/SpinLoader';
import logo from '../../assets/netflix.png';
import "./AuthForm.scss";
import { Link } from 'react-router-dom';
function AuthForm({ type, submit, loading, error }: any) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().required("email is required").email("please enter a valid email").trim(),
            password: yup.string().required("password is required")
        }),
        onSubmit: submit
    })

    return (
        <div className="login">
            <form onSubmit={formik.handleSubmit}>
                <div className="login__form">
                    <img src={logo} alt="logo" className="login__logo" />
                    <div className="login__form__group">
                        <input
                            className="login__form__group--input"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <label className="login__form__group--label"
                            htmlFor="email">email</label>
                        {formik.touched.email && formik.errors.email ? (<div className="login__form__error">{formik.errors.email}</div>) : null}
                    </div>
                    <div className="login__form__group">
                        <input
                            className="login__form__group--input"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <label className="login__form__group--label" htmlFor="password">password</label>
                        {formik.touched.password && formik.errors.password ? (<div className="login__form__error">{formik.errors.password}</div>) : null}
                    </div>
                    <button className="login__submit" type="submit" disabled={(!formik.isValid || !formik.dirty || loading) ? true : false} >{type}</button>
                    <div className="login__different">
                        {type === "login" ? <div>Register for new account <Link to="/register"> Register</Link></div> : <div>have an account <Link to="/login"> login</Link></div>}
                    </div>
                    {error ? <div className="login__error">{error}</div> : null}
                    {loading ? <Loader /> : null}
                </div>

            </form>
        </div>
    )
}

export default React.memo(AuthForm);
