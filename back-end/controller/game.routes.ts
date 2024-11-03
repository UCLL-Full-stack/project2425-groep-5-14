/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         title:
 *           type: string
 *           description: Game title.
 *         genre:
 *           type: string
 *           description: Game genre.
 *         description:
 *           type: string
 *           description: Game description.
 *         image:
 *           type: string
 *           description: URL to the game's image.
 */

          import express, { Request, Response, NextFunction } from 'express';
          import gameService from '../service/game.service';
          
          const gameRouter = express.Router();
          
          /**
           * @swagger
           * /games:
           *   get:
           *     summary: Get a list of all games.
           *     responses:
           *       200:
           *         description: A list of games.
           *         content:
           *           application/json:
           *             schema:
           *               type: array
           *               items:
           *                 $ref: '#/components/schemas/Game'
           */
          gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
              try {
                  const games = await gameService.getAllGames();
                  return res.status(200).json(games);
              } catch (error) {
                  next(error);
              }
          });
          
          /**
           * @swagger
           * /games/{id}:
           *   get:
           *     summary: Get a game by ID.
           *     parameters:
           *       - in: path
           *         name: id
           *         required: true
           *         description: The game ID.
           *         schema:
           *           type: integer
           *     responses:
           *       200:
           *         description: Game details.
           *         content:
           *           application/json:
           *             schema:
           *               $ref: '#/components/schemas/Game'
           *       404:
           *         description: Game not found.
           *         content:
           *           application/json:
           *             schema:
           *               type: object
           *               properties:
           *                 error:
           *                   type: string
           *                   example: "Game with id 1 does not exist."
           */
          gameRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
              try {
                  const gameId = parseInt(req.params.id, 10);
                  const game = await gameService.getGameById(gameId);
          
                  if (!game) {
                      return res.status(404).json({ error: `Game with id ${gameId} does not exist.` });
                  }
          
                  return res.status(200).json(game);
              } catch (error) {
                  if (error instanceof Error) {
                      if (error.message.includes('does not exist')) {
                          return res.status(404).json({ error: error.message });
                      }
                      return res.status(500).json({ error: 'Internal Server Error' });
                  }
                  // Handle non-Error types if necessary
                  return res.status(500).json({ error: 'Unknown error occurred' });
              }
          });
          
          export { gameRouter };
          