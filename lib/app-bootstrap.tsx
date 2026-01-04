import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { jsxRenderer } from 'hono/jsx-renderer';
import { trimTrailingSlash } from 'hono/trailing-slash';

import api from '@/api';
import { errorHandler, notFoundHandler } from '@/errors';
import accessControl from '@/middleware/access-control';
import antiHotlink from '@/middleware/anti-hotlink';
import cache from '@/middleware/cache';
import debug from '@/middleware/debug';
import header from '@/middleware/header';
import mLogger from '@/middleware/logger';
import parameter from '@/middleware/parameter';
import sentry from '@/middleware/sentry';
import template from '@/middleware/template';
import trace from '@/middleware/trace';
import registry from '@/registry';
import logger from '@/utils/logger';

process.on('uncaughtException', (e) => {
    logger.error('uncaughtException: ' + e);
});

const app = new Hono();

app.use(trimTrailingSlash());
app.use(compress());

app.use(
    jsxRenderer(({ children }) => <>{children}</>, {
        docType: '<?xml version="1.0" encoding="UTF-8"?>',
        stream: {},
    })
);
app.use(mLogger);
app.use(trace);
app.use(sentry);
app.use(accessControl);
app.use(debug);
app.use(template);
app.use(header);
app.use(antiHotlink);
app.use(parameter);
app.use(cache);

// Serve chromium-pack.tar for Vercel Puppeteer
app.get('/chromium-pack.tar', async (c) => {
    try {
        const filePath = path.join(__dirname, 'chromium-pack.tar');
        const fileBuffer = await readFile(filePath);
        c.header('Content-Type', 'application/x-tar');
        return c.body(fileBuffer);
    } catch (error) {
        logger.error('Error serving chromium-pack.tar:', error);
        return c.text('Chromium pack not found', 404);
    }
});

app.route('/', registry);
app.route('/api', api);

app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app;
