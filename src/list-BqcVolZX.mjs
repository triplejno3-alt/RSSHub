import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `http://sec.hrbeu.edu.cn`,
    a = {
        path: `/sec/:id`,
        categories: [`university`],
        example: `/hrbeu/sec/xshd`,
        parameters: { id: '栏目编号，由 `URL` 中获取。' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`sec.hrbeu.edu.cn/:id/list.htm`] }],
        name: `船舶工程学院`,
        maintainers: [`Chi-hong22`],
        handler: o,
        description: `| 学院要闻 | 学术活动 | 通知公告 | 学科方向 |
| :------: | :------: |:------: | :------: |
|   xyyw   |   xshd   |  229   |   xkfx   |`,
    };
async function o(a) {
    let o = a.req.param(`id`),
        s = r((await n(`${i}/${o}/list.htm`, { headers: { Referer: i } })).data),
        c = s(`div [class=lanmuInnerMiddleBigClass_right]`).find(`div [portletmode=simpleColumnAttri]`).text().replaceAll(/[\s·]/g, ``).trim(),
        l = s(`li.list_item`)
            .toArray()
            .map((e) => {
                let n = s(e).find(`a`).attr(`href`);
                return (n && n.includes(`page.htm`) && (n = `${i}${n}`), { title: s(e).find(`a`).attr(`title`), pubDate: t(s(e).find(`span.Article_PublishDate`).text()), link: n });
            }),
        u = await Promise.all(
            l.map((t) => e.tryGet(t.link, async () => (t.link.includes(`page.htm`) ? (t.description = r((await n(t.link)).data)(`div.wp_articlecontent`).html()) : (t.description = `本文需跳转，请点击标题后阅读`), t)))
        );
    return { title: `船舶工程学院 - ` + c, link: i.concat(`/`, o, `/list.htm`), item: u };
}
export { a as route };
