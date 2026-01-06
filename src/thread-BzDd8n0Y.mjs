import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as e, n as t, r as n, t as r } from './utils-D9isEN1B.mjs';
import { load as i } from 'cheerio';
const a = {
    name: `BBS - 讨论串`,
    categories: [`bbs`],
    path: `/bbs/thread/:tid`,
    example: `/yamibo/bbs/thread/541914`,
    parameters: { tid: `讨论串 id，可从URL中提取。https://bbs.yamibo.com/forum.php?mod=viewthread&tid=xxxx中的xxx或https://bbs.yamibo.com/thread-aaa-b-c.html中的aaa部分即为tid值` },
    maintainers: [`KarasuShin`],
    handler: o,
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
百合会BBS访问部分讨论串需要用户登录认证，请参考配置说明
:::`,
};
async function o(a) {
    let o = a.req.param(`tid`),
        { data: s, link: c } = await t(o, { ordertype: `1` });
    if (!s) return { title: `讨论串不存在`, link: c, item: [] };
    let l = i(s);
    return {
        title: l(`title`).text().replace(` -  百合会 -  Powered by Discuz!`, ``),
        link: c,
        item: l(`#postlist>div[id^="post_"]`)
            .toArray()
            .map((t) => {
                let i = l(t),
                    a = !!i.has(`#fj`).length,
                    s = i.attr(`id`).match(/\d+/)[0],
                    c = i.find(`table`).find(`tr`).first(),
                    u = c.find(`#favatar${s}`).find(`.authi`).text(),
                    d = a ? `主楼` : c.find(`#postnum${s} em`).text(),
                    f = a ? `${r}/forum.php?mod=viewthread&tid=${o}` : `${r}/forum.php?mod=redirect&goto=findpost&ptid=${o}&pid=${s}`,
                    p = n(i, s),
                    m = c
                        .find(`#authorposton${s}`)
                        .text()
                        .match(/\d{4}(?:-\d{1,2}){2} \d{2}:\d{2}/)[0];
                return { title: `${d} - ${u}`, link: f, description: p, pubDate: e(m) };
            }),
    };
}
export { a as route };
