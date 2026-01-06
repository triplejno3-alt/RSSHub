import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
const o = {
        whole: { link: `/special/0001386F/rank_whole.html`, title: `全站` },
        news: { link: `/special/0001386F/rank_news.html`, title: `新闻` },
        entertainment: { link: `/special/0001386F/rank_ent.html`, title: `娱乐` },
        sports: { link: `/special/0001386F/rank_sports.html`, title: `体育` },
        money: { link: `https://money.163.com/special/002526BH/rank.html`, title: `财经` },
        tech: { link: `/special/0001386F/rank_tech.html`, title: `科技` },
        auto: { link: `/special/0001386F/rank_auto.html`, title: `汽车` },
        lady: { link: `/special/0001386F/rank_lady.html`, title: `女人` },
        house: { link: `/special/0001386F/rank_house.html`, title: `房产` },
        game: { link: `/special/0001386F/game_rank.html`, title: `游戏` },
        travel: { link: `/special/0001386F/rank_travel.html`, title: `旅游` },
        edu: { link: `/special/0001386F/rank_edu.html`, title: `教育` },
    },
    s = { hour: { index: 0, title: `1小时` }, day: { index: 1, title: `24小时` }, week: { index: 2, title: `本周` }, month: { index: 3, title: `本月` } },
    c = {
        path: `/news/rank/:category?/:type?/:time?`,
        categories: [`new-media`],
        example: `/163/news/rank/whole/click/day`,
        parameters: {
            category: `新闻分类，参见下表，默认为“全站”`,
            type: '排行榜类型，“点击榜”对应`click`，“跟贴榜”对应`follow`，默认为“点击榜”',
            time: '统计时间，“1小时”对应`hour`，“24小时”对应`day`，“本周”对应`week`，“本月”对应`month`，默认为“24小时”',
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `排行榜`,
        maintainers: [`nczitzk`],
        handler: l,
        description:
            '::: tip\n  全站新闻 **点击榜** 的统计时间仅包含 “24 小时”、“本周”、“本月”，不包含 “1 小时”。即可用的`time`参数为`day`、`week`、`month`。\n\n  其他分类 **点击榜** 的统计时间仅包含 “1 小时”、“24 小时”、“本周”。即可用的`time`参数为`hour`、`day`、`week`。\n\n  而所有分类（包括全站）的 **跟贴榜** 的统计时间皆仅包含 “24 小时”、“本周”、“本月”。即可用的`time`参数为`day`、`week`、`month`。\n:::\n\n  新闻分类：\n\n| 全站  | 新闻 | 娱乐          | 体育   | 财经  | 科技 | 汽车 | 女人 | 房产  | 游戏 | 旅游   | 教育 |\n| ----- | ---- | ------------- | ------ | ----- | ---- | ---- | ---- | ----- | ---- | ------ | ---- |\n| whole | news | entertainment | sports | money | tech | auto | lady | house | game | travel | edu  |',
    };
async function l(c) {
    let l = c.req.param(`category`) || `whole`,
        u = c.req.param(`type`) || `click`,
        d = c.req.param(`time`) || `day`,
        f = o[l];
    if (f) {
        if ((l !== `whole` && u === `click` && d === `month`) || (l === `whole` && u === `click` && d === `hour`) || (u === `follow` && d === `hour`))
            throw new r(`Bad timeRange range. See <a href="https://docs.rsshub.app/routes/new-media#wang-yi-xin-wen-pai-hang-bang">docs</a>`);
    } else throw new r(`Bad category. See <a href="https://docs.rsshub.app/routes/new-media#wang-yi-xin-wen-pai-hang-bang">docs</a>`);
    let p = l === `money` ? f.link : `https://news.163.com${f.link}`,
        m = await n({ method: `get`, url: p, responseType: `buffer` }),
        h = i(a.decode(m.data, `gbk`)),
        g = h(`div.tabContents`)
            .eq(s[d].index + (l === `whole` ? (u === `click` ? -1 : 2) : u === `click` ? 0 : 2))
            .find(`table tbody tr td a`)
            .toArray()
            .map((e) => ((e = h(e)), { link: e.attr(`href`) })),
        _ = await Promise.all(
            g.map((r) =>
                e.tryGet(r.link, async () => {
                    try {
                        let e;
                        e =
                            l === `auto` || l === `house` || l === `travel`
                                ? `https://3g.163.com/${r.link.split(`.163.com`)[0].split(`//`).pop().split(`.`).pop()}/article/${r.link.split(`/`).pop()}`
                                : `https://3g.163.com${new URL(r.link).pathname}`;
                        let a = i((await n({ method: `get`, url: e })).data);
                        (a(`.bot_word, .js-open-app, .s-img`).remove(),
                            a(`video`).each(function () {
                                a(this).attr(`src`, a(this).attr(`data-src`));
                            }),
                            a(`.article-body .image-lazy`).each((e, t) => {
                                t.attribs.src = t.attribs[`data-src`] ?? t.attribs.src;
                            }),
                            (r.title = a(`meta[property="og:title"]`).attr(`content`).replace(`_手机网易网`, ``)),
                            (r.pubDate = t(a(`meta[property="og:release_date"]`).attr(`content`))),
                            (r.description = a(`.article-body`).html()));
                    } catch {
                        return ``;
                    }
                    return r;
                })
            )
        );
    return { title: `网易新闻${s[d].title}${u === `click` ? `点击` : `跟帖`}榜 - ${f.title}`, link: p, item: _.filter(Boolean) };
}
export { c as route };
