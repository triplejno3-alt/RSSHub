import './config-Cc-zZ5p-.mjs';
import { t as e } from './rss-parser-CKuAfhVS.mjs';
const t = { path: `/`, name: `Автомобільний сайт N1 в Україні`, categories: [`new-media`], maintainers: [`driversti`], example: `/autocentre`, handler: r },
    n = (e) => ({ title: e.title, link: e.link, description: e.contentSnippet });
async function r() {
    let t = await e.parseURL(`https://www.autocentre.ua/rss`);
    return { title: t.title, link: t.link, description: t.description, language: `uk`, item: await Promise.all(t.items.map((e) => n(e))) };
}
export { t as route };
