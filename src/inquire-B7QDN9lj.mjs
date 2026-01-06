import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = {
    path: `/inquire/:category?/:select?/:keyword?`,
    categories: [`finance`],
    example: `/szse/inquire`,
    parameters: { category: '类型，见下表，默认为 `0` 即 主板', select: `函件类别, 见下表，默认为全部函件类别`, keyword: `公司代码或简称，默认为空` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`szse.cn/disclosure/supervision/inquire/index.html`, `szse.cn/`], target: `/inquire` }],
    name: `问询函件`,
    maintainers: [`Jeason0228`, `nczitzk`],
    handler: c,
    url: `szse.cn/disclosure/supervision/inquire/index.html`,
    description: `类型

| 主板 | 创业板 |
| ---- | ------ |
| 0    | 1      |

  函件类别

| 全部函件类别 | 非许可类重组问询函 | 问询函 | 违法违规线索分析报告 | 许可类重组问询函 | 监管函（会计师事务所模板） | 提请关注函（会计师事务所模板） | 年报问询函 | 向中介机构发函 | 半年报问询函 | 关注函 | 公司部函 | 三季报问询函 |
| ------------ | ------------------ | ------ | -------------------- | ---------------- | -------------------------- | ------------------------------ | ---------- | -------------- | ------------ | ------ | -------- | ------------ |`,
};
async function c(n) {
    let r = n.req.param(`category`) ?? `0`,
        i = n.req.param(`select`) ?? `全部函件类别`,
        a = n.req.param(`keyword`) ?? ``,
        o = `https://www.szse.cn`,
        s = (await t({ method: `get`, url: `${o}/api/report/ShowReport/data?SHOWTYPE=JSON&CATALOGID=main_wxhj&TABKEY=tab${Number.parseInt(r) + 2}${i === `全部函件类别` ? `` : `&selecthjlb=${i}`}${a ? `&txtZqdm=${a}` : ``}` })).data[
            r
        ],
        c = s.data.map(
            (t) => (
                (t.ck = t.ck.match(/encode-open='\/(.*)'>详细内容/)[1]),
                (t.hfck = t.hfck.replace(/encode-open='\//, `encode-open='http://reportdocs.static.szse.cn/`)),
                { title: `[${t.gsdm}] ${t.gsjc} (${t.hjlb})`, link: `http://reportdocs.static.szse.cn/${t.ck}`, pubDate: e(t.fhrq), description: l(t) }
            )
        );
    return { title: `深圳证券交易所 - 问询函件 - ${s.metadata.name}`, link: `${o}/disclosure/supervision/inquire/index.html`, item: c, description: `函件类别：${i}${a ? `; 公司代码或简称：${a}` : ``}` };
}
const l = (e) =>
    a(
        i(n, {
            children: [
                i(`p`, { children: [`公司代码：`, e.gsdm] }),
                i(`p`, { children: [`公司简称：`, e.gsjc] }),
                i(`p`, { children: [`发函日期：`, e.fhrq] }),
                i(`p`, { children: [`函件类别：`, e.hjlb] }),
                i(`p`, { children: [`函件内容：`, r(`a`, { href: `http://reportdocs.static.szse.cn/${e.ck}`, children: `详细内容` })] }),
                i(`p`, { children: [`公司回复：`, o(e.hfck)] }),
            ],
        })
    );
export { s as route };
