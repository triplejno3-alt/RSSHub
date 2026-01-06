import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = { path: `/characters`, categories: [`new-media`], example: `/chub/characters`, name: `Characters`, maintainers: [`flameleaf`], handler: r, features: { nsfw: !0 } };
async function r() {
    let n = `https://www.chub.ai/characters`,
        { data: r } = await e(`https://api.chub.ai/search`, {
            headers: { Accept: `application/json` },
            query: {
                search: ``,
                first: 200,
                page: 1,
                sort: `last_activity_at`,
                asc: `false`,
                include_forks: `false`,
                nsfw: `true`,
                nsfl: `true`,
                nsfw_only: `false`,
                require_images: `false`,
                require_example_dialogues: `false`,
                require_alternate_greetings: `false`,
                require_custom_prompt: `false`,
                exclude_mine: `false`,
                min_tokens: 50,
                require_expressions: `false`,
                require_lore: `false`,
                mine_first: `false`,
                require_lore_embedded: `false`,
                require_lore_linked: `false`,
                inclusive_or: `false`,
                recommended_verified: `false`,
            },
        });
    return {
        allowEmpty: !0,
        title: `Chub`,
        link: n,
        item: r.nodes.map((e) => ({
            title: e.name,
            description: `${e.tagline}<br><br>${e.description}`,
            pubDate: t(e.createdAt),
            updated: t(e.lastActivityAt),
            link: `${n}/${e.fullPath}`,
            author: String(e.fullPath.split(`/`, 1)),
            enclosure_url: e.avatar_url,
            enclosure_type: `image/webp`,
            category: e.topics,
        })),
    };
}
export { n as route };
