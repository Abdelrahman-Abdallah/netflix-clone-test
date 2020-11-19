import React from 'react'
import notfound from '../../assets/notfound.png';
import './itemNotFound.scss';
const ItemNotFound = () => {
    return (
        <div className="notfound">

            <img src={notfound} className="notfound__img" alt="not found" />
        cant find the source 404
        </div>
    )
}

export default ItemNotFound
