import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './utils-DKtPYsxL.mjs';
const t = {
    path: `/search/:keyword?/:filter?/:sort?`,
    categories: [`multimedia`],
    example: `/javdb/search/巨乳`,
    parameters: { keyword: `关键字，默认为空`, filter: '过滤，见下表，默认为 `可播放`', sort: '排序，见下表，默认为 `按相关度排序`' },
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
    name: `搜索`,
    maintainers: [`nczitzk`],
    handler: n,
    url: `javdb.com/`,
    description: `过滤

| 全部 | 占位 | 可播放   | 單體作品 | 演員  | 片商  | 導演     | 系列   | 番號 | 可下載   | 字幕  | 預覽圖  |
| ---- | ---- | -------- | -------- | ----- | ----- | -------- | ------ | ---- | -------- | ----- | ------- |
|      | none | playable | single   | actor | maker | director | series | code | download | cnsub | preview |

  排序

| 按相关度排序 | 按发布时间排序 |
| ------------ | -------------- |
| 0            | 1              |`,
};
async function n(t) {
    let n = t.req.param(`filter`) ?? ``,
        r = t.req.param(`keyword`) ?? ``,
        i = t.req.param(`sort`) ?? `0`,
        a = `/search?q=${r}${n && n !== `none` ? `&f=${n}` : ``}&sb=${i}`,
        o = { '': ``, none: ``, playable: `可播放`, single: `單體作品`, actor: `演員`, maker: `片商`, director: `導演`, series: `系列`, code: `番號`, download: `可下載`, cnsub: `字幕`, preview: `預覽圖` },
        s = `關鍵字 ${r} ${o[n] === `` ? `` : `+ ${o[n]}`} ${{ 0: `按相关度排序`, 1: `按发布时间排序` }[i]} 搜索結果 - JavDB`;
    return await e.ProcessItems(t, a, s);
}
export { t as route };
