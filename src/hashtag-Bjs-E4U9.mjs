import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { n as i } from './puppeteer-BbZGb8cd.mjs';
import { n as a, t as o } from './readable-social--hCfpJhv.mjs';
import { i as s, n as c, r as l, t as u } from './utils-Bohv02os.mjs';
const d = {
    path: `/hashtag/:cid/:routeParams?`,
    categories: [`social-media`],
    example: `/douyin/hashtag/1592824105719812`,
    parameters: { cid: `标签 ID，可在标签页面 URL 中找到`, routeParams: `额外参数，query string 格式，请参阅上面的表格` },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`douyin.com/hashtag/:cid`], target: `/hashtag/:cid` }],
    name: `标签`,
    maintainers: [`TonyRL`],
    handler: f,
};
async function f(d) {
    let f = d.req.param(`cid`);
    if (Number.isNaN(f)) throw new r(`Invalid tag ID. Tag ID should be a number.`);
    let p = Object.fromEntries(new URLSearchParams(d.req.param(`routeParams`))),
        m = o(void 0, a(p.embed), !1),
        h = o(void 0, a(p.iframe), !1),
        g = l(p.relay, !0, !0),
        _ = `https://www.douyin.com/hashtag/${f}`,
        v = await t.tryGet(
            `douyin:hashtag:${f}`,
            async () => {
                let e = await i(),
                    t = await e.newPage();
                await t.setRequestInterception(!0);
                let n = ``;
                (t.on(`request`, (e) => {
                    e.resourceType() === `document` || e.resourceType() === `script` || e.resourceType() === `xhr` ? e.continue() : e.abort();
                }),
                    t.on(`response`, async (e) => {
                        e.request().url().includes(`/v1/web/challenge/aweme`) && (n = await e.json());
                    }),
                    await t.goto(_, { waitUntil: `networkidle2` }),
                    await t.waitForSelector(`#RENDER_DATA`));
                let r = await t.evaluate(() => document.querySelector(`#RENDER_DATA`).textContent);
                await e.close();
                let a = JSON.parse(decodeURIComponent(r)),
                    o = Object.keys(a).find((e) => a[e].topicDetail);
                return ((a[o].defaultData = n.aweme_list), a[o]);
            },
            e.cache.routeExpire,
            !1
        ),
        y = v.topicDetail,
        b = y.chaName,
        x = u(y.hashtagProfile),
        S = v.defaultData.map((e) => {
            let t = e.video && e.video.bit_rate && e.video.bit_rate.map((e) => l(e.play_addr.url_list[0]));
            g && (t = t.map((e) => c(e, g)));
            let r = e.video && e.video.duration;
            r &&= r / 1e3;
            let i;
            ((i ||= e.video && e.video.origin_cover && e.video.origin_cover.url_list.at(-1)), (i &&= l(i)));
            let a =
                    e.desc &&
                    e.desc.replaceAll(
                        `
`,
                        `<br>`
                    ),
                o = (m && t ? s.embed : s.cover)({ img: i, videoList: t, duration: r });
            o = m && t && h ? s.iframe({ content: o }) : o;
            let u = s.desc({ desc: a, media: o });
            return { title: e.desc, description: u, link: `https://www.douyin.com/video/${e.aweme_id}`, pubDate: n(e.create_time, `X`), category: e.text_extra.map((e) => e.hashtag_name), author: e.author.nickname };
        });
    return { title: b, description: `${y.viewCount} 次播放`, image: x, link: _, item: S };
}
export { d as route };
