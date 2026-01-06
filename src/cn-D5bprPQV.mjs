import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import a from 'node:crypto';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = { LINE_BREAK: 0, INLINE_CODE: 1, LEGACY_PUBLISHING_EMPHASIS: 2, LIST_ITEM: 3, LIST: 4, STRIKETHROUGH: 5, SUBSCRIPT: 6, SUPERSCRIPT: 7, UNDERLINE: 8, BOLD: 9, ITALIC: 10, PARAGRAPH: 11 };
var l = class {
        constructor(e) {
            ((this.attr = e), (this.start = e.start), (this.end = e.start + e.length), (this.children = []));
        }
    },
    u = class e {
        constructor(e) {
            if (Array.isArray(e)) ((this.string = null), (this.codePoints = e));
            else {
                this.string = e;
                let t = e.length,
                    n = [],
                    r,
                    i,
                    a = 0;
                for (; a < t; ) ((r = e.charCodeAt(a++)), r >= 55296 && r <= 56319 && a < t ? ((i = e.charCodeAt(a++)), (64512 & i) == 56320 ? n.push(((1023 & r) << 10) + (1023 & i) + 65536) : (n.push(r), a--)) : n.push(r));
                this.codePoints = n;
            }
            this.length = this.codePoints.length;
        }
        substring(t, n) {
            let r = this.length,
                i = t,
                a = n;
            return a === 0
                ? new e(``)
                : ((Number.isNaN(i) || 0 > i) && (i = 0), (Number.isNaN(a) || 0 > a) && (a = r), i > r && (i = r), a > r && (a = r), a < i && ((r = [i, a]), (a = r[0]), (i = r[1])), new e(i === a ? `` : this.codePoints.slice(i, a)));
        }
        slice(e, t) {
            return this.substring(e, t).toString();
        }
        toString() {
            return this.string === null
                ? this.codePoints
                      .map((e) => {
                          let t = ``;
                          return (65535 < e && ((t += String.fromCharCode((((e -= 65536) >>> 10) & 1023) | 55296)), (e = 1023 & (56320 | e))), t + String.fromCharCode(e));
                      })
                      .join(``)
                : this.string;
        }
    };
