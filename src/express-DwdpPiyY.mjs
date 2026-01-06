import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import i from 'dayjs';
const a = {
    path: `/express`,
    categories: [`finance`],
    view: r.Articles,
    example: `/techflowpost/express`,
    radar: [{ source: [`techflowpost.com/newsletter/index.html`] }],
    name: `快讯`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `techflowpost.com/`,
};
async function o(r) {
    let a = `https://www.techflowpost.com`,
        o = `${a}/newsletter/index.html`,
        { data: s } = await t.post(`https://www.techflowpost.com/ashx/newflash_index.ashx`, { form: { pageindex: 1, pagesize: r.req.query(`limit`) ?? 50, time: i().format(`YYYY/M/D HH:mm:ss`) } });
    return {
        title: `深潮TechFlow - 快讯`,
        link: o,
        item: s.content.map((t) => ({ title: t.stitle, link: `${a}/newsletter/detail_${t.nnewflash_id}.html`, pubDate: n(e(t.dcreate_time), 8), updated: n(e(t.dmodi_time), 8), description: t.scontent })),
    };
}
export { a as route };
