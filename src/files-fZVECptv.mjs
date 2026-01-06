import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/files/:share_id/:parent_file_id?`,
    example: `/alipan/files/jjtKEgXJAtC/64a957744876479ab17941b29d1289c6ebdd71ef`,
    parameters: { share_id: `分享 id，可以从分享页面 URL 中找到`, parent_file_id: `文件夹 id，可以从文件夹页面 URL 中找到` },
    radar: [{ source: [`www.alipan.com/s/:share_id/folder/:parent_file_id`, `www.alipan.com/s/:share_id`] }],
    name: `文件列表`,
    maintainers: [`DIYgod`],
    handler: r,
    url: `www.alipan.com/s`,
};
async function r(n) {
    let { share_id: r, parent_file_id: i } = n.req.param(),
        a = `https://www.aliyundrive.com/s/${r}${i ? `/folder/${i}` : ``}`,
        o = { referer: `https://www.aliyundrive.com/`, origin: `https://www.aliyundrive.com`, 'x-canary': `client=web,app=share,version=v2.3.1` },
        s = await e(`https://api.aliyundrive.com/adrive/v3/share_link/get_share_by_anonymous`, { method: `POST`, headers: o, query: { share_id: r }, body: { share_id: r } }),
        c = (await e(`https://api.aliyundrive.com/v2/share_link/get_share_token`, { method: `POST`, headers: o, body: { share_id: r } })).share_token,
        l = (
            await e(`https://api.aliyundrive.com/adrive/v2/file/list_by_share`, {
                method: `POST`,
                headers: { ...o, 'x-share-token': c },
                body: { limit: 100, order_by: `created_at`, order_direction: `DESC`, parent_file_id: i || `root`, share_id: r },
            })
        ).items.map((e) => ({ title: e.name, description: e.name + (e.thumbnail ? `<img src="${e.thumbnail}">` : ``), link: a, pubDate: t(e.created_at), updated: t(e.updated_at), guid: e.file_id }));
    return { title: `${s.display_name || `${r}${i ? `-${i}` : ``}`}-阿里云盘`, link: a, item: l };
}
export { n as route };
