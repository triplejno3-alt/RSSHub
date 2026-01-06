import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
const r = async (n) => {
        let { lang: r } = n.req.param(),
            i = Number.parseInt(n.req.query(`limit`) ?? `500`, 10),
            a = new URL(`potplayer/PotPlayer/v4/Update2/Update${r ?? ``}.html`, `https://t1.daumcdn.net`).href,
            o = await e(a),
            s = /^(-+)\s*\n(.*?)\s*\n(-+)\s*\n([\s\S]*?)(?=\n-{2,}|<\/p>)/gm,
            c = [],
            l;
        for (; (l = s.exec(o)) !== null && c.length < i; ) {
            let e = l[2].trim(),
                n = l[4].trim()?.replaceAll(/(\s[+-])/g, `<br>$1`),
                i = `N/A`,
                o,
                s = e.match(/\[([\d.]+)\]/);
            s && s[1] && (i = s[1]);
            let u = e.match(/(\d{4}\/\d{1,2}\/\d{1,2})/),
                d = e.match(/(\d{6})/);
            if (u && u[1]) o = u[1].replaceAll(`/`, `-`);
            else if (d && d[1]) {
                let e = d[1];
                if (e.length === 6 && (i === e || !u)) {
                    let t = Number.parseInt(e.slice(0, 2), 10),
                        n = Number.parseInt(e.slice(2, 4), 10),
                        r = Number.parseInt(e.slice(4, 6), 10);
                    o = `${t < 70 ? 2e3 + t : 1900 + t}-${n.toString().padStart(2, `0`)}-${r.toString().padStart(2, `0`)}`;
                }
            }
            let f = `potplayer-${r}-${i}`,
                p = { title: i, description: n, pubDate: o ? t(o) : void 0, link: a, guid: f, id: f, content: { html: n, text: n }, updated: o ? t(o) : void 0 };
            c.push(p);
        }
        return { title: `PotPlayer Update History`, link: a, item: c, allowEmpty: !0, id: a };
    },
    i = {
        path: `/potplayer/:lang?`,
        name: `Potplayer Update History`,
        url: `potplayer.daum.net`,
        maintainers: [`nczitzk`],
        handler: r,
        example: `/daum/potplayer`,
        parameters: {
            lang: {
                description: `Language, Korean by default`,
                options: [
                    { label: `한국어`, value: `Kor` },
                    { label: `中文(简体)`, value: `Chs` },
                    { label: `中文(繁体)`, value: `Cht` },
                    { label: `English`, value: `Eng` },
                    { label: `Українська`, value: `Eng` },
                    { label: `Русский`, value: `Rus` },
                    { label: `Polski`, value: `Pol` },
                ],
            },
        },
        description: `::: tip
To subscribe to [Potplayer Update History](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateEng.html), where the source URL is \`https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateEng.html\`, extract the certain parts from this URL to be used as parameters, resulting in the route as [\`/daum/potplayer/Eng\`](https://rsshub.app/daum/potplayer/Eng).
:::

| Language                                                                           | Id                                           |
| ---------------------------------------------------------------------------------- | -------------------------------------------- |
| [한국어](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/Update.html)        |                                              |
| [中文(简体)](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateChs.html) | [Chs](https://rsshub.app/daum/potplayer/Chs) |
| [中文(繁体)](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateCht.html) | [Cht](https://rsshub.app/daum/potplayer/Cht) |
| [ENGLISH](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateEng.html)    | [Eng](https://rsshub.app/daum/potplayer/Eng) |
| [Українська](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateEng.html) | [Eng](https://rsshub.app/daum/potplayer/Eng) |
| [РУССКИЙ](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateRus.html)    | [Eng](https://rsshub.app/daum/potplayer/Rus) |
| [Polski](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdatePol.html)     | [Eng](https://rsshub.app/daum/potplayer/Pol) |
`,
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`potplayer.daum.net`],
                target: (e, t) => {
                    let n = new URL(t).searchParams.get(`lang`) ?? void 0;
                    return `/daum/potplayer${n ? `/${n}` : ``}`;
                },
            },
            { title: `한국어`, source: [`t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/Update.html`], target: `/potplayer` },
            { title: `中文(简体)`, source: [`t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateChs.html`], target: `/potplayer/Chs` },
            { title: `中文(繁体)`, source: [`t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateCht.html`], target: `/potplayer/Cht` },
            { title: `English`, source: [`t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateEng.html`], target: `/potplayer/Eng` },
            { title: `Українська`, source: [`t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateEng.html`], target: `/potplayer/Eng` },
            { title: `Русский`, source: [`t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateRus.html`], target: `/potplayer/Rus` },
            { title: `Polski`, source: [`t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdatePol.html`], target: `/potplayer/Pol` },
        ],
        view: n.Articles,
        zh: {
            path: `/potplayer/:lang?`,
            name: `PotPlayer 版本更新信息`,
            url: `potplayer.daum.net`,
            maintainers: [`nczitzk`],
            handler: r,
            example: `/daum/potplayer/zh_CN`,
            parameters: {
                lang: {
                    description: `语言，默认为韩语，可在对应页 URL 中找到`,
                    options: [
                        { label: `한국어`, value: `Kor` },
                        { label: `中文(简体)`, value: `Chs` },
                        { label: `中文(繁体)`, value: `Cht` },
                        { label: `English`, value: `Eng` },
                        { label: `Українська`, value: `Eng` },
                        { label: `Русский`, value: `Rus` },
                        { label: `Polski`, value: `Pol` },
                    ],
                },
            },
            description: `::: tip
若订阅 [Potplayer Update History](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateChs.html)，网址为 \`https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateChs.html\`，请截取 \`https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/Update\` 到末尾的部分 \`Chs\` 作为 \`lang\` 参数填入，此时目标路由为 [\`/daum/potplayer/Chs\`](https://rsshub.app/daum/potplayer/Chs)。
:::

| Language                                                                           | Id                                           |
| ---------------------------------------------------------------------------------- | -------------------------------------------- |
| [한국어](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/Update.html)        |                                              |
| [中文(简体)](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateChs.html) | [Chs](https://rsshub.app/daum/potplayer/Chs) |
| [中文(繁体)](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateCht.html) | [Cht](https://rsshub.app/daum/potplayer/Cht) |
| [ENGLISH](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateEng.html)    | [Eng](https://rsshub.app/daum/potplayer/Eng) |
| [Українська](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateEng.html) | [Eng](https://rsshub.app/daum/potplayer/Eng) |
| [РУССКИЙ](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdateRus.html)    | [Eng](https://rsshub.app/daum/potplayer/Rus) |
| [Polski](https://t1.daumcdn.net/potplayer/PotPlayer/v4/Update2/UpdatePol.html)     | [Eng](https://rsshub.app/daum/potplayer/Pol) |
`,
        },
    };
export { r as handler, i as route };
