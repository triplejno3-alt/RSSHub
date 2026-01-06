import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = { path: `/nsfw`, radar: [{ source: [`ahhhhfs.com/`], target: `` }], name: `存档列表 - NSFW`, maintainers: [`zhenhappy`], handler: r, url: `ahhhhfs.com/`, features: { nsfw: !0 } };
async function r(n) {
    return {
        title: `ahhhhfs-A姐分享NSFW`,
        link: `https://nsfw.ahhhhfs.com/articles-archive`,
        description: `A姐分享NSFW，分享各种网络云盘资源、BT种子、磁力链接、高清电影电视剧和羊毛福利，收集各种有趣实用的软件和APP的下载、安装、使用方法，发现一些稀奇古怪的的网站，折腾一些有趣实用的教程，关注谷歌苹果等互联网最新的资讯动态，探索新领域，发现新美好，分享小快乐。`,
        item: (await t({ method: `get`, url: `https://nsfw.abskoop.com/wp-json/wp/v2/posts`, searchParams: { per_page: n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`)) : 10, _embed: `` } })).data.map((t) => ({
            title: t.title.rendered,
            description: t.content.rendered,
            link: t.link,
            pubDate: e(t.date_gmt),
            updated: e(t.modified_gmt),
            author: t._embedded.author[0].name,
            category: [...new Set(t._embedded[`wp:term`].flatMap((e) => e.map((e) => e.name)))],
        })),
    };
}
export { n as route };
