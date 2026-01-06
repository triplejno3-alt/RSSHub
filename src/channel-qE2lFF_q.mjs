import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { n as i, t as a } from './utils-BzNsBsFu.mjs';
const o = { path: `/app/channel/:id`, name: `Unknown`, maintainers: [`TimWu007`], handler: s };
async function s(o) {
    let s = o.req.param(`id`) ?? 50,
        { data: c } = await n(`https://api-ndapp.oeeee.com/friends.php?m=Zone&a=SpaceDoclist&uid=${s}&type=doc`),
        l = c.data
            .filter((e) => e.url)
            .map((e) => ({ title: e.title, description: i({ thumb: e.titleimg.replaceAll(/\?x-oss-process=.*/g, ``), description: e.summary }), pubDate: r(t(e.ptime * 1e3), 8), link: e.url, channel: e.author })),
        u = l[1] ? l[1].channel : ``,
        d = await Promise.all(l.map((t) => a(t, e.tryGet)));
    return { title: `南方都市报客户端 - ${u}`, link: `https://m.mp.oeeee.com/u/${s}.html`, item: d };
}
export { o as route };
