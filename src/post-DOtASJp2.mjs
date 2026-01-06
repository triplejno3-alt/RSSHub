import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/post/:postid`,
    categories: [`bbs`],
    example: `/v2ex/post/584403`,
    parameters: { postid: `帖子ID，在 URL 可以找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`v2ex.com/t/:postid`] }],
    name: `帖子`,
    maintainers: [`kt286`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`postid`),
        i = `https://www.v2ex.com/t/${r}`,
        { data: a } = await t(`https://www.v2ex.com/api/topics/show.json`, { searchParams: { id: r } }),
        { data: o } = await t(`https://www.v2ex.com/api/replies/show.json`, { searchParams: { topic_id: r } }),
        s = a[0];
    return {
        title: `V2EX-${s.title}`,
        link: i,
        description: s.content,
        item: o.map((t, n) => ({ title: `#${n + 1} ${t.content}`, description: t.content_rendered, link: `${i}#r_${t.id}`, author: t.member.username, pubDate: e(t.created, `X`) })),
        allowEmpty: !0,
    };
}
export { n as route };
