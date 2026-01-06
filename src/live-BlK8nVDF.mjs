import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
const r = {
    path: `/live/:login`,
    categories: [`live`],
    view: n.Notifications,
    example: `/twitch/live/riotgames`,
    parameters: { login: `Twitch username` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Live`,
    maintainers: [`hoilc`],
    handler: i,
};
async function i(n) {
    let r = n.req.param(`login`),
        i = await t({
            method: `post`,
            url: `https://gql.twitch.tv/gql`,
            headers: { Referer: `https://player.twitch.tv`, 'Client-ID': `kimne78kx3ncx6brgo4mv6wki5h1ko` },
            json: [
                { operationName: `ChannelShell`, extensions: { persistedQuery: { version: 1, sha256Hash: `fea4573a7bf2644f5b3f2cbbdcbee0d17312e48d2e55f080589d053aad353f11` } }, variables: { login: r, lcpVideosEnabled: !1 } },
                { operationName: `StreamMetadata`, extensions: { persistedQuery: { version: 1, sha256Hash: `b57f9b910f8cd1a4659d894fe7550ccc81ec9052c01e438b290fd66a040b9b93` } }, variables: { channelLogin: r, includeIsDJ: !0 } },
                { operationName: `RealtimeStreamTagList`, extensions: { persistedQuery: { version: 1, sha256Hash: `a4747cac9d8e8bf6cf80969f6da6363ca1bdbd80fe136797e71504eb404313fd` } }, variables: { channelLogin: r } },
                {
                    operationName: `ChannelRoot_AboutPanel`,
                    variables: { channelLogin: r, skipSchedule: !0, includeIsDJ: !0 },
                    extensions: { persistedQuery: { version: 1, sha256Hash: `0df42c4d26990ec1216d0b815c92cc4a4a806e25b352b66ac1dd91d5a1d59b80` } },
                },
            ],
        }),
        a = i.data[0].data,
        o = i.data[1].data,
        s = i.data[2].data,
        c = i.data[3].data,
        { userOrError: l } = a,
        { user: u } = c;
    if (!l.id) throw Error(l.__typename);
    let d = l.displayName,
        f = [];
    return (
        o.user.stream &&
            f.push({
                title: o.user.lastBroadcast.title,
                author: d,
                category: s.user.stream.freeformTags.map((e) => e.name),
                description: `<img style="max-width: 100%;" src="https://static-cdn.jtvnw.net/previews-ttv/live_user_${r}.jpg">`,
                pubDate: e(o.user.stream.createdAt),
                guid: o.user.stream.id,
                link: `https://www.twitch.tv/${r}`,
            }),
        { title: `Twitch - ${d} - Live`, description: u.description, link: `https://www.twitch.tv/${r}`, image: u.profileImageURL, item: f, allowEmpty: !0 }
    );
}
export { r as route };
