import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { r as n } from './utils-Bu8-ZFdB.mjs';
import { t as r } from './cache-BV7o58Cb.mjs';
const i = {
        path: `/vsearch/:kw/:order?/:embed?/:tid?`,
        categories: [`social-media`],
        example: `/bilibili/vsearch/RSSHub`,
        parameters: { kw: `检索关键字`, order: `排序方式, 综合:totalrank 最多点击:click 最新发布:pubdate(缺省) 最多弹幕:dm 最多收藏:stow`, embed: `默认为开启内嵌视频, 任意值为关闭`, tid: `分区 id` },
        features: {
            requireConfig: [
                {
                    name: `BILIBILI_COOKIE_*`,
                    optional: !0,
                    description:
                        '如果没有此配置，那么必须开启 puppeteer 支持；BILIBILI_COOKIE_{uid}: 用于用户关注动态系列路由，对应 uid 的 b 站用户登录后的 Cookie 值，`{uid}` 替换为 uid，如 `BILIBILI_COOKIE_2267573`，获取方式：\n1.  打开 [https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=0&type=8](https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=0&type=8)\n2.  打开控制台，切换到 Network 面板，刷新\n3.  点击 dynamic_new 请求，找到 Cookie\n4.  视频和专栏，UP 主粉丝及关注只要求 `SESSDATA` 字段，动态需复制整段 Cookie',
                },
            ],
            requirePuppeteer: !1,
            antiCrawler: !1,
            supportBT: !1,
            supportPodcast: !1,
            supportScihub: !1,
        },
        name: `视频搜索`,
        maintainers: [`pcrtool`, `DIYgod`],
        handler: o,
        description: `分区 id 的取值请参考下表：

| 全部分区 | 动画 | 番剧 | 国创 | 音乐 | 舞蹈 | 游戏 | 知识 | 科技 | 运动 | 汽车 | 生活 | 美食 | 动物圈 | 鬼畜 | 时尚 | 资讯 | 娱乐 | 影视 | 纪录片 | 电影 | 电视剧 |
| -------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ------ | ---- | ---- | ---- | ---- | ---- | ------ | ---- | ------ |
| 0        | 1    | 13   | 167  | 3    | 129  | 4    | 36   | 188  | 234  | 223  | 160  | 211  | 217    | 119  | 155  | 202  | 5    | 181  | 177    | 23   | 11     |`,
    },
    a = (e, t = !0) => {
        if (!t) return ``;
        let r = e?.aid,
            i = e?.bvid;
        return r === void 0 && i === void 0 ? `` : n.renderUGCDescription(t, ``, ``, r, void 0, i);
    };
async function o(n) {
    let i = n.req.param(`kw`),
        o = n.req.param(`order`) || `pubdate`,
        s = !n.req.param(`embed`),
        c = encodeURIComponent(i),
        l = n.req.param(`tid`) ?? 0,
        u = await r.getCookie(),
        d = (
            await t(`https://api.bilibili.com/x/web-interface/search/type`, {
                headers: { Referer: `https://search.bilibili.com/all?keyword=${c}`, Cookie: u },
                searchParams: { search_type: `video`, highlight: 1, keyword: i, order: o, tids: l },
            })
        ).data.data.result;
    return {
        title: `${i} - bilibili`,
        link: `https://search.bilibili.com/all?keyword=${i}&order=${o}`,
        description: `Result from ${i} bilibili search, ordered by ${o}.`,
        item: d.map((t) => {
            let n = t.duration
                    .split(`:`)
                    .map((e) => [e.length > 1 ? e : (`00` + e).slice(-2)])
                    .join(`:`),
                r = t.description.replaceAll(
                    `
`,
                    `<br/>`
                ),
                i = t.pic.replaceAll(/^\/\//g, `http://`);
            return {
                title: t.title.replaceAll(/<[ /]?em[^>]*>/g, ``),
                author: t.author,
                category: [...t.tag.split(`,`), t.typename],
                description:
                    `Length: ${n}<br/>AuthorID: ${t.mid}<br/>Play: ${t.play}    Favorite: ${t.favorites}<br/>Danmaku: ${t.video_review}    Comment: ${t.review}<br/><br/>${r}<br/><img src="${i}"><br/>Match By: ${t.hit_columns?.join(`,`) || ``}` +
                    a(t, s),
                pubDate: e(t.pubdate, `X`),
                guid: t.arcurl,
                link: t.arcurl,
            };
        }),
    };
}
export { i as route };
