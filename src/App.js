import "./App.css";
import { useState, useEffect } from "react";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const apiUrl = process.env.REACT_APP_API_URL;

const movie1 = {
    Year: 1999,
    Poster: "N/A",
    Type: "Romance",
    Title: "Jaanu",
};

function App() {
    const [movies, setMovies] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const searchMovies = async (title) => {
        const response = await fetch(`${apiUrl}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        console.log(data.Search);
    };
    useEffect((searchTerm) => {
        searchMovies(searchTerm);
    }, []);

    // console.log(apiUrl);
    return (
        <div className="app">
            <h1>MovieSearch</h1>
            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="searchIcon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 ? (
                movies.map((movie, imdbId) => {
                    return (
                        <div className="container" key={imdbId}>
                            <MovieCard movie={movie} />
                        </div>
                    );
                })
            ) : (
                <div className="empty">
                    <h2>No movies Found</h2>
                </div>
            )}

            <div className="container">
                <MovieCard movie={movie1} />
            </div>
        </div>
    );
}

export default App;
