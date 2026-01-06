import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './config-not-found-DGyG6Tbz.mjs';
import { ImapFlow as a } from 'imapflow';
import { simpleParser as o } from 'mailparser';
const s = { path: `/imap/:email/:folder{.+}?`, name: `Unknown`, maintainers: [], handler: c };
async function c(s) {
    let { email: c, folder: l = `INBOX` } = s.req.param(),
        { limit: u = 10 } = s.req.query(),
        d = { username: c, port: 993, ...Object.fromEntries(new URLSearchParams(e.email.config[c.replaceAll(/[.@]/g, `_`)])) };
    if (!d.username || !d.password || !d.host || !d.port) throw new i(`Email Inbox RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/#route-specific-configurations">relevant config</a>`);
    let f = new a({
        host: d.host,
        port: Number.parseInt(d.port),
        secure: !0,
        auth: { user: d.username, pass: d.password },
        proxy: e.proxyUri,
        logger: { debug: (e) => t.debug(e.msg), info: (e) => t.info(e.msg), warn: (e) => t.warn(e.msg), error: (e) => t.error(e?.msg) },
    });
    try {
        await f.connect();
    } catch (e) {
        throw Error(e.responseText);
    }
    let p = [],
        m = await f.getMailboxLock(l);
    try {
        for await (let e of f.fetch(`${Math.max(f.mailbox.exists - u + 1, 1)}:*`, { envelope: !0, source: !0, uid: !0 })) p.push(e);
    } finally {
        m.release();
    }
    let h = await Promise.all(
        p.map((e) =>
            n.tryGet(`mail:${c}:${e.envelope.messageId}`, async () => {
                let t = await o(e.source),
                    n = t.html || t.textAsHtml;
                if (t.attachments.length) {
                    n += `<h3>Attachments (${t.attachments.length})</h3>`;
                    for (let e of t.attachments) n += `<p>${e.filename}</p>`;
                }
                return { title: e.envelope.subject, description: n, pubDate: r(e.envelope.date), author: t.from.text, guid: `mail:${c}:${e.envelope.messageId}` };
            })
        )
    );
    return (await f.logout(), { title: `${c}'s Inbox${l === `INBOX` ? `` : ` - ${l}`}`, link: `https://${c.split(`@`)[1]}`, item: h, allowEmpty: !0 });
}
export { s as route };
