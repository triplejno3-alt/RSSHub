import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = `feedback.remnote.com`,
    r = {
        path: `/changelog`,
        categories: [`program-update`],
        example: `/remnote/changelog`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`remnote.com/changelog`, `remnote.com/`] }],
        name: `Changelog`,
        maintainers: [`TonyRL`, `amakerlife`],
        handler: i,
        url: `remnote.com/changelog`,
    };
async function i() {
    let { data: r } = await t(`https://gateway.hellonext.co/api/v2/changelogs`, { headers: { 'x-organization': n }, searchParams: { page: 1, status: `published` } }),
        i = r.map((t) => ({ title: t.title, description: t.description_html, link: `https://${n}/changelog/${t.slug}`, pubDate: e(t.published_at.timestamp) }));
    return {
        title: `Changelog | RemNote`,
        description: `Vote or request new RemNote features. Subscribe to get updates about new features from RemNote.`,
        link: `https://${n}/changelog`,
        image: `https://vault.hnxt.dev/uploads/organization_customization/favicon/3970/88153ff13b4b03492ddfee6e675228c1.png`,
        item: i,
        language: `en-US`,
    };
}
export { r as route };
