import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { a as n, o as r, r as i } from './utils-D_GlxMfh.mjs';
const a = {
    path: `/news/list/:region/:listId`,
    categories: [`new-media`],
    example: `/yahoo/news/list/hk/09fcf7b0-0ab2-11e8-bf1f-4d52d4f79454`,
    parameters: { region: '`hk`, `tw`', listId: `見下表` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`hk.news.yahoo.com/`] }, { source: [`tw.news.yahoo.com/`] }],
    name: `合作媒體`,
    maintainers: [`TonyRL`, `williamgateszhao`, `tpnonthealps`],
    handler: o,
    description:
        '\n| 合作媒體 (`HK`) | `:listId`                              |\n| ----------------- | ---------------------------------------- |\n| 東方日報          | `33ddd580-0ab3-11e8-bfe1-4b555fb1e429` |\n| now.com           | `01b4d760-0ab4-11e8-af3a-54037d3dced3` |\n| am730             | `c4842090-0ab2-11e8-af7f-041a72ce7398` |\n| BBC               | `4d3fc9a0-fac8-11e9-87f2-564ca250983e` |\n| 信報財經新聞      | `5a8a0aa0-0ab3-11e8-b3dc-d990c79d6cb1` |\n| 香港電台          | `b4bfc2d0-0ab3-11e8-bf9f-c888fc09923f` |\n| 法新社            | `1cc44280-facb-11e9-ad7c-f3ba971275c8` |\n| Bloomberg         | `40023670-facc-11e9-9dde-9175ff306602` |\n| 香港動物報        | `6058fa9c-d74d-487a-8b49-aa99a2a2978e` |',
};
async function o(a) {
    let { region: o, listId: s } = a.req.param();
    if (![`hk`, `tw`].includes(o)) throw new t(`Unsupported region: ${o}`);
    let c = r(o, (await i(o, s)).stream_items),
        l = await Promise.all(c.map((t) => n(t, e.tryGet))),
        u = l[0].author,
        d = u.indexOf(`@`);
    return { title: `Yahoo 新聞 - ${(d === -1 ? u : u.slice(d + 1).trim()) ?? ``}`, link: `https://${o}.news.yahoo.com`, image: `https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png`, item: l };
}
export { a as route };
