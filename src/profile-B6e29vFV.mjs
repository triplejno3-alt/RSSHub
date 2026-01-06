import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/profile/:handle`,
    name: `Link3 Profile`,
    url: `link3.to`,
    maintainers: [`cxheng315`],
    example: `/link3/profile/synfutures_defi`,
    parameters: { handle: `Profile handle` },
    categories: [`other`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`link3.to/:handle`], target: `/:handle` }],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`handle`),
        i = await e(`https://api.cyberconnect.dev/profile/`, {
            method: `POST`,
            headers: { 'Content-Type': `application/json` },
            body: {
                variables: { handle: r },
                query: `
                query getProfile($id: ID, $handle: String) {
                    profile(id: $id, handle: $handle) {
                        status
                        data {
                            handle
                            ... on OrgProfile {
                                displayName
                                bio
                                profilePicture
                                backgroundPicture
                                __typename
                            }
                            ... on PerProfile {
                                bio
                                personalDisplayName: displayName {
                                    displayName
                                }
                                personalProfilePicture: profilePicture {
                                    picture
                                }
                                personalBackgroundPicture: backgroundPicture {
                                    picture
                                }
                                __typename
                            }
                            blocks {
                                ... on Block {
                                    ... on EventBlock {
                                        __typename
                                        events {
                                            id
                                            title
                                            info
                                            posterUrl
                                            startTimestamp
                                            endTimestamp
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            `,
            },
        });
    if (i.data.profile.status !== `SUCCESS`) return { title: `Error`, description: `Profile not found`, items: [{ title: `Error`, description: `Profile not found`, link: `https://link3.to/${r}` }] };
    let a = i.data.profile.data,
        o = a.blocks
            .filter((e) => e.__typename === `EventBlock`)
            .flatMap((e) => e.events)
            .map((e) => ({
                title: e.title,
                link: `https://link3.to/e/${e.id}`,
                description: e.info ?? ``,
                author: a.handle,
                guid: e.id,
                pubDate: e.startTimestamp ? t(e.startTimestamp * 1e3) : null,
                itunes_item_image: e.posterUrl,
                itunes_duration: e.endTimestamp - e.startTimestamp,
            }));
    return {
        title: a.displayName ?? a.personalDisplayName.displayName,
        link: `https://link3.to/${a.handle}`,
        description: a.bio,
        logo: a.profilePicture ?? a.personalProfilePicture.picture,
        image: a.profilePicture ?? a.personalProfilePicture.picture,
        author: a.handle,
        item: o && o.length > 0 ? o : [{ title: `No events`, description: `No events`, link: `https://link3.to/${r}` }],
    };
}
export { n as route };
