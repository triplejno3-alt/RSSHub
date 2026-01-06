import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `http://www.moa.gov.cn/`,
    a = new URL(i),
    o = {
        path: `/moa/suburl/:suburl{.+}`,
        categories: [`government`],
        example: `/gov/moa/suburl/gk/zcjd/`,
        radar: [{ source: [`moa.gov.cn/`], target: `/moa/suburl/:suburl` }],
        parameters: { suburl: `下级目录，请使用最下级的目录` },
        name: `中华人民共和国农业农村部 - 新闻`,
        maintainers: [`Origami404`, `lyqluis`],
        handler: s,
        url: `moa.gov.cn/`,
        description:
            '更多例子：\n  -   `农业农村部动态`的网页链接是`http://www.moa.gov.cn/xw/zwdt/`, 对应的`suburl`是`xw/zwdt`\n  -   `财务公开`的网页链接是`http://www.moa.gov.cn/gk/cwgk_1/`, 对应的`suburl`是`gk/cwgk_1`\n  -   像[政策法规](http://www.moa.gov.cn/gk/zcfg/)这种页面(`http://www.moa.gov.cn/gk/zcfg/`), 它**不是**一个合法的分类目录，它是`法律`, `行政法规`, `部门规章`等一堆栏目的集合，这时候请点开对应栏目的`更多 >>`进入栏目的最下级目录，再根据上面的规则提取`suburl`\n  -   特别地，`图片新闻`对应的`suburl`为`xw/tpxw/`, `最新公开`对应的`suburl`为`govpublic`, `数据>最新发布`对应的`suburl`为`sj/zxfb`',
    };
async function s(e) {
    let t = e.req.param(`suburl`),
        n = t.slice(-1) === `/` ? t : t + `/`;
    return n === `xw/tpxw/`
        ? await c(n, { channelTitleSelector: `.pub-media2-head`, listSelector: `.tupian_list li`, titleSelector: `a[class="block w_fill ellipsis adc ahc"]`, dateSelector: `span` })
        : n.startsWith(`sj/zxfb`)
          ? await d()
          : n.startsWith(`gk`)
            ? await c(n, { channelTitleSelector: `title`, listSelector: `.commonlist li`, titleSelector: `a`, dateSelector: `span` })
            : n.startsWith(`govpublic`)
              ? await c(`govpublic/1/index.htm`, { channelTitleText: `最新公开`, listSelector: `.commonlist li`, titleSelector: `a`, dateSelector: `span` })
              : await c(n, { channelTitleSelector: `.pub-media1-head-title`, listSelector: `.ztlb`, titleSelector: `a`, dateSelector: `span` });
}
async function c(a, o) {
    let { channelTitleSelector: s, listSelector: c, titleSelector: d, dateSelector: f, channelTitleText: m } = o,
        h = a.startsWith(`http`) ? a : i + a,
        g = r((await n.get(h)).data),
        _ = m ?? g(s).text(),
        v = g(c)
            .toArray()
            .map((e) => {
                let n = g(e),
                    r = n.find(d),
                    i = r.text(),
                    [a, o] = p(r, h);
                return { pageType: o, title: i, link: a, pubDate: t(n.find(f).text().trim()) };
            }),
        y = await Promise.all(
            v.map(async (t) => {
                let n = t.link,
                    r = await e.get(n);
                return r ? JSON.parse(r) : (t.pageType === `normal` ? (t = await l(n, t)) : t.pageType === `govpublic` ? (t = await u(n, t)) : (t.description = `外部链接：${t.link}`), e.set(n, JSON.stringify(t)), t);
            })
        );
    return { title: `中华人民共和国农业农村部 - ${_}`, link: h, item: y };
}
async function l(e, i) {
    let a = r((await n.get(e)).data);
    if (e.includes(`zbft`)) {
        let e = a(`.nybzb`).html() ?? ``,
            t = a(`.tpsl`).html() ?? ``,
            n = a(`.wzsl`).html() ?? ``;
        return ((i.description = e + t + n), i);
    }
    let o = a(`.bjjMAuthorBox span.dc_2`).toArray();
    i.author = `${a(o[1]).text()} ${a(o[2]).text()}`;
    let s = a(o[0]).text(),
        c = /\d{4}-\d{2}-\d{2}/.exec(s),
        l = /\d{2}:\d{2}/.exec(s);
    return ((i.pubDate = t(`${c[0]} ${l[0]}`)), (i.description = a(`.arc_body`).html()), i);
}
async function u(e, t) {
    if (t.link.endsWith(`.pdf`)) return t;
    let i = r((await n.get(e)).data),
        a = i(`.gsj_htmlcon_bot`),
        [, o, s, c] = i(`.pubtime`)
            .text()
            .match(/：(\d{4})[|年-](\d{1,2})[|月-](\d{1,2})日?/),
        [, l] = i(`.pubtime.source`)
            ?.text()
            ?.match(/：(.+)/) ?? [null, ``];
    return (o && s && c && (t.pubDate = `${o}-${s}-${c}`), (t.author = l), (t.description = a.html()), t);
}
async function d() {
    let t = await n({ url: `http://zdscxx.moa.gov.cn:8080/nyb/getMessages`, method: `post`, json: { page: 1, rows: 20, type: `最新发布`, isLatestMessage: !0 } });
    return {
        title: `中华人民共和国农业农村部 - 数据 - 最新发布`,
        link: `http://zdscxx.moa.gov.cn:8080/nyb/pc/messageList.jsp`,
        item: await Promise.all(
            t.data.result.table.map((t) => {
                let { date: n, id: r } = t;
                t.pubDate = n;
                let i = (t.link = `http://zdscxx.moa.gov.cn:8080/nyb/pc/messageView.jsp?id=${r}`);
                return e.tryGet(i, async () => {
                    let { content: e, source: n } = await f(r);
                    return ((t.description = e), (t.author = n), t);
                });
            })
        ),
    };
}
async function f(e) {
    return (await n({ url: `http://zdscxx.moa.gov.cn:8080/nyb/getMessagesById`, method: `post`, form: { id: e } })).data.result;
}
function p(e, t) {
    let n = e.attr(`href`),
        { host: r, href: i } = new URL(n, t),
        o = null;
    return ((o = r === a.host ? (i.includes(`gk`) || i.includes(`govpublic`) ? `govpublic` : `normal`) : `outside`), [i, o]);
}
export { o as route };
