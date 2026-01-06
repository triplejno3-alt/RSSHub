import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/user/:username`,
    categories: [`social-media`],
    example: `/farcaster/user/vitalik.eth`,
    parameters: { username: `Farcaster username` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`warpcast.com/:username`], target: `/user/:username` }],
    name: `Farcaster User`,
    maintainers: [`DIYgod`],
    handler: n,
};
async function n(t) {
    let n = t.req.param(`username`),
        r = (await e(`https://client.warpcast.com/v2/user-by-username?username=${n}`)).data.result.user,
        i = (await e(`https://client.warpcast.com/v2/casts?fid=${r.fid}&limit=100`)).data.result.casts;
    return {
        title: `${r.displayName} on Farcaster`,
        link: `https://warpcast.com/${n}`,
        item: i.map((e) => ({
            title: e.text,
            description: `${e.parentAuthor ? `Replying to @${e.parentAuthor.username}: ` : ``}${e.text} ${e.embeds?.urls?.map((e) => `<a href="${e.openGraph.url}">${e.openGraph.title}</a>`).join(` `) || ``} ${e.embeds?.images?.map((e) => `<img src="${e.url}" />`).join(` `) || ``}`,
            link: `https://warpcast.com/${n}/cast/${e.hash}`,
            pubDate: new Date(e.timestamp).toUTCString(),
            guid: e.hash,
        })),
    };
}
export { t as route };
