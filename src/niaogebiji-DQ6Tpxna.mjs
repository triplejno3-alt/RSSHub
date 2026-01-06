import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/`, radar: [{ source: [`niaogebiji.com/`, `niaogebiji.com/bulletin`], target: `` }], name: `Unknown`, maintainers: [`WenryXu`], handler: a, url: `niaogebiji.com/` };
async function a() {
    let i = `https://www.niaogebiji.com`,
        { data: a } = await n(`${i}/pc/index/getMoreArticle`);
    if (a.return_code !== `200`) throw Error(a.return_msg);
    let o = a.return_data.map((e) => ({
        title: e.title,
        description: e.summary,
        author: e.author,
        pubDate: t(e.published_at, `X`),
        updated: t(e.updated_at, `X`),
        category: [e.catname, ...e.tag_list],
        link: new URL(e.link, i).href,
    }));
    return {
        title: `鸟哥笔记`,
        link: i,
        item: await Promise.all(
            o.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = r(e)(`.pc_content`).html()), t);
                })
            )
        ),
    };
}
export { i as route };
