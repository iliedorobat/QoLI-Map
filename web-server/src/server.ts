import app from './app.ts';
import {PORT} from './constants/endpoint.const.js';

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
