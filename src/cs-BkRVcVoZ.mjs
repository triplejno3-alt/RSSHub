import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r } from './wechat-mp-HNgcLN2K.mjs';
import { load as i } from 'cheerio';
const a = `https://www.cs.sdu.edu.cn/`,
    o = { announcement: `xygg.htm`, academic: `xsbg.htm`, technology: `kjjx.htm`, undergraduate: `bkjy.htm`, postgraduate: `yjsjy.htm` },
    s = { announcement: `学院公告`, academic: `学术报告`, technology: `科技简讯`, undergraduate: `本科教育`, postgraduate: `研究生教育` },
    c = {
        path: `/cs/index/:type?`,
        categories: [`university`],
        example: `/sdu/cs/index/announcement`,
        parameters: { type: '默认为 `announcement`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.cs.sdu.edu.cn/`, `www.cs.sdu.edu.cn/xygg.htm`], target: `/cs/index/announcement` },
            { source: [`www.cs.sdu.edu.cn/xsbg.htm`], target: `/cs/index/academic` },
            { source: [`www.cs.sdu.edu.cn/kjjx.htm`], target: `/cs/index/technology` },
            { source: [`www.cs.sdu.edu.cn/bkjy.htm`], target: `/cs/index/undergraduate` },
            { source: [`www.cs.sdu.edu.cn/yjsjy.htm`], target: `/cs/index/postgraduate` },
        ],
        name: `计算机科学与技术学院通知`,
        maintainers: [`Ji4n1ng`, `wiketool`],
        handler: l,
        description: `| 学院公告 | 学术报告 | 科技简讯 | 本科教育 | 研究生教育 |
| -------- | -------- | -------- | -------- | -------- |
| announcement | academic | technology | undergraduate | postgraduate |`,
    };
async function l(c) {
    let l = c.req.param(`type`) ?? `announcement`,
        u = new URL(o[l], a).href,
        d = i((await n(u)).data),
        f = d(`.dqlb ul li`)
            .toArray()
            .map((e) => {
                e = d(e);
                let n = e.find(`a`);
                return { title: n.text().trim(), link: n.attr(`href`).startsWith(`info/`) ? a + n.attr(`href`) : n.attr(`href`), pubDate: t(e.find(`.fr`).text().trim(), `YYYY-MM-DD`) };
            });
    return (
        (f = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    if (new URL(t.link).hostname === `mp.weixin.qq.com`) return r(t);
                    if (new URL(t.link).hostname !== `www.cs.sdu.edu.cn`) return t;
                    let e = i((await n(t.link)).data);
                    return (
                        (t.title = e(`.xqnr_tit h2`).text().trim()),
                        (t.author = e(`.xqnr_tit span`).eq(1).text().trim().replace(`编辑：`, ``) || `山东大学计算机科学与技术学院`),
                        e(`.xqnr_tit`).remove(),
                        (t.description = e(`form[name=_newscontent_fromname]`).html()),
                        t
                    );
                })
            )
        )),
        { title: `山东大学计算机科学与技术学院${s[l]}`, description: d(`title`).text(), link: u, item: f }
    );
}
export { c as route };
