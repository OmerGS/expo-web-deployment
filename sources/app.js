import express from 'express';
import bodyParser from 'body-parser';
import { pipeline } from './handlers/pipelineHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(bodyParser.json());

app.post('/jpwh-oahna-etsta-tdem', pipeline);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
