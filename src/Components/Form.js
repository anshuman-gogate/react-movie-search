import React , {useState} from 'react';
import Movie from "./Movie.js";

function Form() {
    // state to manage value of text field
    const [query , setQuery] = useState('');
    // state to manage the response we get from API
    const [movies , setMovies] = useState([]);
    // State for loading information
    const [isLoading , setIsLoading] = useState(false);

    // API key
    const APIKey = '3a4dc9683091f978082bc403b01d086a';

    async function fetchData() {
        // e.preventDefault();
        // Url we'll be using to fetch data
        const url = `https:api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${query}&page=1`;

        try {
            const resp = await fetch(url);
            const data = await resp.json();
            console.log(data);
            setMovies(data.results);
            setIsLoading(false);
        }
        catch {
            console.log("error");
        }

        setQuery('');
    }

    function checkTf(e) {
        e.preventDefault();
        if(query === "" || query === " " || query === "  " || query === "   ") {
            setQuery('');
            alert("please enter a valid name");
        }
        else {
            setIsLoading(true);
            fetchData();
        }
    }
    let mapMovies = [];

    if(movies.length !== 0)
    {
        mapMovies = movies.filter(movie => movie.poster_path).map(movie => {
        return  (
                    <Movie 
                        key={movie.id} 
                        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} 
                        title={movie.title} 
                        releaseDate={movie.release_date} 
                        rating={movie.vote_average} 
                        desc={movie.overview}
                    />
                )
        })
    }

    // loading animation elements
    const loadingEle = 
        <div className="load-container">
            <div className="img-container"></div>
            <div className="content-container">
                <div className="rect"></div>
                <div className="rect"></div>
                <div className="rect"></div>
                <div className="big-rect"></div>
            </div>
        </div>
    

    return (
        <div className="form-container">
            <form className = "inputForm" onSubmit={checkTf}>
                <input 
                    type="text" 
                    name="query" 
                    className="inputForm__tf" 
                    placeholder="Search a movie...." 
                    onChange={ (e) => setQuery(e.target.value) }
                    value={query}
                />
                <button type="submit" className="inputForm__btn btn">Search</button>
            </form>

            <div className="movie-cards-container">
                {isLoading ? loadingEle : mapMovies}
            </div>
        </div>
    )
}

export default Form
