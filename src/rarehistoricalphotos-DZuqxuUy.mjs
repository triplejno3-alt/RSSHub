import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = `https://rarehistoricalphotos.com`,
    r = { path: `/`, radar: [{ source: [`rarehistoricalphotos.com/`], target: `` }], name: `Unknown`, maintainers: [`TonyRL`], handler: i, url: `rarehistoricalphotos.com/` };
async function i(r) {
    let { data: i } = await t(`${n}/wp-json/wp/v2/posts`, { searchParams: { per_page: r.req.query(`limit`) ? Number(r.req.query(`limit`)) : void 0 } });
    return {
        title: `Rare Historical Photos`,
        description: `And the story behind them...`,
        link: n,
        image: `https://rarehistoricalphotos.com/wp-content/uploads/2022/04/cropped-rarehistoricalphotos-32x32.png`,
        language: `en-US`,
        item: i.map((t) => ({ title: t.title.rendered, description: t.content.rendered, link: t.link, pubDate: e(t.date_gmt) })),
    };
}
export { r as route };
