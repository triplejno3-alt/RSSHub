import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './question-description-DdbkJM7Z.mjs';
const n = `https://leetcode.cn`,
    r = { path: `/dailyquestion/cn`, radar: [{ source: [`leetcode.cn/`] }], name: `Unknown`, maintainers: [], handler: i, url: `leetcode.cn/` };
async function i() {
    let r = { date: ``, link: ``, titleSlug: ``, content: ``, frontedId: ``, difficulty: ``, tags: `` },
        i = n + `/graphql`,
        a = {
            query: `query questionOfToday {
            todayRecord {
                date
                question {
                    frontendQuestionId: questionFrontendId
                    titleSlug
                }
            }
        } `,
            variables: {},
        },
        o = (await e({ method: `post`, url: i, headers: { 'content-type': `application/json` }, body: JSON.stringify(a) })).data.data.todayRecord[0];
    ((r.date = o.date), (r.titleSlug = o.question.titleSlug), (r.link = n + `/problems/` + r.titleSlug));
    let s = {
            operationName: `questionData`,
            query: `query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                questionFrontendId
                title
                titleSlug
                content
                translatedTitle
                translatedContent
                difficulty
                topicTags {
                    name
                    slug
                    translatedName
                    __typename
                }
                __typename
            }
        }`,
            variables: { titleSlug: r.titleSlug },
        },
        c = await e({ method: `post`, url: i, headers: { 'content-type': `application/json` }, body: JSON.stringify(s) }),
        l = { Medium: `🟡`, Easy: `🟢`, Hard: `🔴` },
        u = c.data.data.question;
    ((r.content = u.translatedContent), (r.frontedId = u.questionFrontendId), (r.difficulty = l[u.difficulty]));
    let d = u.topicTags;
    ((d = d.map((e) => {
        let t = `#` + e.slug;
        return ((t = t.replaceAll(`-`, `_`)), t);
    })),
        (r.tags = d.join(` `)));
    let f = { title: r.frontedId + `.` + r.titleSlug, description: t({ question: r }), link: r.link };
    return { title: `LeetCode 每日一题`, link: `https://leetcode.cn`, description: `Leetcode 每日一题`, item: [{ title: f.title, description: f.description + r.content, link: f.link }] };
}
export { r as route };
