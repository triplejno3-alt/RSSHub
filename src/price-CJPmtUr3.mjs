import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './md5-DQN6cWFb.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { path: `/:path{.+}`, name: `Unknown`, maintainers: [], handler: i };
async function i(r) {
    let i = `http://www.qiyoujiage.com/${r.req.param(`path`)}.shtml`,
        { data: a } = await t(i),
        o = n(a),
        s = o(`#youjia`).text(),
        c = [{ title: s, description: o(`#youjia`).html(), link: i, guid: `${i}#${e(s)}` }];
    return { title: o(`title`).text(), description: o(`meta[name="Description"]`).attr(`content`), link: i, item: c };
}
export { r as route };
