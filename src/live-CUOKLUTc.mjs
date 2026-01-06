import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/live/:lang?`,
    categories: [`finance`],
    example: `/futunn/live`,
    parameters: {
        category: {
            description: `通知语言`,
            default: `Mandarin`,
            options: [
                { label: `国语`, value: `Mandarin` },
                { label: `粵語`, value: `Cantonese` },
                { label: `English`, value: `English` },
            ],
        },
    },
    features: { supportRadar: !0 },
    radar: [
        { source: [`news.futunn.com/main/live`], target: `/live` },
        { source: [`news.futunn.com/hk/main/live`], target: `/live/Cantonese` },
        { source: [`news.futunn.com/en/main/live`], target: `/live/English` },
    ],
    name: `快讯`,
    maintainers: [`kennyfong19931`],
    handler: r,
};
async function r(n) {
    let r = n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`)) : 30,
        i = n.req.param(`lang`) ?? `Mandarin`,
        a = `https://news.futunn.com`,
        o = `${a}/main${i === `Mandarin` ? `` : i === `Cantonese` ? `/hk` : `/en`}/live`,
        s = (await t({ method: `get`, url: `${a}/news-site-api/main/get-flash-list?pageSize=${r}`, headers: { 'x-news-site-lang': i === `Mandarin` ? 0 : i === `Cantonese` ? 1 : 2 } })).data.data.data.news.map((t) => {
            let n = t.audioInfos.find((e) => e.language === i);
            return {
                title: t.title || t.content,
                description: t.content,
                link: t.detailUrl,
                pubDate: e(t.time * 1e3),
                category: t.quote.map((e) => e.name),
                itunes_item_image: t.pic,
                itunes_duration: n.duration,
                enclosure_url: n.audioUrl,
                enclosure_type: `audio/mpeg`,
                media: { content: { url: n.audioUrl, type: `audio/mpeg`, duration: n.duration, language: i === `Mandarin` ? `zh-CN` : i === `Cantonese` ? `zh-HK` : `en` }, thumbnail: { url: t.pic } },
            };
        });
    return {
        title: i === `Mandarin` ? `富途牛牛 - 快讯` : i === `Cantonese` ? `富途牛牛 - 快訊` : `Futubull - Latest`,
        link: o,
        item: s,
        language: i === `Mandarin` ? `zh-CN` : i === `Cantonese` ? `zh-HK` : `en`,
        itunes_author: i === `Mandarin` || i === `Cantonese` ? `富途牛牛` : `Futubull`,
        itunes_category: `News`,
    };
}
export { n as route };
