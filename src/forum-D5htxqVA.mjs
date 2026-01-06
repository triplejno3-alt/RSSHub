import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as r, n as i, r as a, t as o } from './utils-D9isEN1B.mjs';
import { load as s } from 'cheerio';
import c from 'p-map';
const l = {
    name: `BBS - 板块`,
    categories: [`bbs`],
    path: `/bbs/forum/:fid/:type?`,
    example: `/yamibo/bbs/forum/5/404`,
    parameters: { fid: `板块 id，可从URL中提取。https://bbs.yamibo.com/forum-aa-b.html中的aa部分即为fid值`, type: `板块子分类，网页中选中板块分类后URL中的typeid值` },
    maintainers: [`KarasuShin`],
    handler: u,
    features: {
        antiCrawler: !0,
        requireConfig: [
            {
                optional: !0,
                name: `YAMIBO_SALT`,
                description: `百合会BBS登录后的认证信息，获取方式：1. 登录百合会BBS网页版 2. 打开浏览器开发者工具，切换到 Application 面板
3. 点击侧边栏中的Storage -> Cookies -> https://bbs.yamibo.com 4. 复制 Cookie 中的 EeqY_2132_saltkey 值`,
            },
            {
                optional: !0,
                name: `YAMIBO_AUTH`,
                description: `百合会BBS登录后的认证信息，获取方式：1. 登录百合会BBS网页版 2. 打开浏览器开发者工具，切换到 Application 面板
3. 点击侧边栏中的Storage -> Cookies -> https://bbs.yamibo.com 4. 复制 Cookie 中的 EeqY_2132_auth 值`,
            },
        ],
    },
    description: `::: warning
百合会BBS访问部分板块需要用户登录认证，请参考配置说明
:::`,
};
async function u(l) {
    let u = l.req.param(`fid`),
        d = l.req.param(`type`),
        { auth: f, salt: p } = t.yamibo,
        m = new URLSearchParams();
    (m.set(`mod`, `forumdisplay`), m.set(`fid`, u), m.set(`orderby`, `dateline`), d && (m.set(`filter`, `typeid`), m.set(`typeid`, d)));
    let h = {};
    f && p && (h.cookie = `EeqY_2132_saltkey=${p}; EeqY_2132_auth=${f}`);
    let g = `${o}/forum.php?${m.toString()}`,
        _ = s(await e(g, { headers: h })),
        v = _(`title`).text().replace(` -  百合会 -  Powered by Discuz!`, ``),
        y = _(`tbody[id^="normalthread_"]`)
            .toArray()
            .map((e) => {
                let t = _(e),
                    n = t.attr(`id`).match(/\d+/)[0];
                return { id: n, title: t.find(`th em`).text() + t.find(`th .s.xst`).text(), link: `${o}/thread-${n}-1-1.html`, pubDate: r(t.find(`td.by`).first().find(`em`).text()) };
            });
    return (
        (y = await c(
            y,
            async (e) =>
                await n.tryGet(e.link, async () => {
                    let t,
                        { data: n } = await i(e.id);
                    if (n && !n.startsWith(`<script type="text/javascript">`)) {
                        let e = s(n);
                        if (e(`#postlist>div[id^="post_"]`).length) {
                            let n = e(`#postlist>div[id^="post_"]`).first(),
                                r = n.attr(`id`)?.match(/\d+/)?.[0];
                            r && (t = a(n, r));
                        }
                    }
                    return { title: e.title, link: e.link, description: t, pubDate: e.pubDate };
                }),
            { concurrency: 5 }
        )),
        { title: v, link: g, item: y }
    );
}
export { l as route };
