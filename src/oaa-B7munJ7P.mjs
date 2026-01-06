import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { n as i } from './wechat-mp-HNgcLN2K.mjs';
import { load as a } from 'cheerio';
const o = `http://oaa.tju.edu.cn/`,
    s = `https://github.com/DIYgod/RSSHub/issues`,
    c = (e) => {
        if (!e.startsWith(`http`)) return `in-site`;
        let t = new URL(e);
        return t.hostname === `mp.weixin.qq.com` ? `wechat-mp` : t.hostname === `oaa.tju.edu.cn` ? `tju-oaa` : `unknown`;
    },
    l = {
        path: `/oaa/:type?`,
        categories: [`university`],
        example: `/tju/oaa/news`,
        parameters: { type: 'default `news`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `The Office of Academic Affairs`,
        maintainers: [`AlanZeng423`, `AmosChenYQ`, `SuperPung`],
        handler: u,
        description: `| News | Notification |
| :--: | :----------: |
| news | notification |`,
    };
async function u(l) {
    let u = l.req.param(`type`),
        d,
        f;
    switch (u) {
        case `news`:
            ((f = `新闻动态`), (d = `xwdt.htm`));
            break;
        case `notification`:
            ((f = `通知公告`), (d = `tzgg.htm`));
            break;
        default:
            ((f = `新闻动态`), (d = `xwdt.htm`));
    }
    let p = null;
    try {
        p = await n(o + d, { headers: { Referer: o } });
    } catch {}
    if (p === null) return { title: `天津大学教务处 - ` + f, link: o + d, description: `链接失效` + o + d, item: [{ title: `提示信息`, link: s, description: `<h2>请到<a href=${s}>此处</a>提交Issue</h2>` }] };
    {
        let s = a(p.data),
            l = s(`.notice_l > ul > li > dl > dt`)
                .toArray()
                .map((e) => {
                    let n = s(`a`, e).attr(`href`),
                        i = c(n);
                    return { title: s(`h2`, e).text(), link: i === `in-site` ? o + n : n, pubDate: r(t(s(`.fl_01_r_time`, e).text(), `DDYYYY-MM`), 8), type: i };
                }),
            u = await Promise.all(
                l.map((t) => {
                    switch (t.type) {
                        case `wechat-mp`:
                            return i(t);
                        case `tju-oaa`:
                        case `in-site`:
                            return e.tryGet(t.link, async () => {
                                let e = null;
                                try {
                                    ((e = await n(t.link, { https: { rejectUnauthorized: !1 } })), (t.description = a(e.data)(`.v_news_content`).html()));
                                } catch {}
                                return t;
                            });
                        default:
                            return t;
                    }
                })
            );
        return { title: `天津大学教务处 - ` + f, link: o + d, description: null, item: u };
    }
}
export { l as route };
