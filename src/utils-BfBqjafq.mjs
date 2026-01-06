import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
import { Cookie as n, CookieJar as r } from 'tough-cookie';
const i = new r(),
    a = n.fromJSON({ key: `playno1`, value: `playno1Cookie`, domain: `playno1.com`, path: `/` });
(async () => {
    await i.setCookie(a, `http://www.playno1.com/`);
})();
const o = (n, r) => Promise.all(n.map((n) => r.tryGet(n.link, async () => ((n.description = t((await e(n.link, { cookieJar: i })).data)(`#article_content`).html()), n))));
export { o as n, i as t };