const d = (e) => {
        switch (e?.attr?.detailData?.style) {
            case `BOLD`:
                return `<b>${e.text}</b>`;
            case `LINE_BREAK`:
                return `<br>`;
            case `LIST_ITEM`:
                return `<li>${e.text}</li>`;
            case `LIST`:
                return `<ul>${e.text}</ul>`;
            case `INLINE_CODE`:
                return `<code>${e.text}</code>`;
            case `LEGACY_PUBLISHING_EMPHASIS`:
                return `<em>${e.text}</em>`;
            case `STRIKETHROUGH`:
                return `<s>${e.text}</s>`;
            case `SUBSCRIPT`:
                return `<sub>${e.text}</sub>`;
            case `SUPERSCRIPT`:
                return `<sup>${e.text}</sup>`;
            case `UNDERLINE`:
                return `<u>${e.text}</u>`;
            case `ITALIC`:
                return `<i>${e.text}</i>`;
            case `PARAGRAPH`:
                return `<p>${e.text}</p>`;
            default:
                return e.text || e;
        }
    },
    f = (e) => {
        let { attributes: t, text: n } = e,
            r = [...t];
        r.sort((e, t) => {
            let n = e.start + e.length,
                r = t.start + t.length;
            return n === r ? c[e.detailData.style] - c[t.detailData.style] : n - r;
        });
        let i = [];
        for (let e of r) {
            let t = new l(e),
                n = e.start;
            for (; 0 < i.length && i.at(-1).attr.start >= n; ) t.children.push(i.pop());
            (t.children.reverse(), i.push(t));
        }
        let a = new u(n),
            o = (e) => {
                if (e.children.length === 0) return ((e.text = a.slice(e.start, e.end)), d(e));
                let t = [],
                    n = e.start;
                for (let r of e.children) (n < r.start && t.push(a.slice(n, r.start)), (n = r.end), t.push(o(r)));
                return (n < e.end && t.push(a.slice(n, e.end)), (e.text = t.join(``)), d(e));
            },
            s = [],
            f = 0;
        for (let e of i) (e.start > f && s.push(a.slice(f, e.start)), (f = e.end), s.push(o(e)));
        return (f < a.length && s.push(a.slice(f)), s.join(``));
    },
    p = `https://www.linkedin.cn/karpos/api/graphql`,
    m = () => {
        let e = a.randomBytes(8).toString(`hex`).slice(0, 8);
        return {
            Accept: `*/*`,
            Cookie: `JSESSIONID="ajax:${e}"`,
            'Content-Type': `application/x-www-form-urlencoded`,
            Referer: `https://www.linkedin.cn/incareer/jobs/search`,
            'csrf-token': `ajax:${e}`,
            'x-http-method-override': `GET`,
            'x-restli-protocol-version': `2.0.0`,
        };
    },
    h = { 1: `r86400`, 7: `r604800`, 30: `r2592000` },
    g = { china: `102890883`, shanghai: `102772228`, beijing: `103873152` },
    _ = (e) =>
        `(` +
        Object.entries(e)
            .filter(([, e]) => e)
            .map(([e, t]) => `${e}:${encodeURIComponent(t)}`)
            .join(`,`) +
        `)`,
    v = (e) => {
        let t = ``;
        for (let [n, [r, i]] of Object.entries(e).entries()) ((t += `${r}=${i}`), n < Object.keys(e).length - 1 && (t += `&`));
        return t;
    },
    y = (e) => {
        let t = e.req.param(`keywords`),
            { geo: n, remote: r, location: i, period: a, relevant: o } = e.req.query(),
            s = i || n || `China`,
            c = r ? `远程` : ``,
            l = a ? `近${a}天` : ``;
        return `${o ? `相关` : `最新`}${l}在${s}的${t || ``}${c}工作机会`;
    },
    b = async (e) => {
        let n = {
            origin: `jserp`,
            isForRemoteJobsPage: !!e.req.query(`remote`),
            isChinaMultiNationalCorporation: !1,
            count: e.req.query(`limit`) || 20,
            start: `0`,
            geoUrn: `urn:li:ks_geo:${g[e.req.query(`location`)] || e.req.query(`geo`) || g.china}`,
            keywords: decodeURIComponent(e.req.param(`keywords`) || ``),
            f_TPR: h[e.req.query(`period`)] || ``,
            sortType: e.req.query(`relevant`) ? `` : `DATE_DESCENDING`,
        };
        return {
            jobs: (
                await t.post(p, { headers: m(), body: v({ operationName: `searchSearchHitsByJob`, variables: _(n), queryId: `searchSearchHitsByJob.be362cd720abd0ebf89b4bbc3253047f` }) })
            ).data.data.searchSearchHitsByJob.elements.map((e) => e.target.jobPosting),
            title: y(e),
        };
    },
    x = (a, c) => {
        let l = c.entityUrn;
        return e.tryGet(`linkedincn:${l}`, async () => {
            let e = (await t.post(p, { headers: m(), body: v({ operationName: `jobViewPage`, variables: _({ jobPostingUrn: l }), queryId: `jobsJobPostingsById.3b9573e88687a86607ddb74ff013ef50` }) })).data.data.jobsJobPostingsById;
            return (
                (e.desc = f(e.description)),
                {
                    title: `${c.companyName} 正在找 ${c.title}`,
                    link: `https://www.linkedin.cn/incareer/jobs/view/${l.split(`:`).pop()}`,
                    guid: `linkedincn:${l}`,
                    description: o(
                        i(n, {
                            children: [
                                r(`h2`, { children: e.title }),
                                r(`p`, { children: e.applyMethod?.instantOffsiteApply ? r(`a`, { href: e.applyMethod.instantOffsiteApply.companyApplyUrl, children: `点击申请` }) : null }),
                                r(`p`, { children: e.applyMethod?.basicOffsiteApply ? r(`a`, { href: e.applyMethod.basicOffsiteApply.companyApplyUrl, children: `点击申请` }) : null }),
                                i(`p`, { children: [`已有`, e.numApplies, `人申请此职位， `, e.numViews, `人查看此职位`] }),
                                e.compensationDescription ? i(`p`, { children: [`薪资：`, e.compensationDescription || `N/A`, ` `] }) : null,
                                i(`p`, { children: [`工作地点： `, e.geo?.defaultLocalizedName ?? ``, ` `] }),
                                e.company
                                    ? i(n, {
                                          children: [
                                              r(`h2`, { children: `公司介绍` }),
                                              r(`p`, { children: e.company.name }),
                                              i(`p`, { children: [`员工人数：`, e.company.employeeCount] }),
                                              r(`p`, { children: e.company.localizedDescription }),
                                          ],
                                      })
                                    : null,
                                r(`h2`, { children: `职位介绍` }),
                                r(`article`, { children: e.desc ? s(e.desc) : null }),
                            ],
                        })
                    ),
                    pubDate: c.listedAt,
                }
            );
        });
    },
    S = {
        path: `/cn/jobs/:keywords?`,
        categories: [`other`],
        example: `/linkedin/cn/jobs/Software`,
        parameters: { keywords: `搜索关键字` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Jobs`,
        maintainers: [`bigfei`],
        handler: C,
        description:
            '另外，可以通过添加额外的以下 query 参数来输出满足特定要求的工作职位：\n\n| 参数       | 描述                                              | 举例                                                    | 默认值  |\n| ---------- | ------------------------------------------------- | ------------------------------------------------------- | ------- |\n| `geo`      | geo 编码                                          | 102890883（中国）、102772228（上海）、103873152（北京） | 空      |\n| `remote`   | 是否只显示远程工作                                | `true/false`                                            | `false` |\n| `location` | 工作地点                                          | `china/shanghai/beijing`                                | 空      |\n| `relevant` | 排序方式 (true: 按相关性排序，false： 按日期排序) | `true/false`                                            | `false` |\n| `period`   | 发布时间                                          | `1/7/30`                                                | 空      |\n\n  例如：\n  [`/linkedin/cn/jobs/Software?location=shanghai&period=1`](https://rsshub.app/linkedin/cn/jobs/Software?location=shanghai&period=1): 查找所有在上海的今日发布的所有 Software 工作\n\n  **为了方便起见，建议您在 [LinkedIn.cn](https://www.linkedin.cn/incareer/jobs/search) 上进行搜索，并使用 [RSSHub Radar](https://github.com/DIYgod/RSSHub-Radar) 加载特定的 feed。**',
    };
async function C(e) {
    let { title: t, jobs: n } = await b(e),
        r = await Promise.all(n.map((t) => x(e, t)));
    return { title: `领英 - ${t}`, link: `https://www.linkedin.cn/incareer/jobs/search`, item: r };
}
export { S as route };
