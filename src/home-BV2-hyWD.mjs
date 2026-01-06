import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = { path: `/home`, categories: [`traditional-media`], example: `/dealstreetasia/home`, radar: [{ source: [`dealstreetasia.com/`] }], name: `Home`, maintainers: [`jack2game`], handler: r, url: `dealstreetasia.com/` };
async function r() {
    return await i();
}
async function i() {
    let n = t(await e(`https://dealstreetasia.com/`)),
        r = JSON.parse(n(`#__NEXT_DATA__`).text()).props.pageProps;
    return {
        title: `Deal Street Asia`,
        language: `en`,
        item: [
            ...r.topStories,
            ...r.privateEquity,
            ...r.ventureCapital,
            ...r.unicorns,
            ...r.interviews,
            ...r.deals,
            ...r.analysis,
            ...r.ipos,
            ...r.opinion,
            ...r.policyAndRegulations,
            ...r.people,
            ...r.earningsAndResults,
            ...r.theLpView,
            ...r.dvNewsletters,
            ...r.reports,
        ].map((e) => ({
            title: e.post_title || e.title || `No Title`,
            link: e.post_url || e.link || ``,
            description: e.post_excerpt || e.excerpt || ``,
            pubDate: e.post_date ? new Date(e.post_date).toUTCString() : e.date ? new Date(e.date).toUTCString() : ``,
            category: e.category_link ? e.category_link.replaceAll(/(<([^>]+)>)/gi, ``) : ``,
            image: e.image_url ? e.image_url.replace(/\?.*$/, ``) : ``,
        })),
        link: `https://dealstreetasia.com/`,
    };
}
export { n as route };
