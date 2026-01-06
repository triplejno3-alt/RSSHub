import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
const a = {
        today: { label: `Today's News`, scene: 12, view: 14 },
        'intrusion-daily-cyber-threat-alert': { label: `Cyberattacks`, scene: 13, view: 15 },
        'ransomware-minute': { label: `Ransomware`, scene: 16, view: 18 },
        cryptocrime: { label: `Cryptocrime`, scene: 18, view: 20 },
        'hack-blotter': { label: `Hack Blotter`, scene: 19, view: 21 },
        'cybersecurity-venture-capital-vc-deals': { label: `VC Deal Flow`, scene: 3, view: 3 },
        'mergers-and-acquisitions-report': { label: `M&A Tracker`, scene: 11, view: 13 },
    },
    o = {
        name: `News`,
        categories: [`programming`],
        path: `/news/:category?`,
        example: `/cybersecurityventures/news`,
        radar: Object.keys(a).map((e) => ({ source: [`cybersecurityventures.com/${e}`], target: `/news/${e}`, title: a[e].label })),
        parameters: { category: { description: `news category`, default: `today`, options: Object.keys(a).map((e) => ({ value: e, label: a[e].label })) } },
        handler: s,
        maintainers: [`KarasuShin`],
        features: { supportRadar: !0 },
        view: n.Articles,
    };
async function s(n) {
    let o = n.req.param(`category`) ?? `today`,
        s = n.req.query(`limit`) ?? 20;
    if (!(o in a)) throw new r(`Invalid category`);
    let { scene: c, view: l, label: u } = a[o],
        d = await e(`https://us-east-1-renderer-read.knack.com/v1/scenes/scene_${c}/views/view_${l}/records?format=raw&page=1&rows_per_page=${s}&sort_field=field_2&sort_order=desc`, {
            headers: { 'X-Knack-Application-Id': `6013171b60be8f001cb27363`, 'X-Knack-Rest-Api-Key': `renderer` },
        });
    return {
        title: `${u} - Cybercrime Magazine`,
        link: `https://cybersecurityventures.com//${o}`,
        item: d.records.map((e) => {
            let n = i(e.field_3, null, !1),
                r = n(`a`).attr(`href`),
                a = `<p>${e.field_4}</p><br>${n.html()}`;
            return { title: e.field_5, description: a, pubDate: t(e.field_2.iso_timestamp), link: r, guid: `cybersecurityventures:${e.id}` };
        }),
    };
}
export { o as route };
