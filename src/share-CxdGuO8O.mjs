import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
        path: `/share/:shortId`,
        categories: [`other`],
        example: `/dingshao/share/FzFypN`,
        parameters: { shortId: `频道 ID` },
        radar: [{ source: [`www.dingshao.cn/share/:shortId`] }],
        name: `频道`,
        maintainers: [`TonyRL`],
        handler: i,
    },
    r = `https://www.dingshao.cn`;
async function i(n) {
    let { shortId: i } = n.req.param(),
        a = await e(`${r}/api/v2/channel/get-channel-and-recent-messages-by-short-id`, { method: `POST`, body: { shortId: i } }),
        o = a.value.bundle.channelMessages.map((e) => ({
            title: e.excerpt.split(`
`)[0],
            description: e.content,
            pubDate: t(e.publishedAt),
            category: e.tags,
            link: `${r}/channel/${a.value.channel}/${e.id}`,
        })),
        s = a.value.bundle.channels.find((e) => e.id === a.value.channel)?.profile;
    return { title: s?.name, description: s?.description, link: `${r}/share/${i}`, image: s?.image, item: o };
}
export { n as route };
