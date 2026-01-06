import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { decode as n } from 'entities';
const r = {
    path: `/news/:lang`,
    categories: [`university`],
    example: `/isct/news/ja`,
    parameters: { lang: `language, could be ja or en` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.isct.ac.jp/:lang/news`], target: `/news/:lang` }],
    name: `News`,
    maintainers: [`catyyy`],
    handler: async (r) => {
        let { lang: i = `ja` } = r.req.param(),
            a = await e(`https://www.isct.ac.jp/expansion/get_media_list_json.php?lang_cd=${i}`),
            o = await e(`https://www.isct.ac.jp/expansion/get_tag_list_json.php?lang_cd=${i}`),
            s = JSON.parse(n(a)),
            c = JSON.parse(n(o)),
            l = Object.values(s),
            u = Object.values(c),
            d = {};
        for (let e of Object.values(u)) d[e.TAG_ID] = e.TAG_NAME;
        let f = l.map((e) => ({ title: e.TITLE, link: `news/` + e.MEDIA_CD, description: e.META_DESCRIPTION, pubDate: t(e.PUBLISH_DATE), category: e.MEDIA_TYPES ? [d[Number.parseInt(e.MEDIA_TYPES.replaceAll(`"`, ``), 10)]] : [] }));
        return { title: `ISCT News - ${i}`, link: `https://www.isct.ac.jp/${i}/news`, item: f };
    },
};
export { r as route };
