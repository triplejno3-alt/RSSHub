import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
async function a(e) {
    let t = (await n.get(e)).data,
        r = i(t);
    return { description: (r(`#con_c`).length ? r(`#con_c`).html() : ``) + (r(`#con_fujian`).length ? r(`#con_fujian`).html() : ``) };
}
var o = {
    ProcessFeed: (e, n, o) =>
        Promise.all(
            n.map((n) => {
                let s = i(n),
                    c = s(`a`),
                    l = new URL(c.attr(`href`), e).href,
                    u = r(
                        t(
                            s(`.datetime`)
                                .text()
                                .match(/\d{4}-\d{2}-\d{2}/)
                        ),
                        8
                    );
                return o.tryGet(l, async () => {
                    let { description: e } = await a(l);
                    return { title: c.text(), link: l, author: `北林教务处`, description: e, pubDate: u };
                });
            })
        ),
};
const s = {
    path: `/jwc/:type`,
    categories: [`university`],
    example: `/bjfu/jwc/jwkx`,
    parameters: { type: `通知类别` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jwc.bjfu.edu.cn/:type/index.html`] }],
    name: `教务处通知公告`,
    maintainers: [`markmingjie`],
    handler: c,
    description: `| 教务快讯 | 考试信息 | 课程信息 | 教改动态 | 图片新闻 |
| -------- | -------- | -------- | -------- | -------- |
| jwkx     | ksxx     | kcxx     | jgdt     | tpxw     |`,
};
async function c(t) {
    let r = t.req.param(`type`),
        a,
        s;
    switch (r) {
        case `jgdt`:
            ((a = `教改动态`), (s = `jgdt/`));
            break;
        case `ksxx`:
            ((a = `考试信息`), (s = `ksxx/`));
            break;
        case `kcxx`:
            ((a = `课程信息`), (s = `tkxx/`));
            break;
        case `tpxw`:
            ((a = `图片新闻`), (s = `tpxw/`));
            break;
        case `jwkx`:
        default:
            ((a = `教务快讯`), (s = `jwkx/`));
    }
    let c = `http://jwc.bjfu.edu.cn/` + s,
        l = (await n({ method: `get`, url: c })).data,
        u = i(l)(`.list_c li`).slice(0, 15).toArray(),
        d = await o.ProcessFeed(c, u, e);
    return { title: `北林教务处 - ` + a, link: `http://jwc.bjfu.edu.cn/` + s, description: `北京林业大学教务处 - ` + a, item: d };
}
export { s as route };
