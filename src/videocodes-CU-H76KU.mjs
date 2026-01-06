import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './utils-DKtPYsxL.mjs';
const t = {
    path: `/video_codes/:code/:filter?`,
    categories: [`multimedia`],
    example: `/javdb/video_codes/SIVR`,
    parameters: { id: `番号前缀`, filter: '过滤，见下表，默认为 `全部`' },
    features: {
        requireConfig: [{ name: `JAVDB_SESSION`, description: 'JavDB登陆后的session值，可在控制台的cookie下查找 `_jdb_session` 的值，即可获取', optional: !0 }],
        requirePuppeteer: !1,
        antiCrawler: !0,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
        nsfw: !0,
    },
    radar: [{ source: [`javdb.com/`], target: `` }],
    name: `番号`,
    maintainers: [`sgpublic`],
    handler: n,
    url: `javdb.com/`,
    description: `| 全部 | 可播放   | 單體作品 | 可下載   | 字幕  | 預覽圖  |
| ---- | -------- | -------- | -------- | ----- | ------- |
|      | playable | single   | download | cnsub | preview |`,
};
async function n(t) {
    let n = t.req.param(`code`),
        r = t.req.param(`filter`) ?? ``,
        i = `/video_codes/${n}${r ? `?f=${r}` : ``}`,
        a = { '': ``, playable: `可播放`, single: `單體作品`, download: `可下載`, cnsub: `字幕`, preview: `預覽圖` },
        o = `JavDB${a[r] === `` ? `` : ` - ${a[r]}`} `;
    return await e.ProcessItems(t, i, o);
}
export { t as route };
