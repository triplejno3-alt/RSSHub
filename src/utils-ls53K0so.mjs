import { t as e } from './parse-date-DjdQS_Nt.mjs';
const t = `https://matters.town`,
    n = `https://server.matters.town/graphql`,
    r = (n) => ({ title: n.title, description: n.content, link: `${t}/a/${n.shortHash}`, author: n.author.displayName, pubDate: e(n.createdAt), category: n.tags.map((e) => e.content) });
export { n, r, t };
