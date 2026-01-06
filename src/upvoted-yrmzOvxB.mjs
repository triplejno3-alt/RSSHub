import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { a as t, i as n, r, t as i } from './utils-CwZbeO6p.mjs';
const a = {
    path: `/upvoted/:period?/:innerSharedContent?/:dateSort?`,
    example: `/daily/upvoted/7`,
    view: e.Articles,
    radar: [{ source: [`app.daily.dev/upvoted`] }],
    parameters: {
        innerSharedContent: {
            description: `Where to Fetch inner Shared Posts instead of original`,
            default: `false`,
            options: [
                { value: `false`, label: `False` },
                { value: `true`, label: `True` },
            ],
        },
        dateSort: {
            description: `Sort posts by publication date instead of popularity`,
            default: `true`,
            options: [
                { value: `false`, label: `False` },
                { value: `true`, label: `True` },
            ],
        },
        period: {
            description: `Period of Lookup`,
            default: `7`,
            options: [
                { value: `7`, label: `Last Week` },
                { value: `30`, label: `Last Month` },
                { value: `365`, label: `Last Year` },
            ],
        },
    },
    name: `Most upvoted`,
    maintainers: [`Rjnishant530`],
    handler: o,
    url: `app.daily.dev/upvoted`,
};
async function o(e) {
    let a = `${i}/posts/upvoted`,
        o = e.req.query(`limit`) ? Number.parseInt(e.req.query(`limit`), 10) : 20,
        s = e.req.param(`innerSharedContent`) ? JSON.parse(e.req.param(`innerSharedContent`)) : !1,
        c = e.req.param(`dateSort`) ? JSON.parse(e.req.param(`dateSort`)) : !0,
        l = e.req.param(`period`) ? Number.parseInt(e.req.param(`period`), 10) : 7;
    return {
        title: `Most upvoted posts for developers | daily.dev`,
        link: a,
        item: n(
            await r({
                query: `
    query MostUpvotedFeed(
    $loggedIn: Boolean! = false
    $first: Int
    $after: String
    $period: Int
    $supportedTypes: [String!] = ["article","share","freeform","video:youtube","collection"]
    $source: ID
    $tag: String
  ) {
    page: mostUpvotedFeed(first: $first, after: $after, period: $period, supportedTypes: $supportedTypes, source: $source, tag: $tag) {
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
      clickbaitTitleDetected
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
    clickbaitTitleDetected
  }


  
  fragment UserPost on Post {
    read
    upvoted
    commented
    bookmarked
    downvoted
  }

`,
                variables: { ...t, period: l, first: o },
            }),
            s,
            c
        ),
        description: `Find the most upvoted developer posts on daily.dev. Explore top-rated content in coding, tutorials, and tech news from the largest developer network in the world.`,
        logo: `${i}/favicon-32x32.png`,
        icon: `${i}/favicon-32x32.png`,
        language: `en-us`,
    };
}
export { a as route };
