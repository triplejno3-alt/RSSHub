import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/section/:section`,
    categories: [`traditional-media`],
    example: `/dealstreetasia/section/private-equity`,
    parameters: { section: `target section` },
    radar: [{ source: [`dealstreetasia.com/`] }],
    name: `Section`,
    maintainers: [`jack2game`],
    handler: r,
    url: `dealstreetasia.com/`,
};
async function r(e) {
    return await i(e.req.param(`section`));
}
async function i(n) {
    let r = t(await e(`https://dealstreetasia.com/section/${n}/`)),
        i = JSON.parse(r(`#__NEXT_DATA__`).text()),
        a = i.props.pageProps.sectionData.name,
        o = i.props.pageProps.sectionData.stories.nodes.map((e) => ({
            title: e.title || `No Title`,
            link: e.uri ? `https://www.dealstreetasia.com${e.uri}` : ``,
            description: e.excerpt || ``,
            pubDate: e.post_date ? new Date(e.post_date).toUTCString() : ``,
            category: e.sections.nodes.map((e) => e.name),
            image: e.featuredImage?.node?.mediaItemUrl.replace(/\?.*$/, ``),
        }));
    return { title: `Deal Street Asia - ` + a, language: `en`, item: o, link: `https://dealstreetasia.com/section/` + n + `/` };
}
export { n as route };
