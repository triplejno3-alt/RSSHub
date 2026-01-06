import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './utils-B5uKdrdg.mjs';
const r = {
    path: `/newsflash`,
    categories: [`new-media`],
    example: `/leiphone/newsflash`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`leiphone.com/`] }],
    name: `业界资讯`,
    maintainers: [],
    handler: i,
    url: `leiphone.com/`,
};
async function i() {
    let r = `https://www.leiphone.com/site/YejieKuaixun`,
        i = (((await t.get(r)).data || {}).article || []).map((e) => e.url);
    return { title: `雷峰网 业界资讯`, description: `雷峰网 - 读懂智能&未来`, link: r, item: await n.ProcessFeed(i, e) };
}
export { r as route };
