import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://today.hitwh.edu.cn`,
    o = {
        path: `/today`,
        categories: [`university`],
        example: `/hitwh/today`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`hitwh.edu.cn/1024/list.htm`, `hitwh.edu.cn/`] }],
        name: `今日工大 - 通知公告`,
        maintainers: [`raptazure`],
        handler: s,
        url: `hitwh.edu.cn/1024/list.htm`,
    };
async function s() {
    let o = i((await n(`${a}/1024/list.htm`, { https: { rejectUnauthorized: !1 } })).data),
        s = (e) => e.split(`.`).pop(),
        c = o(`.list_list_wrap #wp_news_w10002 ul > li`)
            .toArray()
            .map((e) => ({ pubDate: r(t(o(e).find(`.news-time2`).text()), 8), link: new URL(o(e).find(`a`).attr(`href`), a).toString(), title: o(e).find(`a`).text() }));
    return {
        title: `哈尔滨工业大学（威海）通知公告`,
        link: `${a}/1024/list.htm`,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    if (s(t.link) === `htm`)
                        try {
                            let { data: e } = await n(t.link, { https: { rejectUnauthorized: !1 } }),
                                r = i(e);
                            return ((t.description = r(`div.wp_articlecontent`).html() && r(`div.wp_articlecontent`).html().replaceAll(`src="/`, `src="${a}/`).replaceAll(`href="/`, `href="${a}/`).trim()), t);
                        } catch {
                            return ((t.description = `请进行统一身份认证之后再访问`), t);
                        }
                    else return ((t.description = `此链接为文件，点击以下载`), t);
                })
            )
        ),
    };
}
export { o as route };
