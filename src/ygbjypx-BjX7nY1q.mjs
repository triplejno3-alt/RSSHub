import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
async function a(a, o, s, c, l, u, d) {
    let f = i((await n(o)).data),
        p = f(c)
            .toArray()
            .map((e) => ((e = f(e)), { title: e.find(u).text(), link: s + e.find(l).attr(`href`) }));
    return await Promise.all(
        p.map((a) =>
            e.tryGet(a.link, async () => {
                let e = await n(a.link);
                if (e.redirectUrls.length) ((a.link = e.redirectUrls[0]), (a.description = `该通知无法直接预览，请点击原文链接↑查看`));
                else {
                    let n = i(e.data);
                    ((a.title = n(d.title).text()),
                        (a.description = n(d.content)
                            .html()
                            .replaceAll(`src="/`, `src="${new URL(`.`, s).href}`)
                            .replaceAll(`href="/`, `href="${new URL(`.`, s).href}`)
                            .trim()));
                    let o = n(d.date)
                        .text()
                        .match(/(\d{4}-\d{2}-\d{2})/)[1];
                    a.pubDate = r(t(o, `YYYY-MM-DD`), 8);
                }
                return a;
            })
        )
    );
}
const o = `https://njglyy.com/ygb/jypx/jypx.aspx`,
    s = {
        path: `/ygbjypx`,
        categories: [`government`],
        example: `/njglyy/ygbjypx`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`njglyy.com/ygb/jypx/jypx.aspx`, `njglyy.com/`] }],
        name: `员工版教育培训`,
        maintainers: [`real-jiakai`],
        handler: c,
        url: `njglyy.com/ygb/jypx/jypx.aspx`,
    };
async function c(e) {
    return { title: `南京鼓楼医院 -- 员工版教育培训`, link: o, item: await a(e, o, `https://njglyy.com/ygb/jypx/`, `.mtbd-list > dl`, `a`, `dt`, { title: `.detail`, content: `.detail2`, date: `span:contains("发布时间")` }) };
}
export { s as route };
