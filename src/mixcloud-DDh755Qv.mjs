import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import r from 'crypto-js';
const i = {
        host: `https://www.mixcloud.com`,
        imageBaseURL: `https://thumbnailer.mixcloud.com/unsafe/480x480/`,
        graphqlURL: `https://app.mixcloud.com/graphql`,
        decryptionKey: `IFYOUWANTTHEARTISTSTOGETPAIDDONOTDOWNLOADFROMMIXCLOUD`,
        headers: { Referer: `https://www.mixcloud.com`, 'Content-Type': `application/json`, 'X-Requested-With': `XMLHttpRequest` },
    },
    a = { uploads: `uploads`, reposts: `reposted`, favorites: `favorites`, listens: `listeningHistory`, stream: `stream`, playlist: `items` },
    o = { uploads: `Shows`, reposts: `Reposts`, favorites: `Favorites`, listens: `History`, stream: `Stream`, playlist: `Playlist` },
    s = `
  id
  slug
  name
  description
  publishDate
  audioLength
  picture(width: 1024, height: 1024) {
    url
  }
  owner {
    displayName
    username
    url
  }
  streamInfo {
    url
    hlsUrl
    dashUrl
  }
  favorites {
    totalCount
  }
  reposts {
    totalCount
  }
  plays
  tags {
    tag {
      name
    }
  }
  featuringArtistList
  isExclusive
  restrictedReason
  comments(first: 100) {
    edges {
      node {
        comment
        created
        user {
          displayName
          username
        }
      }
    }
    totalCount
  }
`;
function c(e) {
    if (e === `playlist`)
        return {
            objectType: `playlist`,
            objectFields: `
        name
        description
        picture {
          urlRoot
        }
        items(first: 100) {
          edges {
            node {
              cloudcast {
                ${s}
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      `,
        };
    {
        let t = e === `listens` ? `node { cloudcast { ${s} } }` : `node { ${s} }`;
        return {
            objectType: `user`,
            objectFields: `
        displayName
        biog
        picture {
          urlRoot
        }
        ${a[e]}(first: 100) {
          edges {
            ${t}
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      `,
        };
    }
}
const l = {
    path: `/:username/:type?`,
    categories: [`multimedia`],
    example: `/mixcloud/dholbach/uploads`,
    parameters: { username: `Username, can be found in URL`, type: `Type, see below, uploads by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
    radar: [{ source: [`mixcloud.com/:username/:type?`] }, { source: [`www.mixcloud.com/:username/:type?`] }],
    name: `User`,
    maintainers: [`Misaka13514`],
    handler: g,
    description: `| Shows   | Reposts | Favorites | History | Stream |
| ------- | ------- | --------- | ------- | ------ |
| uploads | reposts | favorites | listens | stream |`,
};
async function u(e, n, r, a) {
    let o = e + `Lookup`,
        s = i.headers,
        c = `{
    ${o}(lookup: {username: "${r}"${a ? `, slug: "${a}"` : ``}}) {
      ${n}
    }
  }`;
    return (await t({ method: `post`, url: i.graphqlURL, headers: s, json: { query: c } })).data.data[o];
}
function d(e, t) {
    return [...r.enc.Base64.parse(t).toString(r.enc.Utf8)].map((t, n) => String.fromCodePoint((t.codePointAt(0) || 0) ^ (e.codePointAt(n % e.length) || 0))).join(``);
}
function f(e) {
    if (!e) return ``;
    try {
        return d(i.decryptionKey, e);
    } catch {
        return e;
    }
}
function p(e, t) {
    return t === `playlist` || t === `listens` ? e.cloudcast : e;
}
function m(e, t, n) {
    return t === `playlist` && n ? `Mixcloud - ${e}'s Playlist: ${n}` : `Mixcloud - ${e}'s ${o[t] || t}`;
}
function h(e, t, n) {
    let r = i.host;
    return t === `playlist` && n ? `${r}/${e}/playlists/${n}/` : `${r}/${e}/${t === `uploads` ? `` : t + `/`}`;
}
async function g(t) {
    let r = t.req.param(`username`),
        o = t.req.param(`playlist`),
        s = t.req.param(`type`) ?? (o ? `playlist` : `uploads`);
    if (!a[s]) throw new n(`Invalid type: ${s}`);
    let { objectType: l, objectFields: d } = c(s),
        g = await u(l, d, r, o);
    if (!g) throw Error(`${s === `playlist` ? `Playlist` : `User`} not found`);
    let _ = s === `playlist`,
        v = _ ? r : g.displayName,
        y = _ ? g.description : g.biog,
        b = g.picture,
        x = b && b.urlRoot ? `${i.imageBaseURL}${b.urlRoot}` : ``,
        S = (g[a[s]]?.edges || [])
            .map((t) => {
                let n = p(t.node, s);
                if (!n) return null;
                let a = f((n.streamInfo || {}).url),
                    o = n.tags?.map((e) => e.tag?.name).filter(Boolean) || [],
                    c =
                        n.description?.replaceAll(
                            `
`,
                            `<br>`
                        ) || ``;
                if (n.featuringArtistList && n.featuringArtistList.length > 0) {
                    let e = n.featuringArtistList.slice(0, 5).join(`, `);
                    ((c += c ? `<br><br>` : ``), (c += `<strong>Featured Artists:</strong> ${e}`), n.featuringArtistList.length > 5 && (c += ` and ${n.featuringArtistList.length - 5} more...`));
                }
                let l = [];
                return (
                    n.plays && l.push(`${n.plays} plays`),
                    n.favorites?.totalCount && l.push(`${n.favorites.totalCount} favorites`),
                    n.reposts?.totalCount && l.push(`${n.reposts.totalCount} reposts`),
                    n.comments?.totalCount && l.push(`${n.comments.totalCount} comments`),
                    l.length > 0 && ((c += c ? `<br><br>` : ``), (c += `<em>${l.join(` • `)}</em>`)),
                    {
                        title: n.name,
                        author: n.owner?.displayName || r,
                        description: c,
                        pubDate: e(n.publishDate),
                        guid: Buffer.from(n.id, `base64`).toString(),
                        link: `${i.host}/${n.owner?.username || r}/${n.slug}`,
                        itunes_item_image: n.picture?.url || ``,
                        itunes_duration: n.audioLength,
                        enclosure_url: a,
                        enclosure_type: `audio/x-m4a`,
                        itunes_author: n.owner?.displayName || r,
                        category: o,
                        comments: n.comments?.totalCount || 0,
                        upvotes: n.favorites?.totalCount || 0,
                        media: a ? { content: { url: a, type: `audio/x-m4a`, duration: n.audioLength }, thumbnail: n.picture?.url ? { url: n.picture.url } : void 0 } : void 0,
                    }
                );
            })
            .filter(Boolean),
        C = m(v, s, g.name),
        w = h(r, s, o);
    return {
        title: C,
        description:
            y?.replaceAll(
                `
`,
                `<br>`
            ) || ``,
        itunes_author: v,
        image: x,
        link: w,
        item: S,
    };
}
export { l as n, g as t };
