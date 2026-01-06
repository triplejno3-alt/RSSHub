import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { a as n, n as r, r as i, t as a } from './utils-nGmSsbvy.mjs';
const o = {
    path: `/user/:id/livestream`,
    categories: [`multimedia`],
    example: `/otobanana/user/cee16401-96b1-420f-8188-abd4d33093f1/livestream`,
    parameters: { id: `User ID, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`otobanana.com/user/:id/livestream`, `otobanana.com/user/:id`] }],
    name: `Livestream ライブ配信`,
    maintainers: [`TonyRL`],
    handler: s,
};
async function s(o) {
    let s = o.req.param(`id`),
        c = await i(s, e.tryGet),
        { data: l } = await t(`${a}/users/${s}/livestreams/`),
        u = l.results.map((e) => n(e));
    return (
        o.set(`json`, { userInfo: c, liveData: l }),
        {
            title: `${c.name} (@${c.username}) - ライブ配信 | OTOBANANA`,
            description: c.bio.replaceAll(
                `
`,
                ` `
            ),
            link: `${r}/user/${s}`,
            image: c.avatar_url,
            icon: c.avatar_url,
            logo: c.avatar_url,
            language: `ja`,
            author: c.name,
            itunes_author: c.name,
            item: u,
        }
    );
}
export { o as route };
