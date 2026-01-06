import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = {
        path: `/series/:id`,
        categories: [`traditional-media`],
        example: `/tver/series/srx2o7o3c8`,
        parameters: { id: `Series ID (as it appears in URLs). For example, in https://tver.jp/series/srx2o7o3c8, the ID is "srx2o7o3c8".` },
        radar: [{ source: [`tver.jp/series/:id`], target: `/series/:id` }],
        name: `Series`,
        maintainers: [`yuikisaito`],
        handler: a,
    },
    i = { Accept: `*/*`, 'Accept-Language': `ja,en-US;q=0.7,en;q=0.3`, 'Cache-Control': `no-cache`, Pragma: `no-cache`, 'Sec-GPC': `1`, 'Sec-Fetch-Dest': `empty`, 'Sec-Fetch-Mode': `cors`, 'Sec-Fetch-Site': `same-site` };
async function a(r) {
    let { id: a } = r.req.param(),
        { result: o } = await e(`https://platform-api.tver.jp/v2/api/platform_users/browser/create`, {
            method: `POST`,
            body: `device_type=pc`,
            headers: { ...i, 'Content-Type': `application/x-www-form-urlencoded` },
            referer: `https://s.tver.jp/`,
            credentials: `omit`,
            mode: `cors`,
        }),
        { platform_uid: s, platform_token: c } = o,
        { title: l, description: u, broadcastProvider: d } = await e(`https://statics.tver.jp/content/series/${a}.json`, { method: `GET`, headers: { ...i }, referer: `https://tver.jp/`, credentials: `omit`, mode: `cors` }),
        { result: f } = await e(`https://platform-api.tver.jp/service/api/v1/callSeriesEpisodes/${a}?platform_uid=${s}&platform_token=${c}`, {
            method: `GET`,
            headers: { ...i, 'x-tver-platform-type': `web` },
            referer: `https://tver.jp/`,
            credentials: `omit`,
            mode: `cors`,
        }),
        p = (f.contents?.[0]?.contents ?? [])
            .filter((e) => e.type === `episode`)
            .map((e) => {
                let r = n(t(e.content.broadcastDateLabel.replaceAll(/\(.*?\)|放送分/g, ``).trim(), `M月D日`), 9).toDateString();
                return { title: e.content.title, link: `https://tver.jp/episodes/${e.content.id}`, image: `https://statics.tver.jp/images/content/thumbnail/episode/xlarge/${e.content.id}.jpg`, pubDate: r };
            });
    return { title: `TVer - ` + l, description: u, author: d.name, link: `https://tver.jp/series/${a}`, image: `https://statics.tver.jp/images/content/thumbnail/series/xlarge/${a}.jpg`, language: `ja`, item: p };
}
export { r as route };
