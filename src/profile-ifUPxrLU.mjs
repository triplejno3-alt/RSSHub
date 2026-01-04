import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./got-CKQ7C9HX.mjs";const t={path:`/profile/:handle`,categories:[`social-media`],example:`/lens/profile/stani`,parameters:{handle:`Lens handle`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`hey.xyz/u/:handle`],target:`/profile/:handle`}],name:`Lens Profile`,maintainers:[`DIYgod`],handler:n};async function n(t){let n=t.req.param(`handle`),r=(await e(`https://api-v2.lens.dev/`,{method:`POST`,json:{operationName:`Profile`,variables:{request:{forHandle:`lens/${n}`}},query:`query Profile($request: ProfileRequest!) {
  profile(request: $request) {
    ...ProfileFields
    __typename
  }
}

fragment AmountFields on Amount {
  asFiat(request: {for: USD}) {
    value
    __typename
  }
  asset {
    ...Erc20Fields
    __typename
  }
  value
  __typename
}

fragment Erc20Fields on Asset {
  ... on Erc20 {
    name
    symbol
    decimals
    contract {
      ...NetworkAddressFields
      __typename
    }
    __typename
  }
  __typename
}

fragment FollowModuleFields on FollowModule {
  ... on FeeFollowModuleSettings {
    type
    amount {
      ...AmountFields
      __typename
    }
    recipient
    __typename
  }
  ... on RevertFollowModuleSettings {
    type
    __typename
  }
  ... on UnknownFollowModuleSettings {
    type
    __typename
  }
  __typename
}

fragment HandleInfoFields on HandleInfo {
  fullHandle
  localName
  linkedTo {
    nftTokenId
    __typename
  }
  __typename
}

fragment ImageSetFields on ImageSet {
  optimized {
    uri
    __typename
  }
  raw {
    uri
    __typename
  }
  __typename
}

fragment MetadataAttributeFields on MetadataAttribute {
  type
  key
  value
  __typename
}

fragment NetworkAddressFields on NetworkAddress {
  address
  chainId
  __typename
}

fragment ProfileFields on Profile {
  id
  handle {
    ...HandleInfoFields
    __typename
  }
  ownedBy {
    ...NetworkAddressFields
    __typename
  }
  signless
  sponsor
  createdAt
  stats {
    ...ProfileStatsFields
    __typename
  }
  operations {
    ...ProfileOperationsFields
    __typename
  }
  interests
  followNftAddress {
    ...NetworkAddressFields
    __typename
  }
  followModule {
    ...FollowModuleFields
    __typename
  }
  metadata {
    ...ProfileMetadataFields
    __typename
  }
  __typename
}

fragment ProfileMetadataFields on ProfileMetadata {
  displayName
  bio
  picture {
    ... on ImageSet {
      ...ImageSetFields
      __typename
    }
    __typename
  }
  coverPicture {
    ...ImageSetFields
    __typename
  }
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  __typename
}

fragment ProfileOperationsFields on ProfileOperations {
  id
  isBlockedByMe {
    value
    __typename
  }
  isFollowedByMe {
    value
    __typename
  }
  isFollowingMe {
    value
    __typename
  }
  __typename
}

fragment ProfileStatsFields on ProfileStats {
  id
  followers
  following
  publications
  comments
  posts
  mirrors
  quotes
  lensClassifierScore
  __typename
}`}})).data.data.profile,i=(await e(`https://api-v2.lens.dev/`,{method:`POST`,json:{operationName:`Publications`,variables:{request:{limit:`TwentyFive`,where:{metadata:null,publicationTypes:[`POST`,`MIRROR`,`QUOTE`],from:[r.id]}}},query:`query Publications($request: PublicationsRequest!) {
  publications(request: $request) {
    items {
      ... on Post {
        ...PostFields
        __typename
      }
      ... on Comment {
        ...CommentFields
        __typename
      }
      ... on Mirror {
        ...MirrorFields
        __typename
      }
      ... on Quote {
        ...QuoteFields
        __typename
      }
      __typename
    }
    pageInfo {
      next
      __typename
    }
    __typename
  }
}

