import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
        all: { title: `全部`, path: `` },
        tech: { title: `科技`, path: `tech/` },
        finance: { title: `财经`, path: `finance/` },
        life: { title: `生活`, path: `life/` },
        company: { title: `公司`, path: `company/` },
        character: { title: `人物`, path: `character/` },
    },
    a = (t) =>
        e.tryGet(t.link, async () => {
            let e = await n({ method: `get`, url: `https:${t.link}`, responseType: `arrayBuffer` });
            return ((t.description = r(new TextDecoder(`GBK`).decode(e.data))(`.context-box .context-table tbody td`).html()), t);
        }),
    o = async (e) => {
        let { category: r = `all` } = e.req.param(),
            o = i[r] || i.all,
            s = `https://www.pconline.com.cn/3g/other/focus/${o.path}index.html`,
            c = (await n({ method: `get`, url: s })).data
                .replace(/Module\.callback\((.*)\)/s, `$1`)
                .split(
                    `
`
                )
                .filter((e) => e.indexOf(`"tags":`) !== 0)
                .join(
                    `
`
                )
                .replaceAll(`'`, `"`)
                .replaceAll(/[\n\r]/g, ``)
                .replaceAll(`,}`, `}`),
            { articleList: l } = JSON.parse(c || ``),
            u = l.map((e) => ({ id: e.id, title: e.title, author: [{ name: e.authorname, avatar: e.authorImg }], pubDate: t(e.pc_pubDate), link: e.url, description: e.summary, category: e.channelName, image: e.cover })),
            d = await Promise.all(u.map((e) => a(e)));
        return { title: `太平洋科技-${o.title}`, link: s, item: d };
    },
    s = {
        path: `/focus/:category?`,
        categories: [`new-media`],
        example: `/pconline/focus`,
        parameters: { category: { description: `科技新闻的类别，获取最新的一页，分别：all, tech, finance, life, company, character`, default: `all` } },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`pconline.com.cn/focus/`, `pconline.com.cn/`], target: `/focus` }],
        name: `科技新闻`,
        maintainers: [`CH563`],
        handler: o,
        description: `::: tip
| 全部 | 科技 | 财经 | 生活 | 公司 | 人物 |
| --- | --- | --- | --- | --- | --- |
| all | tech | finance | life | company | character |
:::`,
    };
export { o as handler, s as route };
