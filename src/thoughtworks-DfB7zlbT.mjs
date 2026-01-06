import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = { path: `/blog`, categories: [`programming`], example: `/thoughtworks/blog`, radar: [{ source: [`www.thoughtworks.com/zh-cn/insights/blog`] }], name: `Inside Blog`, maintainers: [`Hyvi`], handler: r };
async function r() {
    return {
        title: `ThoughtWorks Blog`,
        link: `https://www.thoughtworks.com/zh-cn/insights/blog`,
        item: (
            await e(`https://platform-eu.cloud.coveo.com/rest/search/v2?organizationId=thoughtworksproductionhcqoag0q`, {
                method: `POST`,
                headers: {
                    authorization:
                        `Bearer ` +
                        (await e(`https://www.thoughtworks.com/rest/search/config`, { headers: { 'content-type': `application/json`, origin: `https://www.thoughtworks.com`, referer: `https://www.thoughtworks.com/` } }))
                            .BLOG_SEARCH_TOKEN,
                    'content-type': `application/json`,
                    origin: `https://www.thoughtworks.com`,
                    referer: `https://www.thoughtworks.com/`,
                },
                body: {
                    context: { countryLocale: `zh-cn` },
                    fieldsToInclude: [`author`, `language`, `objecttype`, `collection`, `source`, `tw_content_type`, `tw_topic`, `tw_published_date`],
                    sortCriteria: `@tw_published_date descending`,
                    numberOfResults: 10,
                    firstResult: 0,
                },
            })
        ).results.map((e) => ({ title: e.title, link: e.uri, description: e.excerpt, pubDate: t(e.raw.tw_published_date), author: e.raw.sysauthor })),
    };
}
export { n as route };
