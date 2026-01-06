import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './not-found-C-Horq2w.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './embed-resource-CgLuG091.mjs';
import { load as a } from 'cheerio';
const o = `https://www.nwnu.edu.cn/_upload/tpl/02/d9/729/template729/favicon.ico`,
    s = `https://yjsy.nwnu.edu.cn/`,
    c = {
        2701: { title: `招生工作（包括硕士、博士招生）`, description: `研究生院招生信息（包含硕士招生和博士招生两个栏目）` },
        2738: { title: `工作动态`, description: `研究生院工作动态` },
        2712: { title: `博士招生`, description: `研究生院博士研究生招生信息` },
        2713: { title: `硕士招生`, description: `研究生院硕士研究生招生信息` },
        2702: { title: `培养工作`, description: `培养工作栏目信息汇总` },
        2703: { title: `学科建设`, description: `研究生院学科建设信息汇总` },
        2704: { title: `学位工作`, description: `研究生院学位工作栏目信息汇总` },
    },
    l = {
        path: `/department/postgraduate/:column`,
        name: `研究生院`,
        maintainers: [`PrinOrange`],
        handler: async (l) => {
            let u = l.req.param(`column`);
            if (c[u] === void 0) throw new t(`The column ${u} does not exist`);
            let d = c[u].title,
                f = c[u].description,
                p = `https://yjsy.nwnu.edu.cn/${u}/list.htm`,
                { data: m } = await r(p),
                h = a(m),
                g = h(`#AjaxList > ul > li.a-list`)
                    .toArray()
                    .map((e) => {
                        let t = h(e).find(`a:nth-child(2)`).attr(`title`),
                            r = n(h(e).find(`span.pdate`).text()),
                            i = h(e).find(`a:nth-child(2)`).attr(`href`);
                        return { title: t, date: r, link: new URL(i, s).href };
                    });
            return {
                title: d,
                description: f,
                link: p,
                image: o,
                item: await Promise.all(
                    g.map((t) =>
                        e.tryGet(t.link, async () => {
                            let { data: e } = await r(t.link),
                                n = i(s, a(e)(`div.content_div`).html() || ``);
                            return { title: t.title, pubDate: t.date, link: t.link, description: n, category: [`university`], guid: t.link, id: t.link, image: o, content: n, updated: t.date, language: `zh-CN` };
                        })
                    )
                ),
                allowEmpty: !0,
                language: `zh-CN`,
                feedLink: `https://rsshub.app/nwnu/department/postgraduate/${u}`,
                id: `https://rsshub.app/nwnu/department/postgraduate/${u}`,
            };
        },
        categories: [`university`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportRadar: !0, supportPodcast: !1, supportScihub: !1 },
        example: `/department/postgraduate/2701`,
        radar: [{ source: [`yjsy.nwnu.edu.cn/:column/list.htm`], target: `/department/postgraduate/:column` }],
        description: `
| column | 标题                           | 描述                                               |
| ------ | ------------------------------ | -------------------------------------------------- |
| 2701   | 招生工作（包括硕士、博士招生） | 研究生院招生信息（包含硕士招生和博士招生两个栏目） |
| 2712   | 博士招生                       | 研究生院博士研究生招生信息                         |
| 2713   | 硕士招生                       | 研究生院硕士研究生招生信息                         |
| 2702   | 培养工作                       | 培养工作栏目信息汇总                               |
| 2703   | 学科建设                       | 研究生院学科建设信息汇总                           |
| 2704   | 学位工作                       | 研究生院学位工作栏目信息汇总                       |`,
    };
export { l as route };
