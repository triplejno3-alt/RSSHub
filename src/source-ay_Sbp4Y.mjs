import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { i as r, n as i, r as a, t as o } from './utils-CwZbeO6p.mjs';
const s = {
    path: `/source/:sourceId/:innerSharedContent?`,
    example: `/daily/source/hn`,
    parameters: {
        sourceId: `The source id`,
        innerSharedContent: {
            description: `Where to Fetch inner Shared Posts instead of original`,
            default: `false`,
            options: [
                { value: `false`, label: `False` },
                { value: `true`, label: `True` },
            ],
        },
    },
    radar: [{ source: [`app.daily.dev/sources/:sourceId`] }],
    name: `Source Posts`,
    maintainers: [`TonyRL`],
    handler: c,
    url: `app.daily.dev`,
};
async function c(s) {
    let c = s.req.param(`sourceId`),
        l = s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`), 10) : 10,
        u = s.req.param(`innerSharedContent`) ? JSON.parse(s.req.param(`innerSharedContent`)) : !1,
        d = `${o}/sources/${c}`,
        f = await i(),
        p = await n.tryGet(`daily:source:${c}`, async () => (await e(`${o}/_next/data/${f}/en/sources/${c}.json`)).pageProps.source),
        m = await n.tryGet(
            `daily:source:${c}:posts`,
            async () =>
                r(
                    await a({
                        query: `
query SourceFeed($source: ID!, $loggedIn: Boolean! = false, $first: Int, $after: String, $ranking: Ranking, $supportedTypes: [String!]) {
  page: sourceFeed(
    source: $source
    first: $first
    after: $after
    ranking: $ranking
    supportedTypes: $supportedTypes
  ) {
    ...FeedPostConnection
  }
}

fragment FeedPostConnection on PostConnection {
  pageInfo {
    hasNextPage
    endCursor
  }
  edges {
    node {
      ...FeedPost
      pinnedAt
      contentHtml
      ...UserPost @include(if: $loggedIn)
    }
  }
}

fragment FeedPost on Post {
  ...FeedPostInfo
  sharedPost {
    id
    title
    image
    readTime
    permalink
    commentsPermalink
    createdAt
    type
    tags
    source {
      id
      handle
      permalink
      image
    }
    slug
  }
  trending
  feedMeta
  collectionSources {
    handle
    image
  }
  numCollectionSources
  updatedAt
  slug
}

fragment FeedPostInfo on Post {
  id
  title
  image
  readTime
  permalink
  commentsPermalink
  createdAt
  commented
  bookmarked
  views
  numUpvotes
  numComments
  summary
  bookmark {
    remindAt
  }
  author {
    id
    name
    image
    username
    permalink
  }
  type
  tags
  source {
    id
    handle
    name
    permalink
    image
    type
  }
  userState {
    vote
    flags {
      feedbackDismiss
    }
  }
  slug
}

fragment UserPost on Post {
  read
  upvoted
  commented
  bookmarked
  downvoted
}`,
                        variables: { source: c, supportedTypes: [`article`, `video:youtube`, `collection`], period: 30, first: l, after: ``, loggedIn: !1 },
                    }),
                    u,
                    !0
                ),
            t.cache.routeExpire,
            !1
        );
    return { title: `${p.name} posts on daily.dev`, description: p.description, link: d, item: m, image: p.image, logo: p.image, icon: p.image, language: `en-us` };
}
export { s as route };
