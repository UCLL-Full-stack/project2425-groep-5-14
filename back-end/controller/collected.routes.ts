import express, { Request, Response, NextFunction } from 'express';
import collectedService from '../service/collected.service';

const collectedRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Collected:
 *       type: object
 *       properties:
 *         game:
 *           $ref: '#/components/schemas/Game'
 *         badge:
 *           $ref: '#/components/schemas/Badge'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         collectedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the item was collected.
 */

/**
 * @swagger
 * /collected:
 *   get:
 *     summary: Get a list of all collected items.
 *     responses:
 *       200:
 *         description: A list of collected items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collected'
 */
collectedRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collectedItems = await collectedService.getAllCollected();
        return res.status(200).json(collectedItems);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /collected/{id}:
 *   get:
 *     summary: Get a collected item by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The collected item ID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Collected item details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collected'
 *       404:
 *         description: Collected item not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Collected item with id 1 does not exist."
 */
collectedRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collectedId = parseInt(req.params.id, 10);
        const collectedItem = await collectedService.getCollectedById(collectedId);

        if (!collectedItem) {
            return res.status(404).json({ error: `Collected item with id ${collectedId} does not exist.` });
        }

        return res.status(200).json(collectedItem);
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

/**
 * @swagger
 * /games/{username}:
 *   get:
 *     summary: Get collected games by username
 *     description: Fetches the collected games for a specific user by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user
 *     responses:
 *       200:
 *         description: A list of collected games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   gameId:
 *                     type: string
 *                   gameName:
 *                     type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User with username {username} does not exist."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
collectedRouter.get('/games/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        console.log(`Fetching collected games for user: ${username}`);
        
        const collectedGames = await collectedService.getCollectedGamesByUsername(username);

        if (!collectedGames) {
            return res.status(404).json({ error: `User with username ${username} does not exist.` });
        }

        return res.status(200).json(collectedGames);
    } catch (error) {
        const username = req.params.username;
        console.error(`Error fetching collected games for user: ${username}`, error);

        if (error instanceof Error) {
            if (error.message.includes('does not exist')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

        // Handle non-Error types if necessary
        return res.status(500).json({ error: 'Unknown error occurred', details: String(error) });
    }
});

/**
 * @swagger
 * /badges/{username}:
 *   get:
 *     summary: Get collected badges by username
 *     description: Fetches the collected badges for a specific user by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user
 *     responses:
 *       200:
 *         description: A list of collected badges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   badgeId:
 *                     type: string
 *                   badgeName:
 *                     type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User with username {username} does not exist."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
collectedRouter.get('/badges/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        console.log(`Fetching collected badges for user: ${username}`);
        
        const collectedBadges = await collectedService.getCollectedBadgesByUsername(username);

        if (!collectedBadges) {
            return res.status(404).json({ error: `User with username ${username} does not exist.` });
        }

        return res.status(200).json(collectedBadges);
    } catch (error) {
        const username = req.params.username;
        console.error(`Error fetching collected badges for user: ${username}`, error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /collectGame:
 *   post:
 *     summary: Collect a game for a user
 *     description: Collects a game for a specific user by their username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               gameId:
 *                 type: number
 *                 description: The ID of the game to collect
 *     responses:
 *       200:
 *         description: Game collected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Game collected successfully"
 *       404:
 *         description: User or game not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User with username {username} does not exist."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
collectedRouter.post('/collectGame', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, gameId } = req.body;
        console.log(`Collecting game for user: ${username}, game ID: ${gameId}`);
        
        const collectedGame = await collectedService.collectGame(username, gameId);

        if (!collectedGame) {
            return res.status(404).json({ error: `User with username ${username} or game with ID ${gameId} does not exist.` });
        }

        return res.status(200).json({ message: 'Game collected successfully' });
    } catch (error) {
        const username = req.body.username;
        console.error(`Error collecting game for user: ${username}`, error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


export { collectedRouter };