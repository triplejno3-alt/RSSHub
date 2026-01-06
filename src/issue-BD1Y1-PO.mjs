import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/:channel?`,
    categories: [`traditional-media`],
    example: `/ekantipur/news`,
    parameters: { channel: `Find it in the ekantipur.com menu or pick from the list below:` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ekantipur.com/:channel`], target: `/:channel` }],
    name: `Full Article RSS`,
    maintainers: [`maniche04`],
    handler: i,
    description: `Channels:

| समाचार | अर्थ / वाणिज्य | विचार     | खेलकुद   | उपत्यका     | मनोरञ्जन         | फोटोफिचर          | फिचर     | विश्व    | ब्लग   |
| ---- | -------- | ------- | ------ | -------- | ------------- | -------------- | ------- | ----- | ---- |
| news | business | opinion | sports | national | entertainment | photo_feature | feature | world | blog |`,
};
async function i(r) {
    let i = `https://ekantipur.com`,
        { channel: a = `news` } = r.req.param(),
        { data: o } = await t(`${i}/${a}`),
        s = n(o),
        c = s(`article.normal`)
            .toArray()
            .map((e) => {
                e = s(e);
                let t = e.find(`a`).first();
                return { title: t.text(), link: `${i}${t.attr(`href`)}`, author: e.find(`div.author`).text(), category: a };
            }),
        l = await Promise.all(
            c.map((r) =>
                e.tryGet(r.link, async () => {
                    let { data: e } = await t(r.link),
                        i = n(e);
                    return (i(`a.static-sponsor`).remove(), i(`div.ekans-wrapper`).remove(), (r.title = i(`h1.eng-text-heading`).text()), (r.description = i(`div.current-news-block`).first().html()), r);
                })
            )
        );
    return { title: `Ekantipur - ${a}`, link: `${i}/${a}`, item: l };
}
export { r as route };
