import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './md5-DQN6cWFb.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/pages/:id`,
    name: `匿名投稿頁面`,
    url: `www.crush.ninja`,
    maintainers: [`Tsuyumi25`],
    example: `/crush/pages/141719909033861`,
    parameters: { id: { description: '頁面 ID 或代稱，例如 `141719909033861` 或 `awkward87poland`' } },
    radar: [{ source: [`www.crush.ninja/:locale/pages/:id`], target: `/pages/:id` }],
    handler: o,
};
async function o(a) {
    let { id: o } = a.req.param(),
        s = `https://www.crush.ninja/en-us/pages/${o}/`,
        c = i(await e(s)),
        l = c(`meta[property="og:title"]`).attr(`content`) || `CrushNinja - ${o}`,
        u = c(`meta[name="description"]`).attr(`content`) ?? void 0,
        d = c(`meta[property="og:image"]`).attr(`content`) ?? void 0;
    return {
        title: l,
        description: u,
        link: s,
        item: c(`div.rounded-border`)
            .toArray()
            .map((e) => {
                let i = c(e),
                    a = (i.find(`.p-1`).first().text() || ``).trim();
                return { title: a, description: a, pubDate: r(n((i.children(`div`).last().text() || ``).trim().replace(`Published at: `, ``)), 0), guid: `${s}#${t(a)}` };
            }),
        image: d,
        allowEmpty: !0,
    };
}
export { a as route };
