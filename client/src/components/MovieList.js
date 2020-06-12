import React from "react";
import "./MovieList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [itemscat, setItemscat] = useState([]);
  const [triggerList, setTriggerList] = useState(false)
  const [type, setType] = useState('')
  const input = React.createRef();  




  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://t7hapfpdr9.execute-api.eu-west-1.amazonaws.com/dev/movie/list");
        const responseJson = await response.json();
        setError(false);
        setItems(responseJson);
      } catch (error) {
        setError(error);
      }
    };
    fetchMovies();


  }, []);




  const displayMovies = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
        <ul>
          {items.map((item) => (
          <li>
            <Link className="MovieListList" key={item.uuid} to={"/movie/"+item.uuid}>{item.uuid}</Link>
          </li>
          ))}
        </ul>
        </div>
        
      );
    }
  };

  


  useEffect(() => {
  const fetchMoviesCategory = async () => {
    try {
      const response = await fetch("https://t7hapfpdr9.execute-api.eu-west-1.amazonaws.com/dev/movie/list/genre/"+type);
      const responseJson = await response.json();
      setError(false);
      setItemscat(responseJson);
    } catch (error) {
      setError(error);
    }
  };
  fetchMoviesCategory();
}, [triggerList,type]);


const displayMoviescat = () => {
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
      <ul>
        {itemscat.map((item) => (
        <li>
          <Link className="MovieListList" key={item} to={"/movie/"+item}>{item}</Link>
        </li>
        ))}
      </ul>
      </div>
      
    );
  }
};

 const handleSubmit = (event) => {
   event.preventDefault();
   setType(input.current.value)
   console.log(type)
   displayMoviesChoice();
   setTriggerList(!triggerList)
 }



  const displayMoviesChoice = (event) => {
    if (type ==='') {return(displayMovies())}
    if (type ==='Aucune') {return(displayMovies())}
    else {return(displayMoviescat())}
  };


    return (
      <div className="MovieList">
        <header className="MovieList-header">
        <p className="MovieListTitle">
          Recherche de catégorie.
        </p>
        <form onSubmit = {handleSubmit} className="MovieListForm">
          <label for="name">Catégorie ("Aucune" affiche tous les films) : <input type="text" ref={input} /> 
          </label>
          <input type="submit" value="Valider" />
        </form>
        <p className="MovieListTitle">
            Liste des films disponibles
        </p>
  
          <p className="MovieListList">
            {displayMoviesChoice()}
          </p>
        </header>
      </div>
    );
  };
  
  
    export default MovieList;
  