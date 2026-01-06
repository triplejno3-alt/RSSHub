import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './md5-DQN6cWFb.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './got-CKQ7C9HX.mjs';
import { t as a } from './types-Bl_lnefZ.mjs';
import { Fragment as o, jsx as s } from 'hono/jsx/jsx-runtime';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = (e) => {
        let t = ``,
            n = () => {
                let e = Math.floor(62 * Math.random());
                return e < 10 ? e : e < 36 ? String.fromCharCode(e + 55) : String.fromCharCode(e + 61);
            };
        for (; t.length < e; ) t += n();
        return `h5_${t}`;
    },
    u = (e) => {
        let t = new URLSearchParams(e);
        return (t.sort(), n(`${t.toString()}_1Ftjv0bfpVmqbE38`));
    },
    d = (e) => c(s(o, { children: e ? s(`audio`, { controls: !0, children: s(`source`, { src: e }) }) : null })),
    f = {
        path: `/program/:programId`,
        categories: [`multimedia`],
        view: a.Audios,
        example: `/tingtingfm/program/M7VJv6Jj4R`,
        parameters: { programId: `节目 ID，可以在 URL 中找到` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
        radar: [{ source: [`mobile.tingtingfm.com/v3/program/:programId`] }],
        name: `节目`,
        maintainers: [`TonyRL`],
        handler: p,
    };
async function p(n) {
    let a = n.req.param(`programId`),
        o = `https://api-v3.tingtingfm.com`,
        s = `https://mobile.tingtingfm.com`,
        c = { version: `h5_5.16`, client: l(30), h_program_id: a },
        f = await t.tryGet(`tingtingfm:program:${a}`, async () => {
            let { data: e } = await i.post(`${o}//broadcast/get_program_v3_8`, { searchParams: { ...c, api_sign: u(c) } });
            if (e.errno !== 0) throw Error(e.error);
            return e.data.info;
        }),
        p = await t.tryGet(
            `tingtingfm:audio_list:${a}`,
            async () => {
                let { data: e } = await i.post(`${o}//broadcast/get_program_audio_list`, { searchParams: { ...c, api_sign: u(c) } });
                if (e.errno !== 0) throw Error(e.error);
                return e.data[0];
            },
            e.cache.routeExpire,
            !1
        ),
        { radioCover: m, list: h } = await t.tryGet(
            `tingtingfm:play_audio:${a}`,
            async () => {
                let e = { ...Object.fromEntries(Object.entries(c).filter(([e]) => e !== `h_program_id`)), type: ``, sort: `-1`, audio_id: p.h_audio_id },
                    { data: t } = await i.post(`${o}//albumaudio/play_audio`, { searchParams: { ...e, api_sign: u(e) } });
                if (t.errno !== 0) throw Error(t.error);
                return { radioCover: t.data.info.radio_cover, list: t.data.list };
            },
            e.cache.routeExpire,
            !1
        ),
        g = h.map((e) => ({
            title: e.title,
            link: `${s}/v3/vod/2/${e.h_audio_id}`,
            description: d(e.play_url),
            pubDate: r(e.add_time, `X`),
            itunes_item_image: m,
            itunes_duration: e.duration,
            enclosure_url: e.play_url,
            enclosure_type: `audio/x-m4a`,
        }));
    return {
        title: `${f.title} - ${f.belong_radio}${f.belong_fm}`,
        description: f.description,
        link: `${s}/v3/program/${a}`,
        image: f.cover.split(`?x-oss`)[0],
        itunes_author: f.anchor.join(`, `),
        itunes_category: f.category,
        itunes_explicit: !1,
        item: g,
    };
}
export { f as route };
