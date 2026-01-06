import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t as e } from './common-config-Dzt4CsME.mjs';
import { t } from './utils-CU9nJ7uH.mjs';
const n = {
    path: `/oasis/user/:userid`,
    categories: [`social-media`],
    example: `/weibo/oasis/user/1990895721`,
    parameters: { userid: `用户 id, 可在用户主页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`m.weibo.cn/u/:uid`, `m.weibo.cn/profile/:uid`], target: `/user/:uid` }],
    name: `绿洲用户`,
    maintainers: [`kt286`],
    handler: r,
};
async function r(n) {
    let r = `https://oasis.weibo.cn/v1/h5/share?uid=${n.req.param(`userid`)}`;
    return t.sinaimgTvax(
        await e({
            link: r,
            url: r,
            title: `$('.name-main').text().trim() + ' - 用户 - 绿洲'`,
            description: `$('.desc').text().trim()`,
            item: {
                item: `.container .status-item`,
                title: `$('.status-item-title').clone().children().remove().end().text()`,
                description: `$('.status-item-title').clone().children().remove().end().text() + '<br>' + $('.status-img').html()`,
                link: `'https://oasis.weibo.cn/v1/h5/share?sid=' + $('.status-item-title').parent().data('id')`,
            },
        })
    );
}
export { n as route };
