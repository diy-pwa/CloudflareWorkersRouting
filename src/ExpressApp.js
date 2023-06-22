import express from 'express';
import worker from './worker.js';
import {workersAdapter} from 'cloudflare2express';

export default () => {
    const app = express();
    app.use(express.raw({
        inflate: true,
        limit: '50mb',
        type: () => true, // this matches all content types for this route
    }), async (req, res) => {
        workersAdapter(worker, req, res);
    });
    return app;
}