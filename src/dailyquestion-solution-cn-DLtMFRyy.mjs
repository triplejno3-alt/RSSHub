import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{t as n}from"./timezone-CrV-DT8S.mjs";import r from"markdown-it";const i=r({html:!0,breaks:!0}),a={path:`/dailyquestion/solution/cn`,radar:[{source:[`leetcode.cn/`]}],name:`Unknown`,maintainers:[],handler:o,url:`leetcode.cn/`};async function o(){let r=`https://leetcode.cn`,a=`${r}/graphql/`,o={"content-type":`application/json`},s={Medium:`🟡`,Easy:`🟢`,Hard:`🔴`},c=(await t({method:`post`,url:a,json:{operationName:`questionOfToday`,query:`query questionOfToday {
                            todayRecord {
                                date
                                userStatus
                                question {
                                    questionId
                                    frontendQuestionId: questionFrontendId
                                    difficulty
                                    title
                                    titleCn: translatedTitle
                                    titleSlug
                                }
                            }
                        }`,variables:{}},headers:o})).data.data,l=c.todayRecord[0].question.titleSlug,u=`${r}/problems/${l}/`,d=(await t({method:`post`,url:a,json:{operationName:`questionData`,query:`query questionData($titleSlug: String!) {
                            question(titleSlug: $titleSlug) {
                                questionId
                                questionFrontendId
                                categoryTitle
                                boundTopicId
                                title
                                titleSlug
                                content
                                translatedTitle
                                translatedContent
                                isPaidOnly
                                difficulty
                                likes
                            }
                        }`,variables:{titleSlug:l}},headers:o})).data.data.question,f=s[d.difficulty]||``,p=(await t({method:`post`,url:a,json:{operationName:`questionSolutionArticles`,query:`query questionSolutionArticles($questionSlug: String!, $skip: Int, $first: Int, $orderBy: SolutionArticleOrderBy, $userInput: String, $tagSlugs: [String!]) {
                            questionSolutionArticles(questionSlug: $questionSlug, skip: $skip, first: $first, orderBy: $orderBy, userInput: $userInput, tagSlugs: $tagSlugs) {
                                totalNum
                                edges {
                                    node {
                                    ...solutionArticle
                                    __typename
                                    }
                                    __typename
                                }
                                __typename
                            }
                        }
                        fragment solutionArticle on SolutionArticleNode {
                            uuid
                            title
                            slug
                            createdAt
                            thumbnail
                            author {
                                username
                            }
                            summary
                        }`,variables:{questionSlug:l,first:3,skip:0,orderBy:`MOST_UPVOTE`}},headers:o})).data.data.questionSolutionArticles.edges,m=(await Promise.all(p.map(e=>t({method:`post`,url:a,json:{operationName:`solutionDetailArticle`,query:`query solutionDetailArticle($slug: String!, $orderBy: SolutionArticleOrderBy!) {
                                    solutionArticle(slug: $slug, orderBy: $orderBy) {
                                        ...solutionArticle
                                        content
                                        question {
                                            questionTitleSlug
                                            __typename
                                        }
                                    }
                                }
                                fragment solutionArticle on SolutionArticleNode {
                                    uuid
                                    title
                                    slug
                                    createdAt
                                    thumbnail
                                    author {
                                        username
                                    }
                                    summary
                                }`,variables:{slug:e.node.slug,orderBy:`DEFAULT`}},headers:o})))).map(e=>e.data.data.solutionArticle),h=e=>(e=e.replaceAll(/(```)([\d#+A-Za-z-]+)\s*?(\[.*?])?\n/g,`\r
###$2\r
$1$2\r
`),e);return{title:`LeetCode 每日一题题解`,description:`LeetCode 每日一题题解`,link:u,item:[{title:`每日一题-${d.translatedTitle}${f}`,link:u,description:d.translatedContent,pubDate:n(e(c.todayRecord[0].date),8)},...m.map((t,r)=>({title:t.title,link:`${u}/solution/${t.slug}`,description:i.render(h(t.content)),pubDate:n(e(p[r].node.createdAt),8),author:t.author.username}))]}}export{a as route};