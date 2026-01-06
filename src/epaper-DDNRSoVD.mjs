import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/epaper/:id?`,
    categories: [`traditional-media`],
    example: `/xmnn/epaper/xmrb`,
    parameters: { id: '报纸 id，见下表，默认为 `xmrb`，即厦门日报' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`epaper.xmnn.cn/:id`], target: `/epaper/:id` }],
    name: `数字媒体`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| 厦门日报 | 厦门晚报 | 海西晨报 | 城市捷报 |
| -------- | -------- | -------- | -------- |
| xmrb     | xmwb     | hxcb     | csjb     |`,
};
async function o(a) {
    let o = a.req.param(`id`) ?? `xmrb`,
        s = `https://epaper.xmnn.cn/${o === `hxcb` ? `/hxcb/epaper/paperindex.htm` : `${o}/`}`,
        c = await n({ method: `get`, url: s }),
        l = i(c.data),
        u = o === `hxcb` ? `海西晨报电子版_厦门网` : l(`title`).text(),
        d = c.data.match(/window\.location\.href = "(.*?)";/);
    (d || ((d = c.data.match(/setTimeout\("javascript:location\.href='(.*?)'", 3000\);/)), (d ||= c.data.match(/<meta http-equiv="refresh".*?content=".*?url=(.*?)">/i))),
        (s = new URL(d[1], s).href),
        (c = await n({ method: `get`, url: s })),
        (l = i(c.data)),
        l(`#pdfsrc`).remove(),
        l(`.bigImg, .smallImg`).remove(),
        l(`a img`).each(function () {
            l(this).parent().remove();
        }));
    let f = l(`.br1, .br2, .titss`)
        .find(`a`)
        .slice(0, a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 80)
        .toArray()
        .map((e) => ((e = l(e)), { title: e.text(), link: new URL(e.attr(`href`), s).href }));
    return (
        (f = await Promise.all(
            f.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return (e(`#qw`).remove(), (a.description = e(`.cont-b, content`).html()), (a.pubDate = r(t(e(`.time`).text() || e(`.today`).text().split()[0], [`YYYY-MM-DD HH:mm`, `YYYY年MM月DD日`]), 8)), a);
                })
            )
        )),
        { title: u, link: s, item: f }
    );
}
export { a as route };
