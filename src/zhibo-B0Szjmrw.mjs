import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './description-C5mknfdt.mjs';
import r from 'crypto-js';
const i = { m3u8: `x-mpegURL`, mp3: `mpeg`, mp4: `mp4`, m4a: `mp4` },
    a = {
        path: `/zhibo/:id`,
        categories: [`multimedia`],
        example: `/radio/zhibo/1395528`,
        parameters: { id: `直播 id，可在对应点播页面的 URL 中找到` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
        name: `直播`,
        maintainers: [`nczitzk`],
        handler: o,
        description:
            '如果订阅 [新闻和报纸摘要](http://www.radio.cn/pc-portal/sanji/zhibo_2.html?name=1395528)，其 URL 为 `http://www.radio.cn/pc-portal/sanji/zhibo_2.html?name=1395528`，可以得到 `name` 为 `1395528`\n\n  所以对应路由为 [`/radio/zhibo/1395528`](https://rsshub.app/radio/zhibo/1395528)\n\n::: tip\n  查看更多电台直播节目，可前往 [电台直播](http://www.radio.cn/pc-portal/erji/radioStation.html)\n:::',
    };
async function o(a) {
    let o = a.req.param(`id`),
        s = `columnId=${o}&pageNo=0&pageSize=${a.req.query(`limit`) ?? `100`}`,
        c = `https://www.radio.cn`,
        l = `${c}/pc-portal/image/icon_32.jpg`,
        u = `${c}/pc-portal/sanji/zhibo_2.html?name=${o}`,
        d = `https://ytmsout.radio.cn/web/appProgram/pageByColumn?${s}`,
        f = Date.now(),
        p = (
            await t({
                method: `get`,
                url: d,
                headers: { sign: r.MD5(`${s}&timestamp=${f}&key=f0fc4c668392f9f9a447e48584c214ee`).toString().toUpperCase(), timestamp: f, 'Content-Type': `application/json`, equipmentId: `0000`, platformCode: `WEB` },
            })
        ).data.data.data,
        m = p.map((t) => {
            let r = t.playUrlHigh ?? t.playUrlLow;
            r = /\.m3u8$/.test(r) ? t.downloadUrl : r;
            let a = new URL(r).pathname.split(`.`).pop(),
                o = a ? `audio/${i[a]}` : ``,
                s = new Date(t.startTime),
                c = `${s.getFullYear()}-${s.getMonth() + 1}-${s.getDate()}`;
            return {
                guid: t.id,
                title: `${c} ${t.name}`,
                link: r,
                description: n({ description: t.des, enclosure_url: r, enclosure_type: o }),
                pubDate: e(t.startTime),
                enclosure_url: r,
                enclosure_type: o,
                itunes_duration: t.durationStr,
                itunes_item_image: l,
            };
        });
    return { title: `云听 - ${p[0].name}`, link: u, item: m, image: l, itunes_author: `radio.cn`, description: p[0].des };
}
export { a as route };
