import { t as e } from './parse-date-DjdQS_Nt.mjs';
const t = `https://inspirehep.net`,
    n = (n) =>
        n.map((n) => ({
            title: n.metadata.titles.map((e) => e.title).join(` `),
            link: `${t}/literature/${n.id}`,
            description: n.metadata.abstracts?.map((e) => `<span>${e.value}</span>`).join(`<br>`),
            pubDate: e(n.created),
            updated: e(n.updated),
            category: n.metadata.keywords?.map((e) => e.value),
            author: n.metadata.authors.map((e) => `${e.first_name} ${e.last_name}${e.affiliations ? ` (${e.affiliations.map((e) => e.value).join(`, `)})` : ``}`).join(`, `),
        }));
export { n, t };
