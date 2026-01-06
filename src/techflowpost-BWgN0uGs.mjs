import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = { path: `/`, example: `/techflowpost`, radar: [{ source: [`techflowpost.com/`] }], name: `首页`, categories: [`finance`], view: r.Articles, maintainers: [`nczitzk`], handler: a, url: `techflowpost.com/` };
async function a(r) {
    let i = `https://www.techflowpost.com`,
        { data: a } = await t.post(`https://www.techflowpost.com/ashx/index.ashx`, { form: { pageindex: 1, pagesize: r.req.query(`limit`) ?? 50 } });
    return {
        title: `深潮TechFlow`,
        link: i,
        item: a.content.map((t) => ({
            title: t.stitle,
            author: t.sauthor_name,
            link: `${i}/article/detail_${t.narticle_id}.html`,
            category: [t.new_scata_name],
            pubDate: n(e(t.dcreate_time), 8),
            updated: n(e(t.dmodi_time), 8),
            description: t.scontent,
        })),
    };
}
export { i as route };
