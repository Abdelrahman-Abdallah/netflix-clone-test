import React, { lazy, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss'
import NavBar from './components/navigation/Navbar';
import Loader from './components/shared/loaders/SpinLoader';
import Register from './containers/auth/Register';
import WatchList from './containers/watchlist/WatchList';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from './store/actions';
import Logout from './containers/auth/Logout';
import Footer from './components/Footer/Footer';

const MovieContainer = lazy(() => import('./containers/MovieContainer/MovieContainer'));
const Genres = lazy(() => import('./containers/Genres/Genres'));
const Home = lazy(() => import('./containers/Home/Home'));
const Login = lazy(() => import('./containers/auth/Login'));


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = async () => {
      await dispatch(actionTypes.checkauth())
    }
    data();
  });
  const auth = useSelector((state: any) => state.auth.authenticated)
  return (
    <div className="app">
      <NavBar />
      <div className="appcontent">
        {/* <Loader /> */}
        <div>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              {auth ? null : <Redirect to="/login" />}
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/genres/:name">
                <Genres />
              </Route>
              <Route path="/movie/:id">
                <MovieContainer />
              </Route>
              <Route path="/watchlist/:id">
                <MovieContainer />
              </Route>
              <Route path="/watchlist">
                <WatchList />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>

          </React.Suspense>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
