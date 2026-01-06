import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { Fragment as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import r from 'dayjs';
import i from 'dayjs/plugin/duration.js';
import { renderToString as a } from 'hono/jsx/dom/server';
import o from 'dayjs/plugin/localizedFormat.js';
import 'dayjs/locale/zh-cn.js';
import s from 'dayjs/plugin/relativeTime.js';
(r.extend(o), r.extend(i), r.extend(s), r.locale(`zh-cn`));
const c = (e) => r.duration(Number.parseInt(e), `seconds`).humanize(),
    l = {
        path: `/contests`,
        categories: [`programming`],
        example: `/codeforces/contests`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.codeforces.com/contests`] }],
        name: `Latest contests`,
        maintainers: [`Fatpandac`],
        handler: u,
        url: `www.codeforces.com/contests`,
    };
async function u() {
    return {
        title: `Codeforces - Contests`,
        link: `https://codeforces.com/contests`,
        item: (await e(`https://codeforces.com/api/contest.list`)).result
            .filter((e) => e.phase === `BEFORE`)
            .map((e) => {
                let i = String(e.name),
                    o = r.unix(Number.parseInt(e.startTimeSeconds));
                return {
                    title: i,
                    description: a(
                        n(t, {
                            children: [
                                n(`p`, { children: [`比赛：`, i] }),
                                n(`p`, { children: [`开始时间：`, o.format(`LL LT`)] }),
                                n(`p`, { children: [`持续时间：`, c(e.durationSeconds)] }),
                                n(`p`, { children: [`比赛类型：`, e.type] }),
                            ],
                        })
                    ),
                    link: `https://codeforces.com/contests/` + e.id,
                };
            }),
    };
}
export { l as route };
