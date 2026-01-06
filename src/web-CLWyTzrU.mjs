import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { n as i, t as a } from './utils-BzNsBsFu.mjs';
const o = {
    path: `/web/:channel`,
    categories: [`traditional-media`],
    example: `/oeeee/web/170`,
    parameters: { channel: `频道 ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `奥一网`,
    maintainers: [`TimWu007`],
    handler: s,
    description:
        '-   若在桌面端打开奥一网栏目页（如 `https://www.oeeee.com/api/channel.php?s=/index/index/channel/gz`），可查看该页源代码，搜索 `OECID`。\n  -   若在移动端打开奥一网栏目页（格式例：`https://m.oeeee.com/m.php?s=/m2/channel&channel_id=169`），即可从 url 中获取。需注意的是，如果该栏目页的 url 格式为 `https://m.oeeee.com/detailChannel_indexData.html?channel_id=266` ，则 `266` 并非为本路由可用的频道 ID，建议从桌面端获取。',
};
async function s(o) {
    let { data: s } = await n(`https://www.oeeee.com/api/channel.php?m=Js4channelNews&a=newLatest&cid=${o.req.param(`channel`) ?? 0}`),
        c = s.data.map((e) => ({
            title: `【` + e.channel_name + `】` + e.title,
            description: i({ thumb: e.img, description: e.summary }),
            pubDate: r(t(e.datetime), 8),
            link: e.linkurl,
            author: e.author,
            channelEname: e.channel_ename,
        })),
        l = c[1] ? c[1].channelEname : ``,
        u = await Promise.all(c.map((t) => a(t, e.tryGet)));
    return { title: `南方都市报奥一网`, link: `https://www.oeeee.com/api/channel.php?s=/index/index/channel/${l}`, item: u };
}
export { o as route };
