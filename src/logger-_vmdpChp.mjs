import { t as e } from './config-Cc-zZ5p-.mjs';
import t from 'node:path';
import n from 'winston';
let r = [];
!e.noLogfiles && !process.env.VERCEL && (r = [new n.transports.File({ filename: t.resolve(`logs/error.log`), level: `error` }), new n.transports.File({ filename: t.resolve(`logs/combined.log`) })]);
const i = n.createLogger({
    level: e.loggerLevel,
    format: n.format.combine(
        n.format.timestamp({ format: `YYYY-MM-DD HH:mm:ss.SSS` }),
        n.format.printf((e) => JSON.stringify({ timestamp: e.timestamp, level: e.level, message: e.message }))
    ),
    transports: r,
});
e.isPackage ||
    i.add(
        new n.transports.Console({ format: n.format.printf((t) => `${n.format.colorize().colorize(t.level, e.showLoggerTimestamp ? `[${t.timestamp}] ${t.level}` : t.level)}: ${t.message}`), silent: process.env.NODE_ENV === `test` })
    );
var a = i;
export { a as t };
