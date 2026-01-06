import { t as e } from './ofetch-uhy-qh6X.mjs';
import * as t from 'cheerio';
const n = `query pageByNavigationPath(
    $input: PageByNavigationPathInput!
    $firstStories: Int
    $afterStories: Cursor
  ) {
    pageByNavigationPath(input: $input) {
      error {
        message
        type {
          class
          ... on ErrorTypeInvalidRequest {
            fields {
              field
              message
            }
          }
        }
      }
      page {
        ads {
          suppress
        }
        description
        id
        latestStoriesConnection(first: $firstStories, after: $afterStories) {
          edges {
            node {
              byline {
                ...AssetBylineFragment
              }
              headlines {
                headline
              }
              ads {
                sponsor {
                  name
                }
              }
              overview {
                about
                label
              }
              type
              dates {
                firstPublished
                published
              }
              id
              publicId
              images {
                ...AssetImagesFragmentAudience
              }
              tags {
                primary {
                  ...TagFragmentAudience
                }
                secondary {
                  ...TagFragmentAudience
                }
              }
              urls {
                ...AssetUrlsAudienceFragment
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        name
        seo {
          canonical {
            brand {
              key
            }
          }
          description
          title
        }
        social {
          image {
            height
            url
            width
          }
        }
      }
      redirect
    }
  }
  fragment AssetBylineFragment on AssetByline {
    type
    ... on AssetBylineAuthor {
      author {
        name
        publicId
        profile {
          avatar
          bio
          body
          canonical {
            brand {
              key
            }
          }
          email
          socials {
            facebook {
              publicId
            }
            twitter {
              publicId
            }
          }
          title
        }
      }
    }
    ... on AssetBylineName {
      name
    }
  }
  fragment AssetImagesFragmentAudience on ImageRenditions {
    landscape16x9 {
      ...ImageFragmentAudience
    }
    landscape3x2 {
      ...ImageFragmentAudience
    }
    portrait2x3 {
      ...ImageFragmentAudience
    }
    square1x1 {
      ...ImageFragmentAudience
    }
  }
  fragment ImageFragmentAudience on ImageRendition {
    altText
    animated
    caption
    credit
    crop {
      offsetX
      offsetY
      width
      zoom
    }
    mediaId
    mimeType
    source
    type
  }
  fragment AssetUrlsAudienceFragment on AssetURLs {
    canonical {
      brand {
        key
      }
      path
    }
    external {
      url
    }
    published {
      brand {
        key
      }
      path
    }
  }
  fragment TagFragmentAudience on Tag {
    company {
      exchangeCode
      stockCode
    }
    context {
      name
    }
    description
    displayName
    externalEntities {
      google {
        placeId
      }
      wikipedia {
        publicId
        url
      }
    }
    id
    location {
      latitude
      longitude
      postalCode
      state
    }
    name
    publicId
    seo {
      description
      title
    }
    urls {
      canonical {
        brand {
          key
        }
        path
      }
      published {
        brand {
          key
        }
        path
      }
    }
  }`,
    r = `query assetsConnectionByCriteria(
    $after: ID
    $brand: Brand!
    $categories: [Int!]
    $first: Int!
    $render: Render!
    $types: [AssetType!]!
  ) {
    assetsConnectionByCriteria(
      after: $after
      brand: $brand
      categories: $categories
      first: $first
      render: $render
      types: $types
    ) {
      edges {
        cursor
        node {
          ...AssetFragment
          sponsor {
            name
          }
        }
      }
      error {
        message
        type {
          class
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  fragment AssetFragment on Asset {
    asset {
      about
      byline
      duration
      headlines {
        headline
      }
      live
    }
    assetType
    dates {
      firstPublished
      modified
      published
    }
    id
    featuredImages {
      landscape16x9 {
        ...ImageFragment
      }
      landscape3x2 {
        ...ImageFragment
      }
      portrait2x3 {
        ...ImageFragment
      }
      square1x1 {
        ...ImageFragment
      }
    }
    label
    tags {
      primary: primaryTag {
        ...AssetTag
      }
      secondary {
        ...AssetTag
      }
    }
    urls {
      ...AssetURLs
    }
  }
  fragment AssetTag on AssetTagDetails {
    ...AssetTagAudience
    shortID
    slug
  }
  fragment AssetTagAudience on AssetTagDetails {
    company {
      exchangeCode
      stockCode
    }
    context
    displayName
    id
    name
    urls {
      canonical {
        brand
        path
      }
      published {
        afr {
          path
        }
      }
    }
  }
  fragment AssetURLs on AssetURLs {
    canonical {
      brand
      path
    }
    published {
      afr {
        path
      }
    }
  }
  fragment ImageFragment on Image {
    data {
      altText
      aspect
      autocrop
      caption
      cropWidth
      id
      offsetX
      offsetY
      zoom
    }
  }`,
    i = async (n) => {
        let r = await e(n.link),
            i = t.load(r),
            o = JSON.parse(i(`script#__REDUX_STATE__`).text().replaceAll(`:undefined`, `:null`).match(`__REDUX_STATE__=(.*);`)?.[1] || `{}`).page.content,
            s = o.asset;
        switch (o.assetType) {
            case `liveArticle`:
                n.description = s.posts.map((e) => `<h2>${e.asset.headlines.headline}</h2>${e.asset.body}`).join(``);
                break;
            case `article`:
            case `featureArticle`:
                n.description = a(s, n.link);
                break;
            default:
                throw Error(`Unknown asset type: ${o.assetType} in ${n.link}`);
        }
        return n;
    },
    a = (e, n) => {
        let r = t.load(e.body, null, !1);
        return (
            r(`x-placeholder`).each((t, i) => {
                let a = r(i),
                    o = a.attr(`id`);
                o || a.replaceWith(``);
                let s = e.bodyPlaceholders[o];
                switch (s?.type) {
                    case `callout`:
                    case `relatedStory`:
                        a.replaceWith(``);
                        break;
                    case `iframe`:
                        a.replaceWith(`<iframe src="${s.data.url}" frameborder="0" allowfullscreen></iframe>`);
                        break;
                    case `image`:
                        a.replaceWith(`<img src="https://static.ffx.io/images/${s.data.fileName}" alt="${s.data.altText}" />`);
                        break;
                    case `linkArticle`:
                        a.replaceWith(s.data.text);
                        break;
                    case `linkExternal`:
                        a.replaceWith(`<a href="${s.data.url}" target="_blank" rel="noopener">${s.data.text}</a>`);
                        break;
                    case `quote`:
                        a.replaceWith(s.data.markup);
                        break;
                    case `scribd`:
                        a.replaceWith(`<a href="${s.data.url}" target="_blank" rel="noopener">View on Scribd</a>`);
                        break;
                    case `twitter`:
                        a.replaceWith(`<a href="${s.data.url}">${s.data.url}</a>`);
                        break;
                    default:
                        throw Error(`Unknown placeholder type: ${s?.type} in ${n}`);
                }
            }),
            r.html()
        );
    };
export { r as n, n as r, i as t };
