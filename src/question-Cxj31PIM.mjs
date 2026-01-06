import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './utils-CAAmnNMo.mjs';
const a = {
    path: `/question/:questionId/:sortBy?`,
    categories: [`social-media`],
    example: `/zhihu/question/59895982`,
    parameters: { questionId: `问题 id`, sortBy: '排序方式：`default`, `created`, `updated`。默认为 `default`' },
    features: { requireConfig: [{ name: `ZHIHU_COOKIES`, description: ``, optional: !0 }], requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.zhihu.com/question/:questionId`], target: `/question/:questionId` }],
    name: `问题`,
    maintainers: [],
    handler: o,
};
async function o(a) {
    let { questionId: o, sortBy: s = `default` } = a.req.param(),
        c = `/api/v4/questions/${o}/answers?${new URLSearchParams({ include: `data[*].is_normal,admin_closed_comment,reward_info,is_collapsed,annotation_action,annotation_detail,collapse_reason,is_sticky,collapsed_by,suggest_edit,comment_count,can_comment,content,editable_content,attachment,voteup_count,reshipment_settings,comment_permission,created_time,updated_time,review_info,relevant_info,question,excerpt,is_labeled,paid_info,paid_info_content,relationship.is_authorized,is_author,voting,is_thanked,is_nothelp,is_recognized;data[*].mark_infos[*].url;data[*].author.follower_count,badge[*].topics;data[*].settings.table_of_content.enabled&offset=0`, limit: `20`, sort_by: s, platform: `desktop` })}`,
        l = await i(`https://www.zhihu.com/question/${o}`, c),
        u = (await t({ method: `get`, url: `https://www.zhihu.com` + c, headers: { ...n, ...l, Referer: `https://www.zhihu.com/question/${o}` } })).data.data;
    return {
        title: `知乎-${u[0].question.title}`,
        link: `https://www.zhihu.com/question/${o}`,
        item: u.map((t) => ({
            title: `${t.author.name}的回答：${t.excerpt}`,
            description: `${t.author.name}的回答<br/><br/>${r(t.content)}`,
            author: t.author.name,
            pubDate: e(t.updated_time * 1e3),
            guid: t.id.toString(),
            link: `https://www.zhihu.com/question/${o}/answer/${t.id}`,
        })),
    };
}
export { a as route };
