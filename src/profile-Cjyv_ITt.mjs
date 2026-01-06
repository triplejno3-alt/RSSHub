import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { n as t } from './puppeteer-BbZGb8cd.mjs';
const n = {
    name: `Profile`,
    path: `/profile/:principalId`,
    radar: [{ source: [`kuaishou.com/profile/:principalId`], target: `/profile/:principalId` }],
    parameters: { principalId: `用户 id, 可在主页中找到` },
    example: `/kuaishou/profile/3xk46q9cdnvgife`,
    maintainers: [`GuoChen-thlg`],
    url: `kuaishou.com/profile/:principalId`,
    description: `::: tip
The profile page of the user, which contains the user's information, videos, and other information.
:::`,
    handler: r,
};
async function r(n) {
    let { principalId: r } = n.req.param(),
        i = await t(),
        a = await i.newPage(),
        o = 0,
        s,
        c,
        l = new Promise((e) => {
            s = e;
        });
    (await a.setRequestInterception(!0),
        a.on(`request`, (e) => {
            let t = e.resourceType();
            t === `image` || t === `media` || t === `font` || t === `stylesheet` || t === `ping` ? e.abort() : e.continue();
        }),
        a.on(`response`, async (t) => {
            if (t.ok() && t.url().includes(`/live_api/profile/public`)) {
                let n = await t.json();
                n.data.list.length > 0
                    ? s(n.data)
                    : (o > e.requestRetry && s({}),
                      setTimeout(() => {
                          (a.reload().then(), o++);
                      }, 3e3));
            } else t.ok() && t.url().includes(`/live_api/baseuser/userinfo/byid`) && (c = (await t.json()).data.userInfo);
        }),
        await a.goto(`https://www.kuaishou.com`, { waitUntil: `domcontentloaded` }),
        await a.goto(`https://live.kuaishou.com/profile/${r}`));
    let u = await l.catch((e) => e);
    return (
        await i.close(),
        {
            title: c?.name ?? `${r}的作品 - 快手`,
            item:
                u?.list?.map((e) => ({
                    author: e.author.name,
                    description: `<video controls preload="metadata" poster="${e.poster}">
                    <source src="${e.playUrl}" type="video/mp4">
                </video>`,
                    id: e.id,
                    guid: e.id,
                    banner: e.poster,
                    media: { content: { url: e.playUrl } },
                })) || [],
        }
    );
}
export { n as route };
