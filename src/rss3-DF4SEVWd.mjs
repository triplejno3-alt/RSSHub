import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { renderItemActionToHTML as t } from '@rss3/sdk';
const n = (e) => e && typeof e == `object`,
    r = (e) => n(e) && Object.prototype.toString.call(e) === `[object Object]` && Object.getPrototypeOf(e) === Object.prototype,
    i = (e) => {
        if (Array.isArray(e)) return e.map((e) => i(e));
        if (r(e)) {
            let t = {};
            for (let n of Object.keys(e)) {
                let r = o(n) ? n : a(n);
                t[r] = i(e[n]);
            }
            return t;
        }
        return e;
    };
function a(e) {
    return e.replace(/^_+/, ``).replaceAll(/([_-][a-z])/gi, (e) => e.toUpperCase().replace(`-`, ``).replace(`_`, ``));
}
const o = (e) => e.length === 24 && /^[\dA-Fa-f]{24}$/.test(e),
    s = {
        path: `/:account/:network?/:tag?`,
        categories: [`social-media`],
        example: `/rss3/vitalik.eth`,
        name: `Account Activities`,
        maintainers: [`DIYgod`, `pseudoyu`],
        url: `docs.rss3.io/api-reference#tag/decentralized/GET/decentralized/%7Baccount%7D`,
        handler: c,
        description: `Retrieve the activities associated with a specified account in the decentralized system.`,
        parameters: {
            account: { description: `Retrieve activities from the specified account. This account is a unique identifier within the decentralized system.` },
            network: {
                description: `Retrieve activities from the specified network.`,
                default: `all`,
                options: [
                    { value: `all`, label: `All` },
                    { value: `arbitrum`, label: `Arbitrum` },
                    { value: `arweave`, label: `Arweave` },
                    { value: `avax`, label: `Avax` },
                    { value: `base`, label: `Base` },
                    { value: `binance-smart-chain`, label: `Binance Smart Chain` },
                    { value: `crossbell`, label: `Crossbell` },
                    { value: `ethereum`, label: `Ethereum` },
                    { value: `farcaster`, label: `Farcaster` },
                    { value: `gnosis`, label: `Gnosis` },
                    { value: `linea`, label: `Linea` },
                    { value: `optimism`, label: `Optimism` },
                    { value: `polygon`, label: `Polygon` },
                    { value: `vsl`, label: `VSL` },
                ],
            },
            tag: {
                description: `Retrieve activities from the specified tag.`,
                default: `all`,
                options: [
                    { value: `all`, label: `All` },
                    { value: `collectible`, label: `collectible` },
                    { value: `exchange`, label: `exchange` },
                    { value: `metaverse`, label: `metaverse` },
                    { value: `rss`, label: `rss` },
                    { value: `social`, label: `social` },
                    { value: `transaction`, label: `transaction` },
                    { value: `unknown`, label: `unknown` },
                ],
            },
        },
    };
async function c(n) {
    let { account: r, network: a, tag: o } = n.req.param();
    if (r.includes(`://`) || r.includes(`/`)) throw Error(`Account should not contain "://" or path components`);
    let { data: s } = await e(`https://gi.rss3.io/decentralized/${r}?${new URLSearchParams({ limit: `20`, ...(a && a !== `all` && { network: a }), ...(o && o !== `all` && { tag: o }) })}`);
    return {
        title: `${r} activities`,
        link: `https://rss3.io`,
        item: s.map((e) => {
            let n = t(i(e.actions)),
                r = `New ${e.tag} ${e.type} action on ${e.network}<br /><br />From: ${e.from}<br/>To: ${e.to}`;
            return {
                title: `New ${e.tag} ${e.type} action on ${e.network}`,
                description: n ?? r,
                link: e.actions?.[0]?.related_urls?.[0],
                guid: e.id,
                author: [{ name: e.owner, avatar: `https://cdn.stamp.fyi/avatar/eth:${e.owner}` }],
                _extra: { raw: e },
            };
        }),
    };
}
export { s as route };
