import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const t = { path: `/hacs/repositories`, name: `HACS Repositories`, maintainers: [`DIYgod`], categories: [`program-update`], example: `/home-assistant/hacs/repositories`, handler: n };
async function n() {
    return {
        title: `HACS Repositories`,
        link: `https://www.hacs.xyz/`,
        item: (
            await Promise.all(
                [`appdaemon`, `critical`, `integration`, `theme`, `python_script`, `plugin`].map(async (t) => {
                    let n = await e(`https://data-v2.hacs.xyz/${t}/data.json`);
                    return Object.values(n);
                })
            )
        )
            .flat()
            .map((e) => ({
                title: e.manifest_name || e.manifest?.name || e.full_name,
                description: `${e.domain ? `<img src="https://brands.home-assistant.io/_/${e.domain}/icon.png" />` : ``}<br>${e.description}<br><br>Last updated: ${e.last_updated}<br>Stars: ${e.stargazers_count}<br>Topics: ${e.topics?.join(`, `)}`,
                link: `https://github.com/${e.full_name}`,
                guid: e.domain || e.full_name,
                tags: e.topics,
                pubDate: new Date(e.last_fetched * 1e3),
            })),
    };
}
export { t as route };
