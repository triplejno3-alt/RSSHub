import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { a as t, i as n, n as r, r as i, t as a } from './utils-D8aO0FBr.mjs';
const o = {
        path: `/news/tag/:tagId`,
        parameters: { tagId: `标签 ID` },
        categories: t.categories,
        example: `/foodtalks/news/tag/13335`,
        radar: [{ source: [`www.foodtalks.cn/news/tag/:tagId`] }],
        name: `标签`,
        maintainers: [`TonyRL`],
        handler: c,
        url: `www.foodtalks.cn`,
    },
    s = async (t) => {
        let n = await e(`${a}/basic/tag/${t}?language=ZH`, { headers: { referer: `${r}/` } });
        if (!n.data) throw Error(`Invalid tagId`);
        return n.data.name;
    };
async function c(o) {
    let { tagId: c } = o.req.param(),
        l = Number.parseInt(o.req.query(`limit`), 10) || 15,
        u = await e(`${a}/news/news/page`, { headers: { referer: `${r}/` }, query: { current: 1, size: l, tagId: c, language: `ZH` } }),
        d = await s(c),
        f = await n(i(u.data.records));
    return { title: `“${d}” 相关资讯-${t.name}`, description: t.description, link: `${r}/news/tag/${c}`, item: f, image: `${r}/favicon.ico` };
}
export { o as route };
