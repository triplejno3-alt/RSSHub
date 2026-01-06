import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { t as a } from './config-not-found-DGyG6Tbz.mjs';
import { t as o } from './common-utils-Bi4U68D5.mjs';
import { IgApiClient as s } from 'instagram-private-api';
const c = new s();
async function l(n, r) {
    if (!e.instagram || !e.instagram.username || !e.instagram.password) throw new a(`Instagram RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let i = `instagram:login`,
        { username: o, password: s } = e.instagram,
        c = await r.get(i);
    (c ? n.state.deserialize(c) : (n.state.generateDevice(o), await n.account.login(o, s), process.nextTick(() => n.simulate.postLoginFlow()), t.debug(`Instagram login success.`)),
        n.request.end$.subscribe(async () => {
            let e = await n.state.serialize();
            (delete e.constants, await r.set(i, e, 12e5));
        }));
}
async function u(t, n, r) {
    let i, a, o, s, l;
    switch (t) {
        case `user`: {
            let t, u, d;
            (Number.isNaN(n)
                ? ((u = n), (d = await r(`instagram:getIdByUsername:${u}`, () => c.user.getIdByUsername(u), 31536e3)), (t = await r(`instagram:userInfo:${d}`, () => c.user.info(d))))
                : ((d = n), (t = await r(`instagram:userInfo:${d}`, () => c.user.info(d))), (u = t.username)),
                (o = t.biography),
                (s = t.profile_pic_url_hd ?? t.hd_profile_pic_url_info?.url ?? t.profile_pic_url),
                (i = `${t.full_name} (@${u}) - Instagram`),
                (a = `https://www.instagram.com/${u}`),
                (l = await r(`instagram:feed:${d}`, () => c.feed.user(d).items(), e.cache.routeExpire, !1)));
            break;
        }
        case `tags`: {
            let t = n;
            ((i = `#${t} - Instagram`), (a = `https://www.instagram.com/explore/tags/${t}`), (l = await r(`instagram:tags:${t}`, () => c.feed.tags(t, `recent`).items(), e.cache.routeExpire, !1)));
            break;
        }
        default:
            break;
    }
    return { feedTitle: i, feedLink: a, feedDescription: o, feedLogo: s, itemsRaw: l };
}
const d = {
    path: `/:category/:key`,
    categories: [`social-media`],
    view: r.SocialMedia,
    example: `/instagram/user/stefaniejoosten`,
    parameters: {
        category: {
            description: `Feed category`,
            default: `user`,
            options: [
                { label: `User`, value: `user` },
                { label: `Tags`, value: `tags` },
            ],
        },
        key: `Username / Hashtag name`,
    },
    features: {
        requireConfig: [
            { name: `IG_PROXY`, optional: !0, description: `` },
            { name: `IG_USERNAME`, description: `Instagram username` },
            {
                name: `IG_PASSWORD`,
                description: `Instagram password, due to [Instagram Private API](https://github.com/dilame/instagram-private-api) restrictions, you have to setup your credentials on the server. 2FA is not supported.`,
            },
        ],
        requirePuppeteer: !1,
        antiCrawler: !0,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `User Profile / Hashtag - Private API`,
    maintainers: [`oppilate`, `DIYgod`],
    handler: f,
};
async function f(r) {
    let a = [`user`, `tags`],
        { category: s, key: d } = r.req.param();
    if (!a.includes(s)) throw new i(`Such feed is not supported.`);
    (e.instagram && e.instagram.proxy && (c.state.proxyUrl = e.instagram.proxy), await l(c, n));
    let f;
    try {
        f = await u(s, d, n.tryGet);
    } catch (e) {
        throw (t.error(`Instagram error: ${e}`), e);
    }
    return {
        title: f.feedTitle,
        link: f.feedLink,
        description: f.feedDescription,
        item: o(f.itemsRaw),
        icon: `https://www.instagram.com/static/images/ico/xxhdpi_launcher.png/99cf3909d459.png`,
        logo: f.feedLogo,
        image: f.feedLogo,
        allowEmpty: !0,
    };
}
export { d as route };
