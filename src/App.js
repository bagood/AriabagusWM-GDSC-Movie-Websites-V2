import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import Content from './Content';
import ContentList from './ContentList';
import SearchBox from './SearchBox';
import AddFavourite from './AddFavourites';
import RemoveFavourites from './RemoveFavourites';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f14467e7`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
   
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  }

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
  };

  return ( 
    <div>
      <h1>Cinema XIXIXI</h1>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className='main-container'>
        <div className='posters'>
          <ContentList heading='Movies'/>
          <div className='row'>
            <Content 
              movies = {movies} 
              handleFavouritesClick={addFavouriteMovie} 
              favouriteComponent = {AddFavourite} 
              />
          </div>
        </div>
        <div className='posters'>
          <ContentList heading='Wishlists'/>
          <div className='row'>
            <Content 
              movies = {favourites} 
              handleFavouritesClick={removeFavouriteMovie} 
              favouriteComponent = {RemoveFavourites} 
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
