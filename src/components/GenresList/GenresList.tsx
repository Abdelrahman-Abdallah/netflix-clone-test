import React from 'react';
import { Link } from 'react-router-dom';
import extractMovies from '../../utils/generesExtractor';
import './GenresList.scss';

const GenresList = ({ genres, movies }: any) => {


    return (
        <div className="genres">
            <Link to={`/genres/${genres}`} className="genres__title"> {genres}</Link>

            <div className="box">

                {extractMovies(genres, movies)}

            </div>
        </div>
    )
}
export default React.memo(GenresList);
