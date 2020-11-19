import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as actionTypes from '../../store/actions'
const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionTypes.authLogout());
    })
    return (
        <div>

        </div>
    )
}

export default Logout
