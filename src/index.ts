import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();

app.use(bodyParser.json());

app.post('/metrics', (req: Request<{}, {}, {}>, res: Response) => {
  res.sendStatus(204);
});

dotenv.config();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});