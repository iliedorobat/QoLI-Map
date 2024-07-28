import Express from 'express';
import cors from 'cors';
import router from '#src/routes/router.js';
import * as path from 'node:path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const app = Express();

// Configuring Express to automatically parse the incoming JSON to an object
app.use(Express.json());

app.use(cors());

app.use(router);

app.use('/', Express.static(path.join(__filename, '../../../ui/dist/qoli-map')));

export default app;
