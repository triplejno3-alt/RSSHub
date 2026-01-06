import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/previews/:date?`,
    name: `每月新番`,
    maintainers: [`kjasn`],
    example: `/hanime1/previews/202504`,
    categories: [`anime`],
    parameters: { date: { description: '日期格式为 `YYYYMM`，默认值当月' } },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`hanime1.me/previews/:date`, `hanime1.me/previews`], target: `/previews/:date` }],
    handler: async (r) => {
        let i = `https://hanime1.me`,
            { date: a } = r.req.param();
        if (!a) {
            let e = new Date(),
                t = e.getFullYear(),
                n = e.getMonth() + 1;
            a = `${t}${n >= 10 ? n : `0` + n}`;
        }
        let o = `${i}/previews/${a}`,
            s = n(await e(o, { headers: { referer: i, 'user-agent': t.trueUA } })),
            c = s(`.content-padding .row`)
                .toArray()
                .map((e) => {
                    let t = s(e),
                        n = t.find(`.preview-info-content h4`).first().text().trim(),
                        r = t.find(`.preview-info-cover img`).attr(`src`) || ``,
                        i = t.find(`.preview-info-cover div`).text().trim(),
                        a = t.find(`.trailer-modal-trigger`).attr(`data-target`) || ``,
                        o = (a && s(`${a} video source`).attr(`src`)) || ``;
                    return {
                        title: n,
                        description: `
                    <p>${t.find(`.caption`).first().text().trim()} </p>
                    <p>Tags: [${t
                        .find(`.single-video-tag a`)
                        .toArray()
                        .map((e) => s(e).text().trim())
                        .join(`, `)}]</p>
                    <video controls width="100%" poster="${r}">
                        <source src="${o}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    `,
                        enclosure_url: r,
                        enclosure_type: `image/jpeg`,
                        link: o,
                        guid: `hanime1-${i}-${n}`,
                    };
                });
        return { title: `Hanime1 ${a} 新番`, link: o, item: c };
    },
};
export { r as route };
