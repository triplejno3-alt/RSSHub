import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/publications`,
    categories: [`new-media`],
    example: `/disinfo/publications`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`disinfo.eu/`] }],
    name: `Publications`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `disinfo.eu/`,
};
async function a() {
    let i = `https://www.disinfo.eu/publications`,
        a = r((await n({ method: `get`, url: i })).data),
        o = a(`.elementor-heading-title a`)
            .toArray()
            .map((e) => ((e = a(e)), { title: e.text(), link: e.attr(`href`) })),
        s = await Promise.all(
            o.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data);
                    return (
                        e(`.wp-block-spacer`).remove(),
                        e(`.elementor-widget-container p`).eq(0).remove(),
                        e(`img`).each(function () {
                            e(this).attr(`src`, e(this).attr(`data-lazy-src`));
                        }),
                        (i.description = e(`.elementor-widget-theme-post-content`).html()),
                        (i.pubDate = t(e(`meta[property="article:modified_time"]`).attr(`content`))),
                        i
                    );
                })
            )
        );
    return { title: a(`title`).text(), link: i, item: s };
}
export { i as route };
