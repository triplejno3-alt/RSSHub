import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `http://www.maonan.gov.cn`,
    o = {
        path: `/maonan/:category`,
        categories: [`government`],
        example: `/gov/maonan/zwgk`,
        parameters: { category: `分类名` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `茂名市茂南区人民政府`,
        maintainers: [`ShuiHuo`],
        handler: s,
        description: `| 政务公开 | 政务新闻 | 茂南动态 | 重大会议 | 公告公示 | 招录信息 | 政策解读 |
| :------: | :------: | :------: | :------: | :------: | :------: | :------: |
|   zwgk   |   zwxw   |   mndt   |   zdhy   |   tzgg   |   zlxx   |   zcjd   |`,
    };
async function s(o) {
    let s = ``,
        c = ``;
    switch (o.req.param(`category`)) {
        case `zwgk`:
            ((s = `zwgk`), (c = `政务公开`));
            break;
        case `zwxw`:
            ((s = `zwxw`), (c = `政务新闻`));
            break;
        case `mndt`:
            ((s = `zwxw/mndt`), (c = `茂南动态`));
            break;
        case `zdhy`:
            ((s = `zwxw/zdhy`), (c = `重大会议`));
            break;
        case `tzgg`:
            ((s = `zwgk/tzgg`), (c = `公告公示`));
            break;
        case `zlxx`:
            ((s = `zwgk/zlxx`), (c = `招录信息`));
            break;
        case `zcjd`:
            ((s = `zwgk/zcjd`), (c = `政策解读`));
            break;
    }
    let l = (await n(`${a}/${s}/`)).data,
        u = i(l),
        d = u(`li.clearfix a[href*="www.maonan.gov.cn"], li.clearfix a[href*="mp.weixin.qq.com"]`),
        f = await Promise.all(
            d.map((a, o) => {
                o = u(o);
                let s = new URL(o.attr(`href`)),
                    c = s.href,
                    l = r(t(u(`a[href="` + c + `"] ~ .time`).text()), 8);
                return e.tryGet(c, async () => {
                    let { data: e } = await n(c),
                        t = i(e);
                    switch (s.host) {
                        case `mp.weixin.qq.com`:
                            return { title: o.text(), description: t(`#js_content`).html(), pubDate: l, link: c, author: t(`#js_name`).text() };
                        case `www.maonan.gov.cn`:
                            switch (s.pathname) {
                                case `/zcjdpt`:
                                    return {
                                        title: t(`meta[name="ArticleTitle"]`).attr(`content`),
                                        description: t(`.wrap`).html(),
                                        pubDate: l,
                                        link: c,
                                        author: t(`meta[name="ContentSource"]`).attr(`content`) === `本网` ? `茂名市茂南区人民政府网` : t(`meta[name="ContentSource"]`).attr(`content`),
                                    };
                                default:
                                    return {
                                        title: t(`.newsContainer_title`).text(),
                                        description: t(`.newsContainer_text`).html(),
                                        pubDate: l,
                                        link: c,
                                        author: t(`.author`).text().trim() === `本网` ? `茂名市茂南区人民政府网` : t(`.author`).text().trim(),
                                    };
                            }
                    }
                });
            })
        );
    return { title: `茂名市茂南区人民政府 - ${c}`, link: `${a}/${s}`, item: f };
}
export { o as route };
