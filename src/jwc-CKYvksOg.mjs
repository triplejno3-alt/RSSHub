import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { n as i, t as a } from './extractor-YjLNq2kj.mjs';
import { load as o } from 'cheerio';
const s = {
    path: `/wh/jwc/:column?`,
    categories: [`university`],
    example: `/sdu/wh/jwc/gztz`,
    parameters: { column: '专栏名称，默认为工作通知（`gztz`）' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `教务处`,
    maintainers: [`kxxt`],
    handler: c,
    description: `| 规章制度 | 专业建设 | 实践教学 | 支部风采 | 服务指南 | 教务要闻 | 工作通知 | 教务简报 | 常用下载 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| gzzd     | zyjs     | sjjx     | zbfc     | fwzn     | jwyw     | gztz     | jwjb     | cyxz     |`,
};
async function c(s) {
    let c = s.req.param(`column`) ?? `gztz`,
        l = i.wh.jwc.url,
        u = o((await n(l + i.wh.jwc.columns[c].url)).data),
        d = u(`.articleul li`),
        f = await Promise.all(
            d.map(async (n, i) => {
                i = u(i);
                let o = i.find(`a`),
                    s = i.find(`div:last-of-type`),
                    c = s.text();
                s.remove();
                let d = o.attr(`href`),
                    f = d.startsWith(`http`) ? d : l + d,
                    p = i.text(),
                    { description: m, author: h, exactDate: g } = await e.tryGet(f, () => a(f)),
                    _ = h ?? `教务处`;
                return { title: p, link: f, description: m, pubDate: g ?? r(t(c.slice(1, -1), `YYYY-MM-DD`), 8), author: _ };
            })
        );
    return { title: `${i.wh.jwc.name} ${i.wh.jwc.columns[c].name}`, link: l + i.wh.jwc.columns[c].url, item: f };
}
export { s as route };
