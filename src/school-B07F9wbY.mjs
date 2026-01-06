import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import * as n from 'node:url';
import r from 'node:querystring';
const i = `http://jw.scut.edu.cn`,
    a = i + `/dist/`;
(i + ``, i + ``, i + ``);
const o = (e) => `${i}/zhinan/cms/article/view.do?type=posts&id=${e}`,
    s = (e) => `${i}/dist/#/detail/index?id=${e}&type=notice`,
    c = { all: { title: `全部`, tag: `0` }, course: { title: `选课`, tag: `1` }, exam: { title: `考试`, tag: `2` }, info: { title: `信息`, tag: `6` } },
    l = (e) => {
        let t = e.getTimezoneOffset() / 60;
        return new Date(e.getTime() - 3600 * 1e3 * (8 + t));
    },
    u = (e) => {
        let t = new Date(e);
        return (t.setHours(8), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), l(t));
    },
    d = (e) => !!e.link,
    f = (e) => e.replaceAll(`src="/`, `src="${n.resolve(i, `.`)}`).replaceAll(`href="/`, `href="${n.resolve(i, `.`)}`),
    p = (e) => {
        if (!e.success) throw Error(`article api error`);
    },
    m = (e) => `<p>链接：<a href="${o(e)}">电脑版</a>&nbsp;|&nbsp;<a href="${s(e)}">手机版</a></p>`,
    h = (e) => f(e.content) + m(e.id),
    g = {
        path: `/jwc/school/:category?`,
        categories: [`university`],
        example: `/scut/jwc/school/all`,
        parameters: { category: '通知分类，默认为 `all`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `教务处学院通知`,
        maintainers: [`imkero`, `Rongronggg9`],
        handler: _,
        description: `| 全部 | 选课   | 考试 | 信息 |
| ---- | ------ | ---- | ---- |
| all  | course | exam | info |`,
    };
async function _(n) {
    let i = c[n.req.param(`category`) || `all`],
        s = await t({ method: `post`, url: `http://jw.scut.edu.cn/zhinan/jw/api/v2/findInformNotice.do?${r.stringify({ category: 1, pageNo: 1, pageSize: 20, tag: i.tag })}`, headers: { Referer: a } });
    p(s.data);
    let l = s.data.data.list,
        f = await Promise.all(
            l.map(async (n) => {
                let i = o(n.id),
                    s = await e.get(i);
                if (s) return JSON.parse(s);
                let c = await t({ method: `post`, url: `http://jw.scut.edu.cn/zhinan/jw/api/v2/getArticleInfo.do?${r.stringify({ id: n.id, categoryType: `` })}`, headers: { Referer: a } });
                p(c.data);
                let l = c.data.data;
                l.id = n.id;
                let f = null;
                d(l) || (f = h(l));
                let m = { title: l.name, link: i, description: f, pubDate: u(l.createDate).toUTCString() };
                return (e.set(i, JSON.stringify(m)), m);
            })
        );
    return { title: `华南理工大学教务处学院通知 - ` + i.title, link: `http://jw.scut.edu.cn/zhinan/cms/toPosts.do?category=1`, item: f };
}
export { g as route };
