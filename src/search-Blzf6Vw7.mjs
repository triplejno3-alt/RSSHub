import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { n as t, r as n, t as r } from './util-DF_VKGsl.mjs';
const i = {
    path: `/search/:keyword/:mode?`,
    example: `/nhentai/search/language%3Ajapanese+-scat+-yaoi+-guro+-"mosaic+censorship"`,
    parameters: {
        keyword: 'Keywords for search. You can copy the content after `q=` after searching on the original website, or you can enter it directly. See the [official website](https://nhentai.net/info/) for details',
        mode: 'mode, `simple` to only show cover, `detail` to show all pages, `torrent` to include Magnet URI, need login, refer to [Route-specific Configurations](https://docs.rsshub.app/deploy/config#route-specific-configurations), default to `simple`',
    },
    features: { antiCrawler: !0, supportBT: !0, nsfw: !0 },
    radar: [{ source: [`nhentai.net/:key/:keyword`], target: `/:key/:keyword` }],
    name: `Advanced Search`,
    maintainers: [`MegrezZhu`, `hoilc`],
    handler: a,
};
async function a(i) {
    let { keyword: a, mode: o } = i.req.param(),
        s = `https://nhentai.net/search/?q=${a}`,
        c = await t(s),
        l = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 5,
        u = c;
    return (o === `detail` ? (u = await r(e, c, l)) : o === `torrent` && (u = await n(e, c, l)), { title: `nhentai - search - ${a}`, link: s, item: u });
}
export { i as route };
