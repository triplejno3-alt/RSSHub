import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = `https://www.fantube.tokyo`,
    u = (n) =>
        t.tryGet(`fantube:creator:${n}`, async () => {
            let t = o(await e(`${l}/r18/creator/${n}`, { headers: { cookie: `fantube-ageVerified=1;` } })),
                r = JSON.parse(
                    t(`script:contains("creatorFragment")`)
                        .text()
                        .match(/^self\.__next_f\.push\((.+?)\)$/)?.[1] || `{}`
                );
            return JSON.parse(r[1].slice(2))
                .find((e) => e?.hasOwnProperty(`children`))
                .children.find((e) => Object.values(e).includes(`div`))
                .find((e) => e?.hasOwnProperty(`children`))
                .children.find((e) => e?.hasOwnProperty(`creatorFragment`)).creatorFragment;
        }),
    d = (n, r) =>
        t.tryGet(
            `fantube:creatorPostReelList:${n}:${r}`,
            async () =>
                (
                    await e(`https://api.prd.fantube.tokyo/graphql`, {
                        headers: { Referer: l },
                        body: JSON.stringify({
                            query: `query CreatorPostReelList($identifier: String!, $first: Int, $after: String, $last: Int, $before: String) {
  posts(
    where: {status: {equals: PUBLISHED}, creator: {is: {identifier: {equals: $identifier}}}}
    orderBy: [{pinnedAt: {nulls: last, sort: desc}}, {order: asc}, {createdAt: desc}, {id: desc}]
    first: $first
    after: $after
    last: $last
    before: $before
  ) {
    nodes {
      ...PostSwiper_Post
    }
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
    }
  }
}

fragment PostSwiper_Post on Post {
  id
  title
  isFavorite
  favoritesCount
  ...PostSwiperSlide_Post
}

fragment PostSwiperSlide_Post on Post {
  id
  type
  title
  price
  creator {
    displayName
  }
  ...PostVideoElement_Post
  ...PostImageElement_Post
}

fragment PostVideoElement_Post on Post {
  id
  title
  contentData {
    ... on PostVideoType {
      __typename
      videoUrl
      isSample
      noSample
      durationSeconds
    }
  }
  isFavorite
  sampleVideoId
  thumbnailUrl
  creator {
    displayName
  }
  ...PostInfo_Post
  ...VideoControlIcons_Post
  ...PurchaseWrapper_Post
}

fragment PostInfo_Post on Post {
  title
  description
  publishStartAt
  price
  isBuyEnabled
  ...Profile_Post
}

fragment Profile_Post on Post {
  id
  creator {
    id
    isSelf
    identifier
    displayName
    avatarImageUrl
    following
  }
}

fragment VideoControlIcons_Post on Post {
  id
  isMine
  pinnedAt
  favoritesCount
  ...PostComment_Post
}

fragment PostComment_Post on Post {
  id
  isMine
  canComment
  comments(
    where: {OR: [{parentPostComment: {is: {isDeleted: {equals: false}}}}, {parentPostCommentId: {equals: null}}], isDeleted: {equals: false}}
  ) {
    totalCount
  }
  ...PostCommentReplyDrawer_Post
}

fragment PostCommentReplyDrawer_Post on Post {
  id
  isMine
  canComment
}

fragment PurchaseWrapper_Post on Post {
  id
  title
  price
  creator {
    displayName
  }
  ...PostPurchaseDialog_Post
  ...PostPurchaseSingleDialog_Post
}

fragment PostPurchaseDialog_Post on Post {
  id
  isBuyEnabled
  price
  thumbnailUrl
  title
  planPosts(
    orderBy: [{plan: {deleteRequestAt: {sort: desc, nulls: first}}}, {plan: {isRecommended: desc}}, {plan: {price: asc}}]
  ) {
    nodes {
      plan {
        id
        title
        price
        ...PlanSwiper_Plan
      }
    }
  }
  creator {
    displayName
  }
  ...PostPurchaseSingleDialog_Post
}

fragment PlanSwiper_Plan on Plan {
  id
  ...PlanSwiperItem_Plan
}

fragment PlanSwiperItem_Plan on Plan {
  id
  title
  price
  isArchive
  isRecommended
  deleteRequestAt
  isSubscribing
  subscriptionCloseAt
  capacity
  subscribersCount
  planPosts(
    where: {post: {is: {status: {equals: PUBLISHED}}}}
    first: 7
    orderBy: [{createdAt: desc}]
  ) {
    nodes {
      post {
        id
        thumbnailUrl
        title
      }
    }
    totalCount
  }
  ...PlanUnavailableNote_Plan
}

fragment PlanUnavailableNote_Plan on Plan {
  capacity
  subscribersCount
  subscriptionCloseAt
  deleteRequestAt
}

fragment PostPurchaseSingleDialog_Post on Post {
  id
  price
  thumbnailUrl
  title
  isBuyEnabled
}

fragment PostImageElement_Post on Post {
  id
  title
  contentData {
    __typename
    ... on PostImageType {
      encrypted
      imageUrls
      count
    }
  }
  isFavorite
  creator {
    displayName
  }
  ...PostInfo_Post
  ...ImageControlIcons_Post
  ...PurchaseWrapper_Post
}

fragment ImageControlIcons_Post on Post {
  id
  isMine
  pinnedAt
  favoritesCount
  ...PostComment_Post
}`,
                            variables: { identifier: n, first: r, after: `` },
                            operationName: `CreatorPostReelList`,
                        }),
                        method: `POST`,
                    })
                ).data.posts.nodes
        ),
    f = {
        path: `/r18/creator/:identifier`,
        categories: [`multimedia`],
        example: `/fantube/r18/creator/miyuu`,
        parameters: { identifier: `User handle` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.fantube.tokyo/r18/creator/:identifier`] }],
        name: `User Posts`,
        maintainers: [`TonyRL`],
        handler: m,
    },
    p = ({ description: e, thumbnailUrl: t, sampleVideoId: n, imageUrls: o }) =>
        s(
            a(r, {
                children: [
                    t ? a(r, { children: [i(`img`, { src: t }), i(`br`, {})] }) : null,
                    o?.map((e, t) => a(r, { children: [i(`img`, { src: e }, `${e}-${t}`), i(`br`, {})] })),
                    n
                        ? a(r, {
                              children: [
                                  i(`div`, {
                                      style: `position: relative; padding-top: 56.25%`,
                                      children: i(`iframe`, {
                                          src: `https://customer-7d4xajfg7g3ps2lm.cloudflarestream.com/${n}/iframe`,
                                          style: `border: none; position: absolute; top: 0; height: 100%; width: 100%`,
                                          allow: `accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;`,
                                          allowfullscreen: `true`,
                                      }),
                                  }),
                                  i(`br`, {}),
                              ],
                          })
                        : null,
                    e
                        ? c(
                              e.replaceAll(
                                  `
`,
                                  `<br>`
                              )
                          )
                        : null,
                ],
            })
        );
async function m(e) {
    let { identifier: t } = e.req.param(),
        r = Number.parseInt(e.req.query(`limit`) || 18, 10),
        i = await u(t),
        a = (await d(t, r)).map((e) => ({
            title: e.title
                .replaceAll(
                    `
`,
                    ` `
                )
                .trim(),
            description: p({ description: e.description, thumbnailUrl: e.thumbnailUrl, sampleVideoId: e.sampleVideoId, imageUrls: e.contentData?.imageUrls || [] }),
            link: `${l}/r18/post/${e.id}?creator=${t}`,
            author: e.creator.displayName,
            pubDate: n(e.publishStartAt),
            image: e.thumbnailUrl,
        }));
    return {
        title: `${i.displayName}のプロフィール｜クリエイターページ｜FANTUBE(ファンチューブ)`,
        link: `${l}/r18/creator/${t}`,
        description: i.description,
        image: i.avatarImageUrl,
        icon: i.avatarImageUrl,
        logo: i.avatarImageUrl,
        language: `ja`,
        item: a,
    };
}
export { f as route };
