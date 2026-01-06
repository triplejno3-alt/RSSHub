import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './logger-_vmdpChp.mjs';
import { t as r } from './cache-DLkCV5c7.mjs';
import { t as i } from './parse-date-DjdQS_Nt.mjs';
import { n as a, t as o } from './puppeteer-BbZGb8cd.mjs';
import { t as s } from './captcha-BgQBnnqm.mjs';
import { load as c } from 'cheerio';
const l = (e) => ({
        Accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`,
        'Accept-Encoding': `gzip, deflate, br`,
        'Accept-Language': `en-US,en;q=0.9`,
        'Cache-Control': `no-cache`,
        Connection: `keep-alive`,
        Host: `www.xiaohongshu.com`,
        Pragma: `no-cache`,
        'Sec-Ch-Ua': `"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"`,
        'Sec-Ch-Ua-Mobile': `?0`,
        'Sec-Ch-Ua-Platform': `"Windows"`,
        'Sec-Fetch-Dest': `document`,
        'Sec-Fetch-Mode': `navigate`,
        'Sec-Fetch-Site': `none`,
        'Sec-Fetch-User': `?1`,
        'Upgrade-Insecure-Requests': `1`,
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
        ...(e ? { Cookie: e } : {}),
    }),
    u = (e, r) =>
        r.tryGet(
            e,
            async () => {
                let { page: t, destory: r } = await o(e, {
                    onBeforeLoad: async (e) => {
                        (await e.setRequestInterception(!0),
                            e.on(`request`, (e) => {
                                e.resourceType() === `document` || e.resourceType() === `script` || e.resourceType() === `xhr` || e.resourceType() === `other` ? e.continue() : e.abort();
                            }));
                    },
                });
                try {
                    let r = ``;
                    if ((n.http(`Requesting ${e}`), await t.goto(e, { waitUntil: `domcontentloaded` }), await t.waitForSelector(`div.reds-tab-item:nth-child(2), #red-captcha`), await t.$(`#red-captcha`)))
                        throw new s(`小红书风控校验，请稍后再试`);
                    let i = await t.evaluate(() => window.__INITIAL_STATE__);
                    if (!(await t.$(`.lock-icon`))) {
                        await t.click(`div.reds-tab-item:nth-child(2)`);
                        try {
                            r = await (
                                await t.waitForResponse(
                                    (e) => {
                                        let t = e.request();
                                        return t.url().includes(`/api/sns/web/v2/note/collect/page`) && t.method() === `GET` && t.resourceType() === `xhr`;
                                    },
                                    { timeout: 5e3 }
                                )
                            ).json();
                        } catch {}
                    }
                    let { userPageData: a, notes: o } = i.user;
                    return ((a = a._rawValue || a), (o = o._rawValue || o), { userPageData: a, notes: o, collect: r });
                } finally {
                    await r();
                }
            },
            t.cache.routeExpire,
            !1
        ),
    d = (e, r) =>
        r.tryGet(
            e,
            async () => {
                let t = await a();
                try {
                    let r = await t.newPage();
                    return (
                        await r.setRequestInterception(!0),
                        r.on(`request`, (e) => {
                            e.resourceType() === `document` || e.resourceType() === `script` || e.resourceType() === `xhr` ? e.continue() : e.abort();
                        }),
                        n.http(`Requesting ${e}`),
                        await r.goto(e),
                        await r.waitForSelector(`.pc-container`),
                        (await r.evaluate(() => window.__INITIAL_SSR_STATE__)).Main
                    );
                } finally {
                    await t.close();
                }
            },
            t.cache.routeExpire,
            !1
        );
async function f(e, t, n) {
    let r = [],
        i = e.flatMap((e) =>
            e.map(async ({ noteCard: e, id: r }) => {
                let i = `${t}/${r}`,
                    a = `${t}/${e.noteId}`,
                    { title: o, description: s, pubDate: c, updated: l } = await p(i, n);
                return { title: o, link: i, description: s, author: e.user.nickName, guid: a, pubDate: c, updated: l };
            })
        );
    return (r.push(...(await Promise.all(i))), r);
}
async function p(n, a) {
    return await r.tryGet(n, async () => {
        let r = h(c(await e(n, { headers: l(t.xiaohongshu.cookie) }))),
            o = JSON.parse(r),
            s = o.note.noteDetailMap[o.note.firstNoteId].note,
            u = s.title,
            d = s.desc;
        ((d = d.replaceAll(/\[.*?\]/g, ``)),
            (d = d.replaceAll(/#(.*?)#/g, `#$1`)),
            (d = d.replaceAll(
                `
`,
                `<br>`
            )));
        let f = i(s.time, `x`),
            p = i(s.lastUpdateTime, `x`),
            m = ``;
        if (s.type === `video`) {
            let e = s.video?.consumer?.originVideoKey,
                t = [];
            e && t.push(`http://sns-video-al.xhscdn.com/${e}`);
            for (let e of [`av1`, `h264`, `h265`, `h266`]) {
                let n = s.video?.media?.stream?.[e];
                if (n?.length > 0) {
                    let e = n[0];
                    (e.masterUrl && t.push(e.masterUrl), e.backupUrls?.length && t.push(...e.backupUrls));
                }
            }
            let n = s.imageList?.[0]?.urlDefault;
            t.length > 0 &&
                (m = `<video controls ${n ? `poster="${n}"` : ``}>
                    ${t.map((e) => `<source src="${e}" type="video/mp4">`).join(`
`)}
                </video><br>`);
        } else
            m = s.imageList
                .map((e) => {
                    if (e.livePhoto && a) {
                        let t = [];
                        for (let n of [`av1`, `h264`, `h265`, `h266`]) {
                            let r = e.stream?.[n];
                            r?.length > 0 && (r[0].masterUrl && t.push(r[0].masterUrl), r[0].backupUrls?.length && t.push(...r[0].backupUrls));
                        }
                        if (t.length > 0)
                            return `<video controls poster="${e.urlDefault}">
                            ${t.map((e) => `<source src="${e}" type="video/mp4">`).join(`
`)}
                        </video>`;
                    }
                    return `<img src="${e.urlDefault}">`;
                })
                .join(`<br>`);
        let g = `${m}<br>${d}`;
        return { title: u || s.desc, description: g, pubDate: f, updated: p };
    });
}
async function m(n) {
    let r = t.xiaohongshu.cookie,
        i = c(await e(n, { headers: l(r) })),
        a = i(`#userPostedFeeds > section > div > a.cover.ld.mask`).map((e, t) => t.attributes[3].value),
        o = h(i),
        s = JSON.parse(o),
        u = 0;
    for (let e of s.user.notes.flat()) {
        let t = a[u];
        (t && t.includes(`?`) && (e.id += t?.slice(t.indexOf(`?`))), (u += 1));
    }
    return s.user;
}
function h(e) {
    let t = e(`script`)
        .filter((e, t) => t.children[0]?.data?.startsWith(`window.__INITIAL_STATE__=`))
        .text();
    return ((t = t.slice(25)), (t = t.replaceAll(`undefined`, `null`)), t);
}
async function g() {
    let n = t.xiaohongshu.cookie,
        r = await e(`https://edith.xiaohongshu.com/api/sns/web/v2/user/me`, { headers: l(n) });
    return r.code === 0 && !!r.data.user_id;
}
export { f as a, m as i, d as n, u as r, g as t };
