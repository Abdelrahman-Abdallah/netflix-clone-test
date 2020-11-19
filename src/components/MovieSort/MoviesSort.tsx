import React, { useEffect, useState } from 'react'
import Movie from '../Movie/Movie';
import './MoviesSort.scss';

const MoviesSort = ({ path, renderMovies, title }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('');
    const [movies, setMovies] = useState<any>([]);

    const sorteandfileter = () => {
        let newMovies: any[] = [...renderMovies];

        if (sort === 'AS') {
            newMovies.sort((a, b) => {
                return +a.data.year - +b.data.year;
            })
        }
        else if (sort === 'DS') {
            newMovies.sort((a, b) => {
                return +b.data.year - +a.data.year;
            })
        }
        if (searchTerm !== '') {
            newMovies = [...newMovies.filter(movie => movie.data.originalTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || movie.data.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)];
        }
        setMovies([...newMovies])
    }

    useEffect(() => {
        sorteandfileter();
    }, [searchTerm, sort])

    useEffect(() => {
        setMovies([...renderMovies])
    }, [renderMovies])



    return (
        <React.Fragment>
            <div className="movie__header">
                <div className="movie__header--title">
                    <h3> {title}</h3>
                </div>
                <input className="controls__input" type="text" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
                <select className="controls__select" onChange={(e) => { setSort(e.target.value) }} name="year">
                    <option value="">Sort by Year</option>
                    <option value="DS">Descending</option>
                    <option value="AS">Ascending</option>
                </select>
            </div>
            < div className="box" >
                {movies.length === 0 ? <div>no movies found</div> : movies.map((movie: any) => {
                    return <Movie path={path} year={movie.data.year} key={movie.id} id={movie.id} title={movie.data.title} posterurl={movie.data.posterurl} description={movie.data.storyline} />
                })}
            </div >
        </React.Fragment>
    )
}

export default MoviesSort
