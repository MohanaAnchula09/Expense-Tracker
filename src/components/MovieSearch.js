import { useState } from "react";
import useFetch from "../hooks/useFetch";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  const url = searchTerm
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`
    : null;

    console.log("OMDB KEY:", process.env.REACT_APP_OMDB_API_KEY);
  const { data, loading, error } = useFetch(url);

  const movies = data?.Search || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") return;

    setSearchTerm(query);
  };

  return (
    <div className="card">
      <h1>Movie Search App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {data?.Response === "False" && <p>{data.Error}</p>}
      {error && <p>{error}</p>}

      {!loading && !error && !searchTerm && <p>Search for a movie...</p>}

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            {movie.Poster !== "N/A" && (
              <img src={movie.Poster} alt={movie.Title} width="150" />
            )}
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;