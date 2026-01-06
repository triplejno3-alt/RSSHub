import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r } from './wechat-mp-HNgcLN2K.mjs';
import { load as i } from 'cheerio';
const a = `https://www.ipo.sdu.edu.cn/`,
    o = { tzgg: { title: `通知公告`, url: `tzgg.htm` } },
    s = {
        path: `/gjsw/:type?`,
        categories: [`university`],
        example: `/sdu/gjsw/tzgg`,
        parameters: { type: '默认为`tzgg`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `国际事务部`,
        maintainers: [`kukeya`],
        handler: c,
        description: `| 通知公告 |  
| -------- | 
| tzgg     |      `,
    };
async function c(s) {
    let c = s.req.param(`type`) ?? `tzgg`,
        l = new URL(o[c].url, a).href,
        u = i((await n(l)).data),
        d = u(`.dqlb ul li`)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.find(`a`);
                return { title: n.text().trim(), link: n.attr(`href`).startsWith(`wdhcontent`) ? a + n.attr(`href`) : n.attr(`href`), pubDate: t(e.find(`.fr`).text().trim(), `YYYY-MM-DD`) };
            });
    return (
        (d = await Promise.all(d.map((t) => e.tryGet(t.link, async () => (new URL(t.link).hostname === `mp.weixin.qq.com` ? r(t) : ((t.description = i((await n(t.link)).data)(`.v_news_content`).html()), t)))))),
        { title: `山东大学国际事务部${o[c].title}`, description: u(`title`).text(), link: l, item: d }
    );
}
export { s as route };
