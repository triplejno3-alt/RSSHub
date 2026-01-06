import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t } from './utils-D3R77wdc.mjs';
import { load as n } from 'cheerio';
import r from 'p-map';
const i = {
    path: `/cat/:cat`,
    categories: [`traditional-media`],
    example: `/bjnews/cat/depth`,
    parameters: { cat: `分类, 可从URL中找到` },
    features: {},
    radar: [{ source: [`www.bjnews.com.cn/:cat`] }],
    name: `分类`,
    maintainers: [`dzx-dzx`],
    handler: a,
    url: `www.bjnews.com.cn`,
};
async function a(i) {
    let a = `https://www.bjnews.com.cn/${i.req.param(`cat`)}`,
        o = n(await e(a)),
        s = await r(
            o(`#waterfall-container .pin_demo > a`)
                .toArray()
                .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 15)
                .map((e) => ({ title: o(e).text(), link: o(e).attr(`href`), category: o(e).parent().find(`.source`).text().trim() })),
            (e) => t(e),
            { concurrency: 2 }
        );
    return { title: `新京报 - 分类 - ${o(`.cur`).text().trim()}`, link: a, item: s };
}
export { i as route };
