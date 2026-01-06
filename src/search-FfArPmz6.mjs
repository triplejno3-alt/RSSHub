import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './utils-B93teHVN.mjs';
import { load as n } from 'cheerio';
const r = { path: `/indexers/pianyuan/results/search/api`, radar: [{ source: [`pianyuan.org/`], target: `/index` }], name: `Unknown`, maintainers: [`jerry1119`], handler: i, url: `pianyuan.org/` };
async function i(r) {
    let i = `https://pianyuan.org/`,
        a = `https://pianyuan.org/search?q=${r.originalUrl.split(`&q=`)[1]}`,
        o = n((await t.request(a, e)).data),
        s = o(`.nomt > a`)
            .toArray()
            .map((e) => o(e).attr(`href`));
    if (s.length === 0) throw Error(`pianyuan 搜索失败`);
    let c = [];
    return (
        await Promise.all(
            s.map(async (r) => {
                let a = new URL(r, i).href;
                return await e.tryGet(a, async () => {
                    n((await t.request(a, e)).data)(`.ico.ico_bt`)
                        .toArray()
                        .map((e) => c.push(o(e).attr(`href`)));
                });
            })
        ),
        { title: `片源网`, description: `搜索`, link: i, item: await t.ProcessFeed(c, e) }
    );
}
export { r as route };
