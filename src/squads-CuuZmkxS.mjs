import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./cache-DLkCV5c7.mjs";import"./parse-date-DjdQS_Nt.mjs";import{t as e}from"./types-Bl_lnefZ.mjs";import{a as t,i as n,r,t as i}from"./utils-CwZbeO6p.mjs";const a={path:`/squads/:squads/:innerSharedContent?`,example:`/daily/squads/watercooler`,view:e.Articles,parameters:{innerSharedContent:{description:`Where to Fetch inner Shared Posts instead of original`,default:`false`,options:[{value:`false`,label:`False`},{value:`true`,label:`True`}]}},radar:[{source:[`app.daily.dev/squads/:squads`]}],name:`Squads`,maintainers:[`Rjnishant530`],handler:o,url:`app.daily.dev/squads/discover`};async function o(e){let a=e.req.query(`limit`)?Number.parseInt(e.req.query(`limit`),10):20,o=e.req.param(`innerSharedContent`)?JSON.parse(e.req.param(`innerSharedContent`)):!1,s=e.req.param(`squads`),c=`${i}/squads/${s}`,{id:l,description:u,name:d}=await r({query:`
query Source($handle: ID!) {
    source(id: $handle) {
      ...SquadBaseInfo
      moderationPostCount
    }
  }
  fragment SquadBaseInfo on Source {
    ...SourceBaseInfo
    referralUrl
    createdAt
    flags {
      featured
      totalPosts
      totalViews
      totalUpvotes
    }
    category {
      id
      title
      slug
    }
    ...PrivilegedMembers
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
    currentMember {
      ...CurrentMember
    }
    memberPostingRole
    memberInviteRole
    moderationRequired
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
  fragment PrivilegedMembers on Source {
    privilegedMembers {
      user {
        id
        name
        image
        permalink
        username
        bio
        reputation
        companies {
          name
          image
        }
        contentPreference {
          status
        }
      }
      role
    }
  }

`,variables:{handle:s}},!0),f=n(await r({query:`
  query SourceFeed(
    $source: ID!
    $loggedIn: Boolean! = false
    $first: Int
    $after: String
    $ranking: Ranking
    $supportedTypes: [String!]
  ) {
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
        pinnedAt contentHtml
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
`,variables:{...t,source:l,ranking:`TIME`,supportedTypes:[`article`,`share`,`freeform`,`video:youtube`,`collection`,`welcome`],first:a}}),o,!0);return{title:`${d} - daily.dev`,link:c,item:f,description:u,logo:`${i}/favicon-32x32.png`,icon:`${i}/favicon-32x32.png`,language:`en-us`}}export{a as route};