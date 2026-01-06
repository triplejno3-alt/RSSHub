import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/:label?`,
    categories: [`new-media`],
    example: `/mygopen`,
    parameters: { label: `分類，见下表，默认为首页` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`mygopen.com/search/label/:label`, `mygopen.com/`] }],
    name: `分類`,
    maintainers: [`nczitzk`],
    handler: r,
    description: `| 謠言 | 詐騙 | 真實資訊 | 教學 |
| ---- | ---- | -------- | ---- |`,
};
async function r(n) {
    let r = n.req.param(`label`) ?? ``,
        i = `https://www.mygopen.com`,
        a = `${i}${r ? `/search/label/${r}` : ``}`,
        o = await t({ method: `get`, url: `${i}/feeds/posts/default${r ? `/-/${r}` : ``}?alt=json-in-script&max-results=${n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`)) : 50}` }),
        s = JSON.parse(o.data.match(/gdata\.io\.handleScriptLoaded\((.*)\);/)[1]).feed.entry.map((t) => ({ title: t.title.$t, description: t.content.$t, pubDate: e(t.published.$t), link: t.link.pop().href }));
    return { title: `MyGoPen${r ? `: ${r}` : ``}`, link: a, item: s, description: `詐騙與謠言頻傳的年代，「MyGoPen｜這是假消息」提醒網路使用者隨時要用謹慎懷疑的態度面對網路上的消息。` };
}
export { n as route };
