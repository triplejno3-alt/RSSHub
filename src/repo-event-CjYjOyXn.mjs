import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './eventapi-BNfYkP2N.mjs';
const i = {
    path: `/repo_event/:owner/:repo/:types?`,
    categories: [`programming`],
    example: `/github/repo_event/DIYgod/RSSHub`,
    view: n.Notifications,
    parameters: {
        owner: `Username or organization name`,
        repo: `Repository name`,
        types: {
            description: `Event types to include, comma separated`,
            default: `all`,
            options: [
                { label: `All events`, value: `all` },
                { label: `Create events`, value: `create` },
                { label: `Delete events`, value: `delete` },
                { label: `Fork events`, value: `fork` },
                { label: `Issue create events`, value: `issue` },
                { label: `Issue comment events`, value: `issuecomm` },
                { label: `Member events`, value: `member` },
                { label: `Pull request events`, value: `pr` },
                { label: `Pull request review comment events`, value: `prcomm` },
                { label: `Pull request review events`, value: `prrev` },
                { label: `Public events`, value: `public` },
                { label: `Push events`, value: `push` },
                { label: `Release events`, value: `release` },
                { label: `Watch events (stars)`, value: `star` },
                { label: `Wiki item create or update events`, value: `wiki` },
                { label: `Commit comment events`, value: `cmcomm` },
                { label: `Discussion events`, value: `discussion` },
            ],
        },
    },
    features: {
        requireConfig: [{ name: `GITHUB_ACCESS_TOKEN`, optional: !0, description: `GitHub access token to access private repository events` }],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    radar: [{ source: [`github.com/:owner/:repo`], target: `/repo_event/:owner/:repo` }],
    name: `Repository Event`,
    maintainers: [`mslxl`],
    handler: a,
};
async function a(n) {
    let i = n.req.param(`owner`),
        a = n.req.param(`repo`),
        o = n.req.param(`types`) || `all`,
        s = e.github && e.github.access_token,
        c = {};
    s && (c.Authorization = `token ${e.github.access_token}`);
    let l = r(o, (await t({ method: `get`, url: `https://api.github.com/repos/${i}/${a}/events`, headers: c, searchParams: { per_page: 100 } })).data);
    return {
        title: `${i}/${a} GitHub Repo Feed - ${o === `all` ? `All Events` : `Events: ${o}`}`,
        link: `https://github.com/${i}/${a}`,
        description: `GitHub events received by ${i}/${a}${o === `all` ? `` : ` (filtered: ${o})`}${s ? ` - includes private events` : ` - public events only`}`,
        item: l,
    };
}
export { i as route };
