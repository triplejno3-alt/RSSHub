import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n, t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './got-CKQ7C9HX.mjs';
import { t as a } from './timezone-CrV-DT8S.mjs';
import { t as o } from './rss-parser-CKuAfhVS.mjs';
import { load as s } from 'cheerio';
import c from 'query-string';
const l = /(\d+)-\d+-\d+/,
    u = { Cookie: e.keylol.cookie ?? void 0 },
    d = {
        path: `/:path`,
        name: `论坛`,
        parameters: { path: `路径，默认为热点聚焦` },
        categories: [`game`],
        example: `/keylol/f161-1`,
        features: { requireConfig: [{ name: `KEYLOL_COOKIE`, optional: !0, description: `配置后可抓取具有阅读权限的帖子內容` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`keylol.com/:path`], target: (e, t) => t.replaceAll(`forum.php?`, ``) }],
        maintainers: [`nczitzk`, `kennyfong19931`],
        handler: f,
        description:
            '::: tip\n  若订阅 [热点聚焦](https://keylol.com/f161-1)，网址为 `https://keylol.com/f161-1`。截取 `https://keylol.com/` 到末尾的部分 `f161-1` 作为参数，此时路由为 [`/keylol/f161-1`](https://rsshub.app/keylol/f161-1)。\n  若订阅子分类 [试玩免费 - 热点聚焦](https://keylol.com/forum.php?mod=forumdisplay&fid=161&filter=typeid&typeid=459)，网址为 `https://keylol.com/forum.php?mod=forumdisplay&fid=161&filter=typeid&typeid=459`。提取`fid`及`typeid` 作为参数，此时路由为 [`/keylol/fid=161&typeid=459`](https://rsshub.app/keylol/fid=161&typeid=459)。注意不要包括`filter`，会调用[全局的内容过滤](https://docs.rsshub.app/guide/parameters#filtering)。\n:::',
    };
async function f(e) {
    let d = {},
        f = e.req.param(`path`);
    (/^f\d+-\d+/.test(f) ? (d.fid = f.match(/^f(\d+)-\d+/)[1]) : (d = c.parse(f)), (d.mod = `forumdisplay`), (d.orderby = `dateline`), (d.filter = `author`));
    let h;
    try {
        h = (await o.parseURL(`https://keylol.com/forum.php?mod=rss&fid=${d.fid}&auth=0`)).items.map((e) => ({ threadId: e.link.match(l)[1], author: e.author }));
    } catch {
        h = [];
    }
    let g = e.req.query(`limit`) ? Number.parseInt(e.req.query(`limit`), 10) : 30,
        _ = `https://keylol.com`,
        v = c.stringifyUrl({ url: `${_}/forum.php`, query: d }),
        { data: y } = await i({ method: `get`, url: v, headers: u }),
        b = s(y),
        x = b(`tbody[id^="normalthread_"]`)
            .slice(0, g)
            .toArray()
            .map(
                (e) => (
                    (e = b(e)),
                    {
                        title: e.find(`a.xst`).text(),
                        link: new URL(e.find(` a.xst`).prop(`href`).split(`&extra=`)[0], _).href,
                        author: e.find(`td.by-author cite`).text(),
                        pubDate: n(e.find(`td.by-author em`).text().replaceAll(` 发表`, ``)),
                    }
                )
            );
    x = await Promise.all(
        x.map((e) =>
            t.tryGet(e.link, async () => {
                let t = l.test(e.link) ? e.link.match(l)[1] : c.parseUrl(e.link).query.tid,
                    { data: n } = await i({ method: `get`, url: e.link, headers: u }),
                    o = s(n),
                    d = [],
                    f = o(`div#threadindex`);
                if (f.length > 0) {
                    let e = o(`div.t_fsz > script`)
                        .text()
                        .match(/show_threadindex\((\d+),/)[1];
                    d = await Promise.all(
                        f.find(`a`).map((n, r) => {
                            let i = b(r).text(),
                                a = b(r).attr(`page`);
                            return m(`${_}/forum.php?${c.stringify({ mod: `viewthread`, tid: t, viewpid: e, cp: a })}`, i);
                        })
                    );
                } else d.push(p(o));
                e.description = d.join(`<br/>`);
                let g = h.find((e) => e.threadId === t);
                (g && (e.author = g.author),
                    (e.category = o(`#keyloL_thread_tags a`)
                        .toArray()
                        .map((e) => o(e).text())));
                let v = o(`img.authicn`).first().next(),
                    y = (v.find(`span`).prop(`title`) ?? v.text()).match(/(\d{4}(?:-\d{1,2}){2} (?:\d{2}:){2}\d{2})/) ?? void 0;
                y && (e.pubDate = a(r(y[1], `YYYY-M-D HH:mm:ss`), 8));
                let x =
                    o(`i.pstatus`)
                        .text()
                        .match(/(\d{4}(?:-\d{1,2}){2} (?:\d{2}:){2}\d{2})/) ?? void 0;
                return (x && (e.updated = a(r(x[1], `YYYY-M-D HH:mm:ss`), 8)), (e.comments = o(`div.subforum_right_title_left_down`).text() ? Number.parseInt(o(`div.subforum_right_title_left_down`).text(), 10) : 0), e);
            })
        )
    );
    let S = b(`link[rel="apple-touch-icon"]`).prop(`href`);
    return {
        item: x,
        title: b(`title`).text(),
        link: v,
        description: b(`meta[name="description"]`).prop(`content`),
        language: `zh-cn`,
        icon: S,
        logo: S,
        subtitle: b(`meta[name="application-name"]`).prop(`content`),
        author: b(`meta[name="author"]`).prop(`content`),
    };
}
function p(e) {
    let t = e(`td.t_f`);
    return (
        t.find(`div.rnd_ai_pr`).remove(),
        t.find(`img`).each((t, n) => {
            ((n = e(n)), n.attr(`src`)?.endsWith(`none.gif`) && n.attr(`file`) && (n.attr(`src`, n.attr(`file`)), n.removeAttr(`file`), n.removeAttr(`zoomfile`)));
        }),
        t.length > 0 ? t.html() : e(`div.alert_info`).html()
    );
}
async function m(e, t) {
    let { data: n } = await i({ method: `get`, url: e, headers: u }),
        r = s(n, { xmlMode: !0 })(`root`).text();
    return `<h3>` + t + `</h3>` + p(s(r));
}
export { d as route };
