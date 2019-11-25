/** Imports modules */
import express, { Request, Response } from 'express';
import moment from 'moment';

const router = express.Router();
const knex = require('../../config/db/knex');
const decodeUserInfosFromToken = require('../helpers/decodeUserInfosFromToken');

// List of all movie with categories
// Ex: http://localhost:3001/V1/api/movies

router.get('/', async (req: Request, res: Response) => {
  const idUser = decodeUserInfosFromToken(req).id;
  try {
    const result = await knex({
      m: 'Movies',
      c: 'Categories',
      u: 'Users',
      um: 'Users_Movies',
    })
      .select(
        'm.idMovie',
        'm.name',
        'm.director',
        'm.synopsis',
        'm.linkPoster',
        'm.releaseDate',
        'm.duration',
        'c.nameCategory',
      )
      .whereRaw('m.idCategory = c.idCategory')
      .whereRaw('um.idUser = u.idUser')
      .whereRaw('um.idMovie = m.idMovie')
      .andWhere('um.idUser', idUser)
      .andWhere('um.isActive', 1)
      .orderBy('m.name');
    res.status(200).send(result);
  } catch (error) {
    console.error('error', error);
  }
});

// Delete a movie
// Ex: http://localhost:3001/V1/api/movies/deletemovie/:id

router.put('/deletemovie/:id', async (req: Request, res: Response) => {
  const idUser = decodeUserInfosFromToken(req).id;
  const idMovie = Number(req.params.id);
  try {
    await knex({
      m: 'Movies',
      u: 'Users',
      um: 'Users_Movies',
    })
      .whereRaw('um.iduser = u.idUser')
      .whereRaw('um.idMovie = m.idMovie')
      .where('um.idMovie', '=', idMovie)
      .andWhere('um.idUser', idUser)
      .update({
        'um.isActive': 0,
        thisKeyIsSkipped: undefined,
      });
    res
      .status(200)
      .json({ id: idMovie, message: 'The movie has been deleted' });
  } catch (error) {
    console.error('error', error);
  }
});

// Add new movie
// Ex: http://localhost:3001/V1/api/movies/newmovie

router.post('/newmovie', async (req: Request, res: Response) => {
  const {
    name,
    director,
    synopsis,
    linkPoster,
    duration,
    nameCategory,
  } = req.body;
  const releaseDate = req.body.releaseDate
    ? moment(req.body.releaseDate).format('YYYY-MM-DD')
    : null;
  const category = nameCategory.length ? nameCategory : 'No category';
  const idUser = decodeUserInfosFromToken(req).id;

  /**
   * Search a movie in DB and return his id
   * @param {String} nameMovie movie name
   * @returns {Number} id movie or null
   */
  const checkMovieInDb = async (
    nameMovie: string,
  ): Promise<number | undefined> => {
    try {
      const result = await knex('Movies')
        .select('idMovie')
        .where('name', nameMovie);
      return result[0] ? result[0].idMovie : undefined;
    } catch (error) {
      console.error('error1', error);
    }
  };

  /**
   * Check if movie is active for a user
   * @param {Number} idMovie id movie
   * @returns {Number} is active (0 or 1)
   */
  const checkIfMovieIsActiveForUser = async (
    idMovie: number,
  ): Promise<number | undefined> => {
    try {
      const result = await knex({
        m: 'Movies',
        u: 'Users',
        um: 'Users_Movies',
      })
        .select('um.isActive')
        .whereRaw('um.idUser = u.idUser')
        .whereRaw('um.idMovie = m.idMovie')
        .andWhere('um.idMovie', idMovie)
        .andWhere('u.idUser', idUser);
      return result[0].isActive;
    } catch (error) {
      console.error('error', error);
    }
  };

  /**
   * Update the field isActive
   * @param {Number} idMovie id movie
   */
  const updateIsActiveField = async (idMovie: number): Promise<void> => {
    try {
      await knex({
        m: 'Movies',
        um: 'Users_Movies',
      })
        .where('um.idMovie', idMovie)
        .andWhere('um.idUser', idUser)
        .update({
          'um.isActive': 1,
          thisKeyIsSkipped: undefined,
        });
    } catch (error) {
      console.error('error', error);
    }
  };

  /**
   * Assign a movie to a user
   * @param {Number} idUser id user
   */
  const assignMovieToUser = async (idMovie: number): Promise<void> => {
    try {
      await knex('Users_Movies').insert([{ idUser, idMovie }]);
    } catch (error) {
      console.error('error', error);
    }
  };

  /**
   * Insert movie in DB
   * @param {String} categoryName category name
   * @returns {Number} id movie
   */
  const addMovieInDb = async (
    categoryName: string,
  ): Promise<number | undefined> => {
    try {
      // select id category
      const categ = await knex('Categories')
        .select('idCategory')
        .where({ nameCategory: categoryName });
      const { idCategory } = categ[0];
      const fixDataMovies = {
        name,
        director,
        synopsis,
        linkPoster,
        releaseDate,
        duration,
        idCategory,
      };
      // insert in movie table
      const result = await knex('Movies').insert(fixDataMovies);
      return result[0];
    } catch (error) {
      console.error('error', error);
    }
  };

  try {
    checkMovieInDb(name).then((idMovie) => {
      // if idMovie find
      if (idMovie !== undefined) {
        checkIfMovieIsActiveForUser(idMovie).then((isActive) => {
          switch (isActive) {
            // If user has already added movie and it is active
            case 1:
              return res.sendStatus(204);
            // If user has already added movie but it is inactive
            case 0:
              updateIsActiveField(idMovie);
              return res.status(201).json({ message: 'Movie has been added' });
            // If user has never added movie
            case undefined:
              assignMovieToUser(idMovie);
              return res.status(201).json({ message: 'Movie has been added' });
            default:
              break;
          }
        });
        // if idMovie not find
      } else {
        addMovieInDb(category).then((idMovieToAdd) => {
          if (idMovieToAdd !== undefined) {
            assignMovieToUser(idMovieToAdd);
          }
        });
        return res.status(201).json({ message: 'Movie has been added' });
      }
    });
  } catch (error) {
    console.error('error', error);
  }
});

module.exports = router;
