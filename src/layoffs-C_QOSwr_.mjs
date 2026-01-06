import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://airtable.com/embed/shrqYt5kSqMzHV9R5/tbl8c8kanuNB6bPYr`,
    a = function (e) {
        let t = new Map(),
            n = new Map();
        for (let r in e) `name` in e[r] && `id` in e[r] && (n.set(e[r].name, e[r].id), t.set(e[r].id, e[r].name));
        return [t, n];
    },
    o = { path: `/`, radar: [{ source: [`layoffs.fyi/`], target: `` }], name: `Unknown`, maintainers: [`BrandNewLifeJackie26`], handler: s, url: `layoffs.fyi/` };
async function s() {
    let o = { 'x-airtable-application-id': `app1PaujS9zxVGUZ4`, 'x-airtable-inter-service-client': `webClient`, 'x-requested-with': `XMLHttpRequest`, 'x-time-zone': `America/Los_Angeles` },
        s = await e.get(i),
        c = !1,
        l;
    if (s)
        try {
            ((l = await n({ method: `get`, url: s, headers: o })), l.statusCode >= 400 && (c = !0));
        } catch {
            c = !0;
        }
    else c = !0;
    c &&
        ((s =
            `https://airtable.com` +
            r((await n({ method: `get`, url: i })).data)(`script`)
                .text()
                .match(/urlWithParams: "(.*?)"/)[1]
                .replaceAll(String.raw`\u002F`, `/`)),
        e.set(i, s),
        (l = await n({ method: `get`, url: s, headers: o })));
    let u = l.data.data.table,
        d = a(u.columns)[1],
        f = d.get(`Company`),
        p = d.get(`Date Added`),
        m = d.get(`# Laid Off`),
        h = d.get(`Source`),
        g = d.get(`Country`),
        _ = a(u.columns.find((e) => e.name === `Country`).typeOptions.choices)[0];
    return {
        title: `Tech layoff data feed from layoffs.fyi`,
        link: `https://layoffs.fyi`,
        description: `This feed gets tech layoff data from layoffs.fyi and display them in a user friendly way`,
        item: u.rows.slice(0, 100).map((e) => {
            let n = e.cellValuesByColumnId,
                r = n[f],
                i = t(n[p]),
                a = n[h],
                o = n[m] || `some`,
                s = _.get(n[g]);
            return { title: `${r} Layoffs Happening!`, description: `${r} lays off ${o} employees in ${s}. For more details, please visit ${a}.`, pubDate: i, link: a };
        }),
    };
}
export { o as route };
