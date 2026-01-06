import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/:type`,
    categories: [`shopping`],
    example: `/hotukdeals/hot`,
    parameters: { type: `should be one of highlights, hot, new, discussed` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `thread`,
    maintainers: [`DIYgod`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`type`);
    r === `highlights` && (r = ``);
    let i = t((await e.get(`https://www.hotukdeals.com/${r}?page=1&ajax=true&layout=horizontal`, { headers: { Referer: `https://www.hotukdeals.com/${r}` } })).data.data.content),
        a = i(`article.thread`);
    return {
        title: `hotukdeals ${r}`,
        link: `https://www.hotukdeals.com/${r}`,
        item: a
            .toArray()
            .map(
                (e) => (
                    (e = i(e)),
                    {
                        title: e.find(`.cept-tt`).text(),
                        description: `${e.find(`.thread-listImgCell`).html()}<br>${e.find(`.cept-vote-temp`).html()}<br>${e.find(`.overflow--fade`).html()}<br>${e.find(`.threadGrid-body .userHtml`).html()}`,
                        link: e.find(`.cept-tt`).attr(`href`),
                    }
                )
            )
            .toReversed(),
    };
}
export { n as route };
