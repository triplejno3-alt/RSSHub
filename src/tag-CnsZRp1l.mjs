import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './parser-uq0ytZBu.mjs';
import { load as n } from 'cheerio';
const r = async (r) => {
        let { tag: i } = r.req.param(),
            a = `https://collabo-cafe.com/events/tag/${i}`;
        return { title: `标签`, link: a, item: t(n(await e(a))) };
    },
    i = {
        path: `/tag/:tag`,
        categories: [`anime`],
        example: `/collabo-cafe/tag/ikebukuro`,
        parameters: { tag: `Tag, refer to the original website (開催地域別)` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `标签`,
        maintainers: [`cokemine`],
        handler: r,
    };
export { r as handler, i as route };
