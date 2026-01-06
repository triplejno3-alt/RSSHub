import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import t from 'currency-symbol-map';
const n = {
    path: `/price/:country/:type/:id`,
    categories: [`program-update`],
    example: `/appstore/price/us/mac/id1152443474`,
    parameters: {
        country: 'App Store Country, obtain from the app URL https://apps.apple.com/us/app/id1152443474, in this case, `us`',
        type: 'App type，either `iOS` or `mac`',
        id: 'App Store app id, obtain from the app URL https://apps.apple.com/us/app/id1152443474, in this case, `id1152443474`',
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`apps.apple.com/`] }],
    name: `Price Drop`,
    maintainers: [`HenryQW`],
    handler: r,
    url: `apps.apple.com/`,
};
async function r(n) {
    let r = n.req.param(`country`),
        i = n.req.param(`type`).toLowerCase() === `mac` ? `macapps` : `apps`,
        a = n.req.param(`id`).replace(`id`, ``),
        o = await e({
            method: `get`,
            url: `https://buster.cheapcharts.de/v1/DetailData.php?&store=itunes&country=${r}&itemType=${i}&idInStore=${a}`,
            headers: { Referer: `http://www.cheapcharts.info/itunes/${r}/apps/detail-view/${a}` },
        });
    if (!o.data.results) {
        let e = `当前 app 未被收录. Price monitor is not available for this app.`;
        return { title: e, item: [{ title: e }] };
    }
    let s = o.data.results.apps;
    i === `macapps` && (s = o.data.results.macapps);
    let c = [],
        l = `${r === `cn` ? `限免提醒` : `Price watcher`}: ${s.title} for ${i === `macapps` ? `macOS` : `iOS`}`,
        u = `https://apps.apple.com/${r}/app/id${a}`;
    if (s.priceDropIndicator === -1) {
        let e = { title: `${s.title} is now ${t(s.currency)}${s.price} `, description: `<a href="${u}" target="_blank">Go to App Store</a>`, link: u, guid: a + s.priceLastChangeDate };
        c.push(e);
    }
    return { title: l, link: u, item: c, allowEmpty: !0 };
}
export { n as route };
