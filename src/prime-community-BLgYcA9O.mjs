import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
const r = {
    path: `/prime/community`,
    categories: [`new-media`],
    example: `/sspai/prime/community`,
    features: {
        requireConfig: [
            {
                name: `SSPAI_BEARERTOKEN`,
                optional: !1,
                description:
                    "少数派会员账号认证 token。获取方式：登陆后打开少数派会员社区界面，打开浏览器开发者工具中 “网络”(Network) 选项卡，筛选 URL 找到任一个地址为 `sspai.com/api` 开头的请求，点击检查其 “消息头”，在 “请求头” 中找到Authorization字段，将其值复制填入配置即可。你的配置应该形如 `SSPAI_BEARERTOKEN: 'Bearer eyJxxxx......xx_U8'`。",
            },
        ],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    radar: [{ source: [`sspai.com/community`] }],
    name: `会员社区`,
    maintainers: [`mintyfrankie`],
    handler: i,
};
async function i() {
    let r,
        i = await n.get(`sspai:token`);
    i
        ? (r = i)
        : t.sspai.bearertoken
          ? ((r = t.sspai.bearertoken), n.set(`sspai:token`, t.sspai.bearertoken))
          : (r = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNzU3NiIsInR5cGUiOiJ1c2VyIiwiZXhwIjoxNzQ4NTI2MDEzfQ.di8RB-lxHI_JMBQHFd2xhcpk6Zd_3bvfQlAti6HAuZA`);
    let a = { Authorization: r },
        o = (await e(`https://sspai.com/api/v1/community/page/get`, { headers: a })).data.map((e) => ({
            title: e.title,
            link: `https://sspai.com/t/${e.id_hash}`,
            pubDate: new Date(e.created_at * 1e3),
            author: e.author.nickname,
            category: e.channel.title,
            id_hash: e.id_hash,
        }));
    return {
        title: `少数派会员社区`,
        link: `https://sspai.com/community`,
        lang: `zh-CN`,
        description: `少数派会员社区`,
        item: await Promise.all(o.map((t) => n.tryGet(t.link, async () => ((t.description = (await e(`https://sspai.com/api/v1/community/topic/single/info/get?id_hash=${t.id_hash}`, { headers: a })).data.body || `No content`), t)))),
    };
}
export { r as route };
