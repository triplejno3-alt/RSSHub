import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./types-Bl_lnefZ.mjs";import{Fragment as i,jsx as a,jsxs as o}from"hono/jsx/jsx-runtime";import s from"node:crypto";import{renderToString as c}from"hono/jsx/dom/server";import{raw as l}from"hono/html";const u={path:`/:user/:type?`,categories:[`design`],view:r.Pictures,example:`/behance/mishapetrick`,parameters:{user:`username`,type:{description:`type`,options:[{value:`projects`,label:`projects`},{value:`appreciated`,label:`appreciated`}],default:`projects`}},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`User Works`,maintainers:[`MisteryMonster`],handler:p,description:"Behance user's profile URL, like [https://www.behance.net/mishapetrick](https://www.behance.net/mishapetrick) the username will be `mishapetrick`。"},d=async(e,n)=>await t.tryGet(`behance:profile:${n}`,()=>{let t=e.flatMap(e=>e.owners).find(e=>e.username===n);return Promise.resolve({displayName:t.displayName,id:t.id,link:t.url,image:t.images.size_50.url.replace(`/user/50/`,`/user/source/`)})}),f=(e,t)=>c(o(i,{children:[e?.length?o(i,{children:[e,a(`br`,{})]}):null,t?.map(e=>{if(e.__typename===`ImageModule`)return o(i,{children:[o(`figure`,{children:[a(`img`,{src:e.imageSizes?.allAvailable?.[0]?.url,alt:e.altText??void 0}),e.caption?.length?a(`figcaption`,{children:e.caption}):null]}),a(`br`,{})]});if(e.__typename===`TextModule`)return o(i,{children:[e.text?l(e.text):null,a(`br`,{})]});if(e.__typename===`MediaCollectionModule`)return o(i,{children:[e.components?.map(e=>a(`img`,{src:`https://mir-s3-cdn-cf.behance.net/project_modules/source/${e.filename}`,alt:``})),a(`br`,{})]});if(e.__typename===`EmbedModule`){let t=e.fluidEmbed||e.originalEmbed;return o(i,{children:[t?l(t):null,a(`br`,{})]})}return o(i,{children:[`UNHANDLED MODULE: `,e.__typename,a(`br`,{})]})})]}));async function p(r){let{user:i,type:a=`projects`}=r.req.param(),o=s.randomUUID(),c={Cookie:`gk_suid=${Math.random().toString().slice(2,10)}, gki=; originalReferrer=; bcp=${o}`,"X-BCP":o,"X-Requested-With":`XMLHttpRequest`},l=await e(`https://www.behance.net/v3/graphql`,{method:`POST`,headers:c,body:{query:a===`projects`?`query GetProfileProjectsAndSections($username: String, $after: String) {
    user(username: $username) {
      hasPortfolio
      profileSections {
        ...profileSectionFields
      }
      profileProjects(first: 12, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          __typename
          adminFlags {
            mature_lock
            privacy_lock
            dmca_lock
            flagged_lock
            privacy_violation_lock
            trademark_lock
            spam_lock
            eu_ip_lock
          }
          canBeBoosted
          colors {
            r
            g
            b
          }
          covers {
            size_202 {
              url
            }
            size_404 {
              url
            }
            size_808 {
              url
            }
          }
          features {
            url
            name
            featuredOn
            ribbon {
              image
              image2x
              image3x
            }
          }
          fields {
            id
            label
            slug
            url
          }
          hasMatureContent
          id
          isBoosted
          isFeatured
          isHiddenFromWorkTab
          isMatureReviewSubmitted
          isMonaReported
          isOwner
          isFounder
          isPinnedToSubscriptionOverview
          isPrivate
          sourceFiles {
            ...sourceFileWithCoverFields
          }
          matureAccess
          modifiedOn
          name
          owners {
            ...OwnerFields
            images {
              size_50 {
                url
              }
            }
          }
          premium
          publishedOn
          privacyLevel
          profileSectionId
          stats {
            appreciations {
              all
            }
            views {
              all
            }
            comments {
              all
            }
          }
          slug
          url
        }
      }
    }
    viewer {
      flags {
        hasClickedOnAddProfileSectionButton
        hasSeenProfilePortfolioUpsellModal
        hasSeenCreatorProIntroModal
        lastSeenMarketingPopupTimestamp
        onboardedAsHirer
      }
    }
  }
  
  fragment sourceFileWithCoverFields on SourceFile {
    __typename
    sourceFileId
    projectId
    userId
    title
    assetId
    renditionUrl
    mimeType
    size
    category
    licenseType
    unitAmount
    currency
    tier
    hidden
    extension
    hasUserPurchased
    description
    cover {
      coverUrl
      coverX
      coverY
      coverScale
    }
  }
  
  fragment OwnerFields on User {
    displayName
    hasPremiumAccess
    id
    isFollowing
    isProfileOwner
    location
    locationUrl
    url
    username
    isMessageButtonVisible
    availabilityInfo {
      availabilityTimeline
      isAvailableFullTime
      isAvailableFreelance
      hiringTimeline {
        key
        label
      }
    }
    creatorPro {
      isActive
      initialSubscriptionDate
    }
  }
  
  fragment profileSectionFields on ProfileSection {
    id
    isDefault
    name
    order
    projectCount
    userId
  }`:`query GetAppreciatedProjects($username: String, $after: String) {
    user(username: $username) {
      appreciatedProjects(first: 24, after: $after) {
        nodes {
          __typename
          colors {
            r
            g
            b
          }
          covers {
            size_202 {
              url
            }
            size_404 {
              url
            }
            size_808 {
              url
            }
          }
          slug
          id
          name
          url
          owners {
            ...OwnerFields
            images {
              size_50 {
                url
              }
            }
          }
          stats {
            appreciations {
              all
            }
            views {
              all
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  fragment OwnerFields on User {
    displayName
    hasPremiumAccess
    id
    isFollowing
    isProfileOwner
    location
    locationUrl
    url
    username
    isMessageButtonVisible
    availabilityInfo {
      availabilityTimeline
      isAvailableFullTime
      isAvailableFreelance
      hiringTimeline {
        key
        label
      }
    }
    creatorPro {
      isActive
      initialSubscriptionDate
    }
  }`,variables:{username:i,after:``}}}),u=a===`projects`?l.data.user.profileProjects.nodes:l.data.user.appreciatedProjects.nodes,p=u.map(e=>({title:e.name,link:e.url,author:e.owners.map(e=>e.displayName).join(`, `),image:e.covers.size_202.url.replace(`/202/`,`/source/`),pubDate:e.publishedOn?n(e.publishedOn,`X`):void 0,category:e.fields?.map(e=>e.label.toLowerCase()),projectId:e.id})),m=await d(u,i),h=await Promise.all(p.map(r=>t.tryGet(r.link,async()=>{let t=(await e(`https://www.behance.net/v3/graphql`,{method:`POST`,headers:c,body:{query:`query ProjectPage($projectId: ProjectId!, $projectPassword: String) {
    viewer {
      ...Project_Viewer
    }
    project(id: $projectId) {
      id
      slug
      premium
      isPrivate
      isOwner
      canvasWidth
      embedTag
      url
      stylesInline
      ...Project_Project
      ...EmbedShareModal_Project
      creator {
        hasPremiumAccess
      }
      owners {
        id
        username
        displayName
      }
      allModules(projectPassword: $projectPassword) {
        __typename
      }
    }
  }
  fragment Avatar_UserImageSizes on UserImageSizes {
    ...AvatarImage_UserImageSizes
  }
  fragment Avatar_User on User {
    id
    url
    images {
      ...Avatar_UserImageSizes
    }
    creatorPro {
      isActive
    }
    ...CreatorProBadge_User
  }
  fragment AvatarImage_UserImageSizes on UserImageSizes {
    allAvailable {
      url
      width
      type
    }
  }
  fragment CreatorProBadge_User on User {
    creatorPro {
      initialSubscriptionDate
    }
  }
  fragment EmbedShareModal_Project on Project {
    ...EmbedShareProjectCover_Project
  }
  fragment Feature_ProjectFeature on ProjectFeature {
    url
    name
    featuredOn
    ribbon {
      image
      image2x
    }
  }
  fragment HireOverlay_User on User {
    id
    firstName
    isResponsiveToHiring
    isMessageButtonVisible
    ...Avatar_User
    ...WideMessageButton_User
    availabilityInfo {
      hiringTimeline {
        key
      }
    }
  }
  fragment ProjectInfoBox_User on User {
    id
    displayName
    url
    isFollowing
    ...MultipleOwners_User
  }
  fragment ProjectInfoBox_Project on Project {
    id
    name
    url
    isOwner
    covers {
      allAvailable {
        url
        width
        type
      }
    }
    owners {
      ...ProjectInfoBox_User
    }
  }
  fragment SourceAssetsPane_SourceFile on SourceFile {
    ...SourceFileRowsContainer_SourceFile
  }
  fragment SourceFileRowsContainer_SourceFile on SourceFile {
    tier
    hasUserPurchased
    ...SourceFileRow_SourceFile
  }
  fragment UserInfo_User on User {
    displayName
    id
    location
    locationUrl
    url
    country
    isProfileOwner
    city
    state
    creatorPro {
      isActive
    }
    ...Avatar_User
  }
  fragment UsersTooltip_User on User {
    displayName
    id
    isFollowing
    isProfileOwner
    availabilityInfo {
      isAvailableFullTime
      isAvailableFreelance
    }
    ...UserInfo_User
  }
  fragment DominantColor_Colors on Colors {
    r
    g
    b
  }
  fragment Tools_Tool on Tool {
    id
    title
    url
    backgroundImage {
      size_original {
        url
      }
    }
    backgroundColor
    synonym {
      tagId
      name
      title
      downloadUrl
      iconUrl
    }
  }
  fragment HireMeForm_UserAvailabilityInfo on UserAvailabilityInfo {
    isAvailableFreelance
    isAvailableFullTime
    budgetMin
    currency
    compensationMin
    hiringTimeline {
      key
    }
  }
  fragment MessageDialogManager_User on User {
    id
    displayName
    username
    images {
      ...AvatarImage_UserImageSizes
    }
    creatorPro {
      isActive
    }
    ...SendRegularMessagePane_User
    ...ServicesPane_User
  }
  fragment SendRegularMessagePane_User on User {
    displayName
    availabilityInfo {
      ...HireMeForm_UserAvailabilityInfo
    }
  }
  fragment ServicesPane_User on User {
    id
    displayName
    ...InquireServiceModal_User
    ...ViewServiceInfoModal_User
  }
  fragment MessageManager_User on User {
    id
    isMessageButtonVisible
    displayName
    username
    ...MessageDialogManager_User
    availabilityInfo {
      availabilityTimeline
      isAvailableFullTime
      isAvailableFreelance
      hiringTimeline {
        key
      }
    }
  }
  fragment WideMessageButton_User on User {
    firstName
    ...MessageManager_User
  }
  fragment AppreciationNotification_Viewer on Viewer {
    url
  }
  fragment Avatar_Project_User on User {
    id
    ...Avatar_User
  }
  fragment ImageElement_ImageModule on ImageModule {
    id
    altText
    height
    width
    fullBleed
    imageSizes {
      allAvailable(type: [JPG, WEBP]) {
        url
        width
        height
        type
      }
      size_max_158 {
        url
      }
    }
  }
  fragment Module_ProjectModule on ProjectModule {
    ...Embed_ProjectModule
    ... on AudioModule {
      id
      caption
      captionAlignment
    }
    ... on VideoModule {
      id
      caption
      captionAlignment
    }
    ... on EmbedModule {
      id
      caption
      captionAlignment
    }
    ... on ImageModule {
      id
      ...ThreeD_ImageModule
      ...SingleImage_ImageModule
      ...Image_ImageModule
    }
    ... on MediaCollectionModule {
      id
      caption: captionPlain
      captionAlignment
      components {
        ...Actions_MediaCollectionComponent
        filename
        flexHeight
        flexWidth
        height
        width
        id
        imageSizes {
          allAvailable(type: [JPG, WEBP]) {
            url
            width
            height
            type
          }
        }
      }
      fullBleed
    }
    ... on TextModule {
      id
      text
      alignment
    }
  }
  fragment MultipleOwners_User on User {
    ...UsersTooltip_User
  }
  fragment MultipleOwners_Project on Project {
    id
    name
  }
  fragment Project_Owners_User on User {
    id
    displayName
    username
    firstName
    url
    isFollowing
    isMessageButtonVisible
    isCreatorPro
    creatorPro {
      isActive
    }
    ...UsersTooltip_User
    ...MultipleOwners_User
    ...Avatar_Project_User
    ...Avatar_User
    ...HireOverlay_User
  }
  fragment Project_Creator_User on User {
    id
    isProfileOwner
    isFollowing
    hasPremiumAccess
    hasAllowEmbeds
    url
    ...PaneHeader_User
  }
  fragment Project_ProjectCoverImageSizes on ProjectCoverImageSizes {
    allAvailable {
      url
      width
      type
    }
  }
  fragment Project_Tool on Tool {
    ...Tools_Tool
  }
  fragment Project_SourceFile on SourceFile {
    ...SourceFileRowsContainer_SourceFile
    ...SourceFilesProjectOverlay_SourceFile
    ...ProjectExtras_SourceFile
  }
  fragment Project_ProjectFeature on ProjectFeature {
    ...Feature_ProjectFeature
  }
  fragment Project_Project on Project {
    id
    slug
    name
    url
    description
    tags {
      id
      title
    }
    privacyLevel
    matureAccess
    canvasWidth
    isOwner
    hasMatureContent
    isPrivate
    publishedOn
    canBeAddedToMoodboard
    isMonaReported
    isAppreciated
    projectCTA {
      ctaType
      link {
        description
        url
        title
      }
      isDefaultCTA
    }
    ...MultipleOwners_Project
    ...ProjectInfoBox_Project
    ...ProjectLightbox_Project
    ...ProjectExtras_Project
    covers {
      ...Project_ProjectCoverImageSizes
    }
    sourceFiles {
      ...Project_SourceFile
    }
    creator {
      ...Project_Creator_User
    }
    owners {
      ...Project_Owners_User
    }
    tools {
      ...Project_Tool
    }
    allModules(projectPassword: $projectPassword) {
      ... on AudioModule {
        id
        fullBleed
        caption
      }
      ... on EmbedModule {
        id
        caption
      }
      ... on ImageModule {
        id
        fullBleed
        caption
        imageSizes {
          size_disp {
            url
          }
          size_disp_still {
            url
          }
        }
        ...Actions_ImageModule
      }
      ... on MediaCollectionModule {
        id
        fullBleed
        caption: captionPlain
        components {
          id
          imageSizes {
            size_disp {
              url
            }
            size_disp_still {
              url
            }
          }
          ...Actions_MediaCollectionComponent
        }
      }
      ... on TextModule {
        id
        fullBleed
      }
      ... on VideoModule {
        id
        fullBleed
        caption
      }
      ...Module_ProjectModule
    }
    aeroData {
      externalUrl
    }
    adminNotices {
      title
      body
      isReviewable
    }
    license {
      license
    }
    features {
      ...Project_ProjectFeature
    }
    stats {
      appreciations {
        all
      }
      views {
        all
      }
    }
    styles {
      spacing {
        projectTopMargin
      }
    }
    colors {
      r
      g
      b
    }
  }
  fragment Project_Viewer on Viewer {
    stats {
      appreciations
    }
    pulsePoints {
      displayFollow
      displayAppreciate
    }
    flags {
      hasSeenCreatorProIntroModal
      onboardedAsHirer
    }
    creatorPro {
      isActive
    }
    createdOn
    ...AppreciationNotification_Viewer
    ...ProjectExtras_Viewer
  }
  fragment ProjectComments_Viewer on Viewer {
    ...ProjectCommentInput_Viewer
    id
  }
  fragment ProjectCommentInput_Viewer on Viewer {
    url
    images {
      size_50 {
        url
      }
    }
  }
  fragment ProjectExtras_SourceFile on SourceFile {
    ...ProjectInfo_SourceFile
  }
  fragment ProjectExtras_Project on Project {
    isCommentingAllowed
  }
  fragment ProjectExtras_Viewer on Viewer {
    ...ProjectInfo_Viewer
  }
  fragment ProjectInfo_SourceFile on SourceFile {
    ...SourceAssetsPane_SourceFile
  }
  fragment ProjectInfo_Viewer on Viewer {
    id
    ...ProjectComments_Viewer
  }
  fragment ProjectLightbox_Project on Project {
    id
    slug
    isOwner
    ...ProjectInfoBox_Project
  }
  fragment SourceFilesProjectOverlay_SourceFile on SourceFile {
    hasUserPurchased
    ...SourceFileRow_SourceFile
  }
  fragment Video_VideoDisplay on VideoModule {
    captionPlain
    embed
    height
    id
    width
  }
  fragment Actions_ImageModule on ImageModule {
    id
    hasCaiData
    projectId
    src
    width
    projectId
    exifData {
      lens {
        ...Actions_exifDataValue
      }
      software {
        ...Actions_exifDataValue
      }
      makeAndModel {
        ...Actions_exifDataValue
      }
      focalLength {
        ...Actions_exifDataValue
      }
      iso {
        ...Actions_exifDataValue
      }
      location {
        ...Actions_exifDataValue
      }
      flash {
        ...Actions_exifDataValue
      }
      exposureMode {
        ...Actions_exifDataValue
      }
      shutterSpeed {
        ...Actions_exifDataValue
      }
      aperture {
        ...Actions_exifDataValue
      }
    }
  }
  fragment Actions_exifDataValue on exifDataValue {
    id
    searchValue
    label
    value
  }
  fragment Actions_MediaCollectionComponent on MediaCollectionComponent {
    id
  }
  fragment Audio_AudioModule on AudioModule {
    captionPlain
    embed
    fullBleed
    id
  }
  fragment Embed_ProjectModule on ProjectModule {
    ... on EmbedModule {
      ...ExternalEmbed_EmbedModule
    }
    ... on AudioModule {
      isDoneProcessing
      ...Audio_AudioModule
    }
    ... on VideoModule {
      isDoneProcessing
      ...Video_VideoModule
    }
  }
  fragment ExternalEmbed_EmbedModule on EmbedModule {
    captionPlain
    fluidEmbed
    embedModuleFullBleed: fullBleed
    height
    id
    originalEmbed
    originalHeight
    originalWidth
    width
    widthUnit
  }
  fragment Image_ImageModule on ImageModule {
    id
    caption
    captionAlignment
    fullBleed
    height
    width
    altText
    ...Actions_ImageModule
    ...ImageElement_ImageModule
  }
  fragment SingleImage_ImageModule on ImageModule {
    id
    caption
    captionAlignment
    fullBleed
    height
    width
    ...Actions_ImageModule
    ...ImageElement_ImageModule
  }
  fragment ThreeD_ImageModule on ImageModule {
    id
    altText
    threeDData {
      iframeUrl
    }
  }
  fragment Video_VideoModule on VideoModule {
    fullBleed
    id
    ...Video_VideoDisplay
  }
  fragment Avatar_EmbedFragment on User {
    id
    images {
      allAvailable {
        url
        width
      }
    }
    displayName
  }
  fragment EmbedShareProjectCover_SourceFile on SourceFile {
    ...PaidAndFreeAssetsCountBadge_Embed_SourceFile
  }
  fragment EmbedShareProjectCover_User on User {
    ...Avatar_EmbedFragment
  }
  fragment EmbedShareProjectCover_Project on Project {
    id
    isPrivate
    isPublished
    hasMatureContent
    creator {
      hasAllowEmbeds
    }
    colors {
      ...DominantColor_Colors
    }
    sourceFiles {
      ...EmbedShareProjectCover_SourceFile
    }
    name
    url
    covers {
      allAvailable {
        url
        width
        type
      }
      size_original_webp {
        url
        width
        type
      }
    }
    owners {
      url
      ...EmbedShareProjectCover_User
    }
  }
  fragment PaidAndFreeAssetsCountBadge_Embed_SourceFile on SourceFile {
    unitAmount
    tier
    hidden
  }
  fragment ViewServiceInfoModal_User on User {
    id
    displayName
    url
    images {
      size_50 {
        url
      }
    }
    creatorPro {
      isActive
    }
    ...CreatorProBadge_User
  }
  fragment InquireServiceModal_User on User {
    id
    displayName
    images {
      size_50 {
        url
      }
    }
    availabilityInfo {
      hiringTimeline {
        key
      }
    }
  }
  fragment SourceFileRow_SourceFile on SourceFile {
    assetId
    cover {
      coverUrl
    }
    title
    extension
    currency
    unitAmount
    renditionUrl
    hasUserPurchased
    tier
    sourceFileId
    projectId
    mimeType
    category
    licenseType
    size
  }
  fragment PaneHeader_User on User {
    id
    url
    displayName
    images {
      allAvailable {
        width
        url
        type
      }
    }
  }`,variables:{projectId:r.projectId}}})).data.project;return r.description=f(t.description,t.allModules),r.category=[...new Set([...r.category||[],...t.tags?.map(e=>e.title.toLowerCase())||[]])],r.pubDate=r.pubDate||(t.publishedOn?n(t.publishedOn,`X`):void 0),r})));return{title:`${m.displayName}'s ${a}`,link:`https://www.behance.net/${i}/${a}`,image:m.image,item:h}}export{u as route};