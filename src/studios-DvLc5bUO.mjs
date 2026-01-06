import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { i as n, n as r, r as i, t as a } from './utils-CLvymA-f.mjs';
const o = {
    path: `/studios/:studio`,
    categories: [`multimedia`],
    example: `/javtrailers/studios/s1-no-1-style`,
    parameters: { studio: `Studio name, can be found in the URL of the studio page` },
    radar: [{ source: [`javtrailers.com/studios/:category`] }],
    name: `Studios`,
    maintainers: [`TonyRL`],
    handler: s,
    features: { nsfw: !0 },
};
async function s(o) {
    let { studio: s } = o.req.param(),
        c = await e(`${a}/api/studios/${s}?page=0`, { headers: i }),
        l = n(c.videos),
        u = await Promise.all(l.map((e) => t.tryGet(e.link, () => r(e))));
    return {
        title: `${c.studio.hotDvdIds?.join(` `) ?? c.studio.name} Jav Online | Japanese Adult Video - JavTrailers.com`,
        description: `Watch Jav made by Prestige free, with high definition, we have over 4,000 studios available for free streaming.`,
        link: `${a}/studios/${s}`,
        item: u,
    };
}
export { o as route };
