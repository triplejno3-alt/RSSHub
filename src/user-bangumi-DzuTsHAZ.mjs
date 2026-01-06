import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import './utils-Bu8-ZFdB.mjs';
import { t } from './cache-BV7o58Cb.mjs';
const n = {
    path: `/user/bangumi/:uid/:type?`,
    categories: [`social-media`],
    example: `/bilibili/user/bangumi/208259`,
    parameters: { uid: `用户 id`, type: `1为番，2为剧，留空为1` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`space.bilibili.com/:uid`], target: `/user/bangumi/:uid` }],
    name: `用户追番列表`,
    maintainers: [`wdssmq`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`uid`),
        i = Number(n.req.param(`type`) || 1),
        a = ((e) => [``, `bangumi`, `cinema`][e])(i),
        o = await t.getUsernameFromUID(r),
        s = (await e({ method: `get`, url: `https://api.bilibili.com/x/space/bangumi/follow/list?type=${i}&follow_status=0&pn=1&ps=15&vmid=${r}`, headers: { Referer: `https://space.bilibili.com/${r}/${a}` } })).data;
    if (s.code !== 0) throw Error(`It looks like something went wrong when querying the Bilibili API: code = ${s.code}, message = ${s.message}`);
    return {
        title: `${o} 的追番列表`,
        link: `https://space.bilibili.com/${r}/${a}`,
        description: `${o} 的追番列表`,
        item:
            s.data &&
            s.data.list &&
            s.data.list.map((e) => ({
                title: `[${e.new_ep.index_show}]${e.title}`,
                description: `${e.evaluate}<br><img src="${e.cover}">`,
                pubDate: new Date(e.new_ep.pub_time ?? Date.now()).toUTCString(),
                link: `https://www.bilibili.com/bangumi/play/` + (e.new_ep.id ? `ep${e.new_ep.id}` : `ss${e.season_id}`),
            })),
    };
}
export { n as route };
