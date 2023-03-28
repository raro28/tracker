import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { InfluxDB, Point, HttpError } from '@influxdata/influxdb-client'
import { hostname } from 'node:os'
import * as models from './models';

dotenv.config();

const writeApi = new InfluxDB({ url: process.env.URL as string, token: process.env.TOKEN })
  .getWriteApi(process.env.ORG as string, process.env.BUCKET as string, 'ns');

const app = express();

app.use(bodyParser.json());

app.post('/metrics', async (req: Request<{}, {}, models.Metric>, res: Response) => {
  let point = new Point(req.body.measure);
  for (const tag of req.body.tags) {
    point = point.tag(tag.name, tag.value);
  }

  for (const field of req.body.fields) {
    point = point[`${field.type}Field`](field.name, field.value);
  }

  if (req.body.timestamp) {
    point = point.timestamp(req.body.timestamp);
  }

  writeApi.writePoint(point);

  await writeApi.flush();

  res.status(200).json({ message: 'ok', line_protocol: point.toLineProtocol() });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});