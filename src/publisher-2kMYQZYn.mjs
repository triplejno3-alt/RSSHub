import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { n as t, r as n, t as r } from './utils-Bn7klLSd.mjs';
const i = {
    path: `/today/:edition/publisher/:id`,
    categories: [`new-media`],
    example: `/line/today/th/publisher/101048`,
    parameters: { edition: `Edition, see table above`, id: `Channel ID, can be found in URL` },
    radar: [{ source: [`today.line.me/:edition/v2/publisher/:id`] }],
    name: `TODAY - Channel`,
    maintainers: [`TonyRL`],
    handler: a,
};
async function a(i) {
    let { edition: a, id: o } = i.req.param(),
        s = await e(`${r}/webapi/portal/page/setting`, { query: { entityId: o, country: a, pageType: `CP` } }),
        c;
    a === `th` && (c = await e(`${r}/webapi/portal/embedded/page/cplatest`, { query: { entityId: o, pageType: `CP`, country: a } }));
    let l = (a === `th` ? c.modules : s.modules).find((e) => e.source === `CP_LATEST`),
        u = l.listings[0],
        d = await t(
            n(
                (
                    await e(`${r}/webapi/trending/cp/latest/listings/${l.id}`, {
                        query: { offset: u.offset, length: u.length, country: a, targetContent: u.params?.targetContent, cps: u.params?.cps, publishedWithin: u.params?.publishedWithin },
                    })
                ).items
            )
        );
    return { title: `${s.data.name} - Line Today`, description: s.data.introduction, image: s.data.icon ? `https://obs.line-scdn.net/${s.data.icon.hash}` : void 0, link: `${r}/${a}/v2/publisher/${o}`, item: d };
}
export { i as route };
