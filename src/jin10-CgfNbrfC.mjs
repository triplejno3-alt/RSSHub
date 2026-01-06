import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { t as a } from './types-Bl_lnefZ.mjs';
import { t as o } from './description-zue8JPdP.mjs';
const s = {
    path: `/:important?`,
    categories: [`finance`],
    view: a.Notifications,
    example: `/jin10`,
    parameters: { important: `只看重要，任意值开启，留空关闭` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jin10.com/`], target: `` }],
    name: `市场快讯`,
    maintainers: [`laampui`],
    handler: c,
    url: `jin10.com/`,
};
async function c(a) {
    let { important: s = !1 } = a.req.param(),
        c = (
            await t.tryGet(
                `jin10:index`,
                async () => {
                    let { data: e } = await r(`https://flash-api.jin10.com/get_flash_list`, { headers: { 'x-app-id': `bVBF4FyRTn5NJF5n`, 'x-version': `1.0.0` }, searchParams: { channel: `-8200`, vip: `1` } });
                    return e.data.filter((e) => e.type !== 1);
                },
                e.cache.routeExpire,
                !1
            )
        ).map((e) => {
            let t = e.data.content.match(/^【(.*?)】/),
                r,
                a = e.data.content;
            return (
                t ? ((r = t[1]), (a = a.replace(t[0], ``))) : (r = e.data.vip_title || e.data.content),
                { title: r, description: o(a, e.data.pic), pubDate: i(n(e.time), 8), link: e.data.link, guid: `jin10:index:${e.id}`, important: e.important }
            );
        });
    return { title: `金十数据`, link: `https://www.jin10.com/`, item: s ? c.filter((e) => e.important) : c };
}
export { s as route };
