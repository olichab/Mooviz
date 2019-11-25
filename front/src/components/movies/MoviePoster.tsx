import React from 'react';

import '../../scss/MoviePoster.scss';

const imgNotFound = require('../../img/image_not_found.jpg');

interface IMoviePosterProps {
  name: string;
  linkPoster: string;
}

const MoviePoster: React.FC<IMoviePosterProps> = ({
  name,
  linkPoster,
}: IMoviePosterProps) => (
  <>
    {linkPoster ? (
      <img src={linkPoster} className="moviePoster" alt="Movie poster" />
    ) : (
      <img src={imgNotFound} className="moviePoster" alt="NOT FOUND" />
    )}
    <div className="nameMovie">{name}</div>
  </>
);

export default MoviePoster;
