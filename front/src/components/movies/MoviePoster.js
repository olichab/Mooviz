import React from "react";

import "../../scss/MoviePoster.scss";

function MoviePoster(props) {
  const { movie } = props;

  return (
    <>
      <img src={movie.link_poster} className="moviePoster" alt="Movie poster" />
      <div className="nameMovie">{movie.name}</div>
    </>
  );
}

export default MoviePoster;
