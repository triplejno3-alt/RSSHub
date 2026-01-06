import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = { path: `/`, name: `Unknown`, maintainers: [`ruoshui9527`], handler: a };
async function a() {
    let i = `https://onehu.xyz`,
        a = (await t(i)).data,
        o = r(a),
        s = o(`#board article`)
            .toArray()
            .map(
                (t) => (
                    (t = o(t)),
                    {
                        title: t.find(`.index-header`).text(),
                        link: t.find(`.index-header`).children(`a`).attr(`href`),
                        description: t.find(`.index-excerpt.index-excerpt__noimg`).children(`div`).text(),
                        pubDate: n(e(t.find(`.post-meta.mr-3`).children(`time`).attr(`datetime`), `YYYY年MM月DD日 HH:mm`), 8),
                    }
                )
            );
    return { title: o(`title`).text(), link: i, item: s };
}
export { i as route };
