import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './article-cjVzTuOw.mjs';
import { t as r } from './utils-DKggGkuR.mjs';
const i = {
    path: `/article`,
    categories: [`traditional-media`],
    example: `/caixin/article`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
    radar: [{ source: [`caixin.com/`] }],
    name: `首页新闻`,
    maintainers: [`EsuRt`],
    handler: a,
    url: `caixin.com/`,
};
async function a() {
    let { data: i } = await n(`https://mapiv5.caixin.com/m/api/getWapIndexListByPage`),
        a = i.data.list.map((e) => ({ title: e.title, description: e.summary, author: e.author_name, pubDate: t(e.time, `X`), link: e.web_url, pics: e.pics, audio: e.cms_audio_url, audio_image_url: e.audio_image_url }));
    return { title: `财新网 - 首页`, link: `https://www.caixin.com`, description: `财新网 - 首页`, item: await Promise.all(a.map((t) => e.tryGet(t.link, () => r(t)))) };
}
export { i as route };
