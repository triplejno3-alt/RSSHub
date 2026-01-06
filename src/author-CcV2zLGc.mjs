import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { n as e } from './puppeteer-BbZGb8cd.mjs';
import { n as t, t as n } from './utils-Cm4ljMif.mjs';
const r = {
    path: `/author/:channel`,
    categories: [`traditional-media`],
    example: `/cw/author/57`,
    parameters: { channel: `作者 ID，可在 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cw.com.tw/author/:channel`] }],
    name: `作者`,
    maintainers: [`TonyRL`],
    handler: i,
};
async function i(r) {
    let i = await e(),
        { $: a, items: o } = await t(`author`, i, r);
    return (
        await i.close(),
        {
            title: a(`head title`).text(),
            description: a(`.authorTxt`).text(),
            link: `${n}/author/${r.req.param(`channel`)}`,
            image: a(`.authorPhoto img`).attr(`src`) || `${n}/assets_new/img/fbshare.jpg'`,
            language: a(`meta[property="og:locale"]`).attr(`content`),
            item: o,
        }
    );
}
export { r as route };
