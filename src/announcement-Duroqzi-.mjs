import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = async (i) => {
        let o = `https://www.bitget.com`,
            c = `${o}/v1/msg/push/stationLetterNew`,
            { type: l, lang: u = `zh-CN` } = i.req.param(),
            d = u.replace(`-`, `_`),
            f = { Referer: o, accept: `application/json, text/plain, */*`, 'content-type': `application/json;charset=UTF-8`, language: d, locale: d },
            p = i.req.query(`limit`) ?? `10`,
            m = { pageSize: p, openUnread: 0, stationLetterType: `0`, isPre: !1, lastEndId: null, languageType: 1 };
        switch (l) {
            case `new-listing`:
                m.stationLetterType = `02`;
                break;
            case `latest-activities`:
                m.stationLetterType = `01`;
                break;
            case `new-announcement`:
                m.stationLetterType = `06`;
                break;
            case `all`:
                ((m.stationLetterType = `0`), (m.excludeStationLetterType = `00`));
                break;
            default:
                throw Error(`Invalid type`);
        }
        let h = await n.tryGet(
            `bitget:announcement:${l}:${p}:${u}`,
            async () => {
                let t = await e(c, { method: `POST`, body: m, headers: f });
                if (t?.code !== `200`) throw Error(`Failed to fetch announcements, error code: ` + t?.code);
                return t;
            },
            t.cache.routeExpire,
            !1
        );
        if (!h) throw Error(`Failed to fetch announcements`);
        let g = h.data.items,
            _ = await Promise.all(
                g.map((t) =>
                    n.tryGet(`bitget:announcement:${t.id}:${p}:${u}`, async () => {
                        let n = r(Number(t.sendTime)),
                            i = { title: t.title ?? ``, link: t.openUrl ?? ``, pubDate: t.sendTime ? n : void 0, description: t.content ?? `` };
                        if ((t.imgUrl && (i.image = t.imgUrl), t.stationLetterType === `01` || t.stationLetterType === `06`))
                            try {
                                let n = a(await e(t.openUrl ?? ``, { headers: f })),
                                    r = JSON.parse(n(`script#__NEXT_DATA__`).text());
                                i.description = r.props.pageProps.details?.content || r.props.pageProps.pageInitInfo?.ruleContent || t.content || ``;
                            } catch (e) {
                                if (e.name && (e.name === `HTTPError` || e.name === `RequestError` || e.name === `FetchError`)) i.description = t.content ?? ``;
                                else throw e;
                            }
                        return i;
                    })
                )
            );
        return { title: `Bitget | ${s(l)}`, link: `https://www.bitget.com/${u}/inmail`, item: _ };
    },
    s = (e) => ({ all: `All`, 'new-listing': `New Listing`, 'latest-activities': `Latest Activities`, 'new-announcement': `New Announcement` })[e],
    c = {
        path: `/announcement/:type/:lang?`,
        categories: [`finance`],
        view: i.Articles,
        example: `/bitget/announcement/all/zh-CN`,
        parameters: {
            type: {
                description: `Bitget 通知类型`,
                default: `all`,
                options: [
                    { value: `all`, label: `全部通知` },
                    { value: `new-listing`, label: `新币上线` },
                    { value: `latest-activities`, label: `最新活动` },
                    { value: `new-announcement`, label: `最新公告` },
                ],
            },
            lang: {
                description: `语言`,
                default: `zh-CN`,
                options: [
                    { value: `zh-CN`, label: `中文` },
                    { value: `en-US`, label: `English` },
                    { value: `es-ES`, label: `Español` },
                    { value: `fr-FR`, label: `Français` },
                    { value: `de-DE`, label: `Deutsch` },
                    { value: `ja-JP`, label: `日本語` },
                    { value: `ru-RU`, label: `Русский` },
                    { value: `ar-SA`, label: `العربية` },
                ],
            },
        },
        radar: [{ source: [`www.bitget.com/:lang/inmail`], target: `/announcement/all/:lang` }],
        name: `Announcement`,
        description: `
type:
| Type | Description |
| --- | --- |
| all | 全部通知 |
| new-listing | 新币上线 |
| latest-activities | 最新活动 |
| new-announcement | 最新公告 |

lang:
| Lang | Description |
| ---   | ---   |
| zh-CN | 中文 |
| en-US | English |
| es-ES | Español |
| fr-FR | Français |
| de-DE | Deutsch |
| ja-JP | 日本語 |
| ru-RU | Русский |
| ar-SA | العربية |
`,
        maintainers: [`YukiCoco`],
        handler: o,
    };
export { c as route };
