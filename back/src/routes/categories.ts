/** Imports modules */
import express, { Request, Response } from 'express';

const router = express.Router();
const knex = require('../../config/db/knex');

// List of all category
// Ex: http://localhost:3001/V1/api/categories

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await knex('Categories').select();
    res.status(200).send(result);
  } catch (error) {
    console.error('error', error);
  }
});

module.exports = router;
