import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './mixcloud-DDh755Qv.mjs';
const t = {
    path: `/:username/playlists/:playlist`,
    categories: [`multimedia`],
    example: `/mixcloud/dholbach/playlists/ecclectic-dance`,
    parameters: { username: `Username, can be found in URL`, playlist: `Playlist slug, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
    radar: [{ source: [`mixcloud.com/:username/playlists/:playlist`] }, { source: [`www.mixcloud.com/:username/playlists/:playlist`] }],
    name: `Playlist`,
    maintainers: [`Misaka13514`],
    handler: e,
};
export { t as route };