fragment AmountFields on Amount {
  asFiat(request: {for: USD}) {
    value
    __typename
  }
  asset {
    ...Erc20Fields
    __typename
  }
  value
  __typename
}

fragment AnyPublicationMetadataFields on PublicationMetadata {
  ... on VideoMetadataV3 {
    ...VideoMetadataV3Fields
    __typename
  }
  ... on ArticleMetadataV3 {
    ...ArticleMetadataV3Fields
    __typename
  }
  ... on AudioMetadataV3 {
    ...AudioMetadataV3Fields
    __typename
  }
  ... on ImageMetadataV3 {
    ...ImageMetadataV3Fields
    __typename
  }
  ... on LinkMetadataV3 {
    ...LinkMetadataV3Fields
    __typename
  }
  ... on LiveStreamMetadataV3 {
    ...LiveStreamMetadataV3Fields
    __typename
  }
  ... on MintMetadataV3 {
    ...MintMetadataV3Fields
    __typename
  }
  ... on TextOnlyMetadataV3 {
    ...TextOnlyMetadataV3Fields
    __typename
  }
  ... on CheckingInMetadataV3 {
    ...CheckingInMetadataV3Fields
    __typename
  }
  __typename
}

fragment CommentBaseFields on Comment {
  id
  publishedOn {
    id
    __typename
  }
  isHidden
  isEncrypted
  momoka {
    proof
    __typename
  }
  createdAt
  by {
    ...PublicationProfileFields
    __typename
  }
  stats {
    ...PublicationStatsFields
    __typename
  }
  operations {
    ...PublicationOperationFields
    __typename
  }
  metadata {
    ...AnyPublicationMetadataFields
    __typename
  }
  openActionModules {
    ...OpenActionModulesFields
    __typename
  }
  root {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Quote {
      ...QuoteBaseFields
      __typename
    }
    __typename
  }
  profilesMentioned {
    snapshotHandleMentioned {
      ...HandleInfoFields
      __typename
    }
    __typename
  }
  __typename
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  commentOn {
    ...CommentOnFields
    ... on Comment {
      ...CommentBaseFields
      commentOn {
        ...CommentOnFields
        ... on Comment {
          ...CommentBaseFields
          commentOn {
            ...CommentOnFields
            ... on Comment {
              ...CommentBaseFields
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment CommentOnFields on PrimaryPublication {
  ... on Post {
    ...PostFields
    __typename
  }
  ... on Quote {
    ...QuoteBaseFields
    __typename
  }
  __typename
}

fragment EncryptableImageSetFields on EncryptableImageSet {
  optimized {
    uri
    __typename
  }
  __typename
}

fragment Erc20Fields on Asset {
  ... on Erc20 {
    name
    symbol
    decimals
    contract {
      ...NetworkAddressFields
      __typename
    }
    __typename
  }
  __typename
}

fragment HandleInfoFields on HandleInfo {
  fullHandle
  localName
  linkedTo {
    nftTokenId
    __typename
  }
  __typename
}

fragment ImageSetFields on ImageSet {
  optimized {
    uri
    __typename
  }
  raw {
    uri
    __typename
  }
  __typename
}

fragment MetadataAttributeFields on MetadataAttribute {
  type
  key
  value
  __typename
}

fragment MirrorFields on Mirror {
  id
  publishedOn {
    id
    __typename
  }
  isHidden
  momoka {
    proof
    __typename
  }
  createdAt
  by {
    ...PublicationProfileFields
    __typename
  }
  mirrorOn {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Comment {
      ...CommentFields
      __typename
    }
    ... on Quote {
      ...QuoteFields
      __typename
    }
    __typename
  }
  __typename
}

fragment NetworkAddressFields on NetworkAddress {
  address
  chainId
  __typename
}

fragment OpenActionModulesFields on OpenActionModule {
  ... on SimpleCollectOpenActionSettings {
    type
    contract {
      ...NetworkAddressFields
      __typename
    }
    amount {
      ...AmountFields
      __typename
    }
    collectNft
    collectLimit
    followerOnly
    recipient
    referralFee
    endsAt
    __typename
  }
  ... on MultirecipientFeeCollectOpenActionSettings {
    type
    contract {
      ...NetworkAddressFields
      __typename
    }
    amount {
      ...AmountFields
      __typename
    }
    collectNft
    collectLimit
    referralFee
    followerOnly
    endsAt
    recipients {
      recipient
      split
      __typename
    }
    __typename
  }
  __typename
}

fragment PostFields on Post {
  id
  publishedOn {
    id
    __typename
  }
  isHidden
  isEncrypted
  momoka {
    proof
    __typename
  }
  createdAt
  by {
    ...PublicationProfileFields
    __typename
  }
  stats {
    ...PublicationStatsFields
    __typename
  }
  operations {
    ...PublicationOperationFields
    __typename
  }
  metadata {
    ...AnyPublicationMetadataFields
    __typename
  }
  openActionModules {
    ...OpenActionModulesFields
    __typename
  }
  profilesMentioned {
    snapshotHandleMentioned {
      ...HandleInfoFields
      __typename
    }
    __typename
  }
  __typename
}

fragment ProfileMetadataFields on ProfileMetadata {
  displayName
  bio
  picture {
    ... on ImageSet {
      ...ImageSetFields
      __typename
    }
    __typename
  }
  coverPicture {
    ...ImageSetFields
    __typename
  }
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  __typename
}

fragment ProfileOperationsFields on ProfileOperations {
  id
  isBlockedByMe {
    value
    __typename
  }
  isFollowedByMe {
    value
    __typename
  }
  isFollowingMe {
    value
    __typename
  }
  __typename
}

fragment PublicationOperationFields on PublicationOperations {
  isNotInterested
  hasBookmarked
  hasActed {
    value
    __typename
  }
  hasReacted(request: {type: UPVOTE})
  canMirror
  hasMirrored
  hasQuoted
  __typename
}

fragment PublicationProfileFields on Profile {
  id
  handle {
    ...HandleInfoFields
    __typename
  }
  operations {
    ...ProfileOperationsFields
    __typename
  }
  ownedBy {
    ...NetworkAddressFields
    __typename
  }
  metadata {
    ...ProfileMetadataFields
    __typename
  }
  __typename
}

fragment PublicationStatsFields on PublicationStats {
  id
  comments
  mirrors
  quotes
  reactions(request: {type: UPVOTE})
  countOpenActions(request: {anyOf: [{category: COLLECT}]})
  bookmarks
  __typename
}

fragment QuoteBaseFields on Quote {
  id
  publishedOn {
    id
    __typename
  }
  isHidden
  isEncrypted
  momoka {
    proof
    __typename
  }
  createdAt
  by {
    ...PublicationProfileFields
    __typename
  }
  stats {
    ...PublicationStatsFields
    __typename
  }
  operations {
    ...PublicationOperationFields
    __typename
  }
  metadata {
    ...AnyPublicationMetadataFields
    __typename
  }
  openActionModules {
    ...OpenActionModulesFields
    __typename
  }
  profilesMentioned {
    snapshotHandleMentioned {
      ...HandleInfoFields
      __typename
    }
    __typename
  }
  __typename
}

fragment QuoteFields on Quote {
  ...QuoteBaseFields
  quoteOn {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Comment {
      ...CommentBaseFields
      __typename
    }
    ... on Quote {
      ...QuoteBaseFields
      __typename
    }
    __typename
  }
  __typename
}

fragment ArticleMetadataV3Fields on ArticleMetadataV3 {
  id
  content
  tags
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  attachments {
    ...PublicationMetadataMediaFields
    __typename
  }
  __typename
}

fragment AudioMetadataV3Fields on AudioMetadataV3 {
  id
  title
  content
  tags
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  asset {
    ...PublicationMetadataMediaAudioFields
    __typename
  }
  attachments {
    ...PublicationMetadataMediaFields
    __typename
  }
  __typename
}

fragment CheckingInMetadataV3Fields on CheckingInMetadataV3 {
  id
  content
  tags
  location
  geographic {
    latitude
    longitude
    __typename
  }
  address {
    country
    locality
    postalCode
    __typename
  }
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  attachments {
    ...PublicationMetadataMediaFields
    __typename
  }
  __typename
}

fragment ImageMetadataV3Fields on ImageMetadataV3 {
  id
  content
  tags
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  attachments {
    ...PublicationMetadataMediaFields
    __typename
  }
  asset {
    ...PublicationMetadataMediaImageFields
    __typename
  }
  __typename
}

fragment LinkMetadataV3Fields on LinkMetadataV3 {
  id
  content
  sharingLink
  tags
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  attachments {
    ...PublicationMetadataMediaFields
    __typename
  }
  __typename
}

fragment LiveStreamMetadataV3Fields on LiveStreamMetadataV3 {
  id
  playbackURL
  liveURL
  content
  tags
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  attachments {
    ...PublicationMetadataMediaFields
    __typename
  }
  __typename
}

fragment MintMetadataV3Fields on MintMetadataV3 {
  id
  content
  tags
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  attachments {
    ...PublicationMetadataMediaFields
    __typename
  }
  __typename
}

fragment TextOnlyMetadataV3Fields on TextOnlyMetadataV3 {
  id
  content
  tags
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  __typename
}

fragment VideoMetadataV3Fields on VideoMetadataV3 {
  id
  content
  tags
  attributes {
    ...MetadataAttributeFields
    __typename
  }
  asset {
    ...PublicationMetadataMediaVideoFields
    __typename
  }
  attachments {
    ...PublicationMetadataMediaFields
    __typename
  }
  __typename
}

fragment PublicationMetadataMediaAudioFields on PublicationMetadataMediaAudio {
  artist
  audio {
    optimized {
      uri
      __typename
    }
    __typename
  }
  cover {
    ...EncryptableImageSetFields
    __typename
  }
  license
  __typename
}

fragment PublicationMetadataMediaFields on PublicationMetadataMedia {
  ... on PublicationMetadataMediaVideo {
    ...PublicationMetadataMediaVideoFields
    __typename
  }
  ... on PublicationMetadataMediaImage {
    ...PublicationMetadataMediaImageFields
    __typename
  }
  ... on PublicationMetadataMediaAudio {
    ...PublicationMetadataMediaAudioFields
    __typename
  }
  __typename
}

fragment PublicationMetadataMediaImageFields on PublicationMetadataMediaImage {
  image {
    ...EncryptableImageSetFields
    __typename
  }
  __typename
}

fragment PublicationMetadataMediaVideoFields on PublicationMetadataMediaVideo {
  video {
    optimized {
      uri
      __typename
    }
    __typename
  }
  cover {
    ...EncryptableImageSetFields
    __typename
  }
  license
  __typename
}`}})).data.data.publications.items;return{title:`${r.metadata.displayName} on Lens`,link:`https://hey.xyz/u/${n}`,item:i.map(e=>{let t=e.mirrorOn||e;return{title:t.metadata?.content||`No content`,description:`${e.mirrorOn?`Mirrored: `:``}${t.metadata?.content||``} ${t.metadata?.asset?.image?.optimized?.uri?`<img src="${t.metadata?.asset?.image?.optimized?.uri}" />`:``}`,link:`https://hey.xyz/posts/${e.id}`,pubDate:new Date(e.createdAt).toUTCString(),guid:e.id}})}}export{t as route};