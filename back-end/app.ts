import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { gameRouter } from './controller/game.routes';
import { userRouter } from './controller/user.routes';
import { collectedRouter } from './controller/collected.routes';
import helmet from 'helmet';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(helmet());

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/games', gameRouter);
app.use('/users', userRouter);
app.use('/collected', collectedRouter);
app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});