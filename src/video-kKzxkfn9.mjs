import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './description-A7ochmEt.mjs';
const r = {
    path: `/video`,
    categories: [`finance`],
    example: `/futunn/video`,
    features: { supportRadar: !0 },
    radar: [{ source: [`news.futunn.com/main/video-list`, `news.futunn.com/:lang/main/video-list`], target: `/video` }],
    name: `视频`,
    maintainers: [`kennyfong19931`],
    handler: i,
};
async function i(r) {
    let i = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 50,
        a = `https://news.futunn.com`;
    return {
        title: `富途牛牛 - 视频`,
        link: `${a}/main/video-list`,
        item: (await t({ method: `get`, url: `${a}/news-site-api/main/get-video-list?size=${i}` })).data.data.videoList.list.map((t) => ({
            title: t.title,
            description: n({ abs: t.abstract, pic: t.videoImg }),
            link: t.targetUrl,
            pubDate: e(t.timestamp * 1e3),
        })),
    };
}
export { r as route };
