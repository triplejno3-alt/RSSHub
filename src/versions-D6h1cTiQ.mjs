import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import o from 'markdown-it';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = e.create({ headers: { 'user-agent': t.trueUA } }),
    u = o({ html: !0 }),
    d = (e) =>
        s(
            a(r, {
                children: [
                    a(`p`, { children: [e.name, ` - `, e.version_number] }),
                    a(`p`, { children: [i(`b`, { children: `Loaders: ` }), e.loaders?.map((e) => `${e} `)] }),
                    a(`p`, { children: [i(`b`, { children: `Game Versions: ` }), e.game_versions?.map((e) => `${e} `)] }),
                    e.changelog ? c(e.changelog) : null,
                    i(`p`, { children: `Files:` }),
                    e.files?.map((e) => i(`p`, { children: i(`a`, { href: e.url, children: e.filename }) })),
                ],
            })
        ),
    f = {
        path: `/project/:id/versions/:routeParams?`,
        categories: [`game`],
        example: `/modrinth/project/sodium/versions`,
        parameters: { id: `Id or slug of the Modrinth project`, routeParams: `Extra route params. See the table below for options` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [
                    `modrinth.com/mod/:id/*`,
                    `modrinth.com/plugin/:id/*`,
                    `modrinth.com/datapack/:id/*`,
                    `modrinth.com/shader/:id/*`,
                    `modrinth.com/resourcepack/:id/*`,
                    `modrinth.com/modpack/:id/*`,
                    `modrinth.com/mod/:id`,
                    `modrinth.com/plugin/:id`,
                    `modrinth.com/datapack/:id`,
                    `modrinth.com/shader/:id`,
                    `modrinth.com/resourcepack/:id`,
                    `modrinth.com/modpack/:id`,
                ],
                target: `/project/:id/versions`,
            },
        ],
        name: `Project versions`,
        maintainers: [`SettingDust`],
        handler: p,
        description: `| Name           | Example                                      |
| -------------- | -------------------------------------------- |
| loaders        | loaders=fabric&loaders=quilt&loaders=forge |
| game_versions | game_versions=1.20.1&game_versions=1.20.2 |
| featured       | featured=true                                |`,
    };
async function p(e) {
    let { id: t, routeParams: r } = e.req.param(),
        i = new URLSearchParams(r);
    try {
        let e = await l(`https://api.modrinth.com/v2/project/${t}`),
            r = await l(`https://api.modrinth.com/v2/project/${t}/version`, {
                query: { loaders: i.has(`loaders`) ? JSON.stringify(i.getAll(`loaders`)) : ``, game_versions: i.has(`game_versions`) ? JSON.stringify(i.getAll(`game_versions`)) : `` },
            }),
            a = await l(`https://api.modrinth.com/v2/users`, { query: { ids: JSON.stringify([...new Set(r.map((e) => e.author_id))]) } }),
            o = {};
        for (let e of a) o[e.id] = e;
        return {
            title: `${e.title} Modrinth versions`,
            description: e.description,
            link: `https://modrinth.com/project/${t}`,
            item: r.map((e) => ({
                title: `${e.name} for ${e.loaders.join(`/`)} on ${[...new Set([e.game_versions[0], e.game_versions.at(-1)])].join(`-`)}`,
                link: `https://modrinth.com/project/${t}/version/${e.version_number}`,
                pubDate: n(e.date_published),
                description: d({ ...e, changelog: u.render(e.changelog) }),
                guid: e.id,
                author: o[e.author_id].username,
            })),
        };
    } catch (e) {
        throw e?.response?.statusCode === 404 ? Error(`${e.message}: Project ${t} not found`) : e;
    }
}
export { f as route };
