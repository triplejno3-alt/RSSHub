import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { i as r, n as i, r as a, t as o } from './utils-CwZbeO6p.mjs';
const s = {
    path: `/user/:userId/:innerSharedContent?`,
    example: `/daily/user/kramer`,
    radar: [{ source: [`app.daily.dev/:userId/posts`, `app.daily.dev/:userId`] }],
    parameters: {
        innerSharedContent: {
            description: `Where to Fetch inner Shared Posts instead of original`,
            default: `false`,
            options: [
                { value: `false`, label: `False` },
                { value: `true`, label: `True` },
            ],
        },
    },
    name: `User Posts`,
    maintainers: [`TonyRL`],
    handler: c,
    url: `app.daily.dev`,
};
async function c(s) {
    let c = s.req.param(`userId`),
        l = s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`), 10) : 7,
        u = s.req.param(`innerSharedContent`) ? JSON.parse(s.req.param(`innerSharedContent`)) : !1,
        d = await i(),
        f = (await n.tryGet(`daily:user:${c}`, async () => (await e(`${o}/_next/data/${d}/en/${c}.json`, { query: { userId: c } })).pageProps)).user,
        p = await n.tryGet(
            `daily:user:${c}:posts`,
            async () =>
                r(
                    await a({
                        query: `
  query AuthorFeed(
    $loggedIn: Boolean! = false
    $userId: ID!
    $after: String
    $first: Int
    $supportedTypes: [String!] = [
      "article"
      "share"
      "freeform"
      "video:youtube"
      "collection"
    ]
  ) {
    page: authorFeed(
      author: $userId
      after: $after
      first: $first
      ranking: TIME
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
        contentHtml
        ...UserPost @include(if: $loggedIn)
      }
    }
  }
  fragment FeedPost on Post {
    ...SharedPostInfo
    sharedPost {
      ...SharedPostInfo
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
  fragment SharedPostInfo on Post {
    id
    title
    titleHtml
    image
    readTime
    permalink
    commentsPermalink
    summary
    createdAt
    private
    upvoted
    commented
    bookmarked
    views
    numUpvotes
    numComments
    videoId
    scout {
      ...UserShortInfo
    }
    author {
      ...UserShortInfo
    }
    type
    tags
    source {
      ...SourceBaseInfo
    }
    downvoted
    flags {
      promoteToPublic
    }
    userState {
      vote
      flags {
        feedbackDismiss
      }
    }
    slug
  }
  fragment SourceBaseInfo on Source {
    id
    active
    handle
    name
    permalink
    public
    type
    description
    image
    membersCount
    privilegedMembers {
      user {
        id
      }
      role
    }
    currentMember {
      ...CurrentMember
    }
    memberPostingRole
    memberInviteRole
  }
  fragment CurrentMember on SourceMember {
    user {
      id
    }
    permissions
    role
    referralToken
    flags {
      hideFeedPosts
      collapsePinnedPosts
    }
  }
  fragment UserShortInfo on User {
    id
    name
    image
    permalink
    username
    bio
    createdAt
    reputation
  }
  fragment UserPost on Post {
    read
    upvoted
    commented
    bookmarked
    downvoted
  }`,
                        variables: { userId: f.id, first: l, loggedIn: !1 },
                    }),
                    u,
                    !0
                ),
            t.cache.routeExpire,
            !1
        );
    return { title: `${f.name} | daily.dev`, description: f.bio, link: `${o}/${c}/posts`, item: p, image: f.image, logo: f.image, icon: f.image, language: `en-us` };
}
export { s as route };
