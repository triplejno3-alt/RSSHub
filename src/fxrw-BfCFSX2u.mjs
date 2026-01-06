import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './description-CyHYUnnG.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/cmse/fxrw`,
    categories: [`government`],
    example: `/gov/cmse/fxrw`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.cmse.gov.cn/fxrw`] }],
    name: `飞行任务`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `www.cmse.gov.cn/fxrw`,
};
async function o() {
    let a = `http://www.cmse.gov.cn/fxrw/`,
        o = i((await t({ method: `get`, url: a })).data),
        s = o(`#list li a`)
            .toArray()
            .map(
                (t) => (
                    (t = o(t)),
                    {
                        title: t.find(`.title`).text().split(`：`).pop().trim(),
                        link: new URL(t.attr(`href`), a).href,
                        pubDate: n(e(t.find(`.infoR`).first().text().trim(), `YYYY年M月D日H时m分`), 8),
                        description: r({ image: new URL(t.find(`img`).attr(`src`), a).href, description: t.find(`.info`).html() }),
                    }
                )
            );
    return { title: o(`title`).text(), link: a, item: s };
}
export { a as route };
