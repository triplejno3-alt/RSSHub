import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
const r = {
    path: `/:id`,
    categories: [`multimedia`],
    view: n.Audios,
    example: `/ajmide/10603594`,
    parameters: { id: `播客 id，可以从播客页面 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `播客`,
    maintainers: [`Fatpandac`],
    handler: i,
};
async function i(n) {
    let r = n.req.param(`id`),
        i = `https://a.ajmide.com/v3/getBrandContentList.php?brandId=${r}&c=${n.req.param(`limit`) ?? 25}&i=0`,
        a = (await t.get(i)).data.data.filter((e) => !e.contentType),
        o = a.map((t) => ({
            title: t.subject,
            author: t.author_info.nick,
            link: t.shareInfo.link,
            pubDate: e(t.postTime, `YYYY-MM-DD HH:mm:ss`),
            itunes_item_image: t.brandImgPath,
            enclosure_url: t.audioAttach[0].liveUrl,
            itunes_duration: t.audioAttach[0].audioTime,
            enclosure_type: `audio/x-m4a`,
        }));
    return { title: a[0].brandName, link: `https://m.ajmide.com/m/brand?id=${r}`, itunes_author: a[0].author_info.nick, image: a[0].brandImgPath, item: o };
}
export { r as route };
