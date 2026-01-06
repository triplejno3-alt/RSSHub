import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
function r(e) {
    return `Portal:Current_events/${e.getFullYear()}_${[`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`][e.getMonth()]}_${e.getDate()}`;
}
function i(e) {
    if (!e || typeof e != `string`) return null;
    let t = e.match(/\{\{Current events\s*\|[\s\S]*?content\s*=\s*([\s\S]*)\}\}$/);
    if (!t) return null;
    let n = t[1].trim();
    return ((n = _(n)), /^\s*\*+\s*$/.test(n) ? null : n);
}
function a(e) {
    return e.replaceAll(/\{\{([^}]+)\}\}/g, `$1`);
}
function o(e) {
    return ((e = e.replaceAll(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, `<a href="https://en.wikipedia.org/wiki/$1">$2</a>`)), (e = e.replaceAll(/\[\[([^\]]+)\]\]/g, `<a href="https://en.wikipedia.org/wiki/$1">$1</a>`)), e);
}
function s(e) {
    return ((e = e.replaceAll(/\[([^\s\]]+)\s+([^\]]+)\]/g, `<a href="$1">$2</a>`)), (e = e.replaceAll(/\[([^\s\]]+)\]/g, `<a href="$1">$1</a>`)), e);
}
function c(e) {
    return ((e = e.replaceAll(/'''([^']+)'''/g, `<strong>$1</strong>`)), (e = e.replaceAll(/''([^']+)''/g, `<em>$1</em>`)), e);
}
function l() {
    return { result: [], depthStack: [], lastDepth: 0 };
}
function u(e, t) {
    e.result.push(`  `.repeat(e.depthStack.length) + t);
}
function d(e) {
    for (; e.depthStack.length > 0; ) (e.depthStack.pop(), u(e, `</ul>`), e.depthStack.length > 0 && u(e, `</li>`));
    e.lastDepth = 0;
}
function f(e, t) {
    for (let n = e.lastDepth; n < t; n++) (u(e, `<ul>`), e.depthStack.push(n + 1));
}
function p(e, t) {
    for (; e.depthStack.length > 0 && e.depthStack.at(-1) > t; ) (u(e, `</li>`), e.depthStack.pop(), u(e, `</ul>`), (e.depthStack.length > 0 && e.depthStack.at(-1) > t) || (e.depthStack.length > 0 && u(e, `</li>`)));
}
function m(e) {
    e.depthStack.length > 0 && u(e, `</li>`);
}
function h(e) {
    if (e.depthStack.length !== 0) {
        for (u(e, `</li>`), e.depthStack.pop(); e.depthStack.length > 0; ) (e.result.push(`  `.repeat(e.depthStack.length) + `</ul>`, `  `.repeat(e.depthStack.length) + `</li>`), e.depthStack.pop());
        e.result.push(`</ul>`);
    }
}
function g(e) {
    let t = e.split(`
`),
        n = l();
    for (let e of t) {
        let t = e.trim();
        if (!t) {
            d(n);
            continue;
        }
        let r = t.match(/^(\*+)\s*(.*)$/);
        if (r) {
            let e = r[1].length,
                t = r[2];
            if (!t) continue;
            (e > n.lastDepth ? f(n, e) : e < n.lastDepth ? p(n, e) : m(n), u(n, `<li>${t}`), (n.lastDepth = e));
        } else (d(n), n.result.push(t));
    }
    return (
        h(n),
        n.result.join(`
`)
    );
}
function _(e) {
    return e.replaceAll(/<!--[\s\S]*?-->/g, ``);
}
function v(e) {
    let t = e;
    return ((t = a(t)), (t = o(t)), (t = s(t)), (t = c(t)), (t = g(t)), t);
}
async function y(t) {
    let r = t.join(`|`),
        a = {},
        o = {},
        s = !0;
    for (; s; ) {
        let t = await n(`https://en.wikipedia.org/w/api.php`, { searchParams: { action: `query`, format: `json`, titles: r, prop: `revisions`, rvprop: `content`, rvslots: `main`, ...o }, headers: { 'User-Agent': e.trueUA } }),
            c = JSON.parse(t.body);
        if (c.query && c.query.pages) {
            for (let e of Object.values(c.query.pages))
                if (e.revisions && e.revisions[0] && e.revisions[0].slots && e.revisions[0].slots.main) {
                    let t = e.revisions[0].slots.main[`*`],
                        n = i(t);
                    if (n) {
                        let t = v(n),
                            r = e.title.replace(/Portal:Current events\/(\d{4}) (\w+) (\d+)/, `Portal:Current_events/$1_$2_$3`);
                        a[r] = t;
                    }
                }
        }
        c.continue ? (o = c.continue) : (s = !1);
    }
    return a;
}
const b = {
    path: `/current-events/:includeToday?`,
    categories: [`new-media`],
    example: `/wikipedia/current-events`,
    parameters: {
        includeToday: {
            description: `Include current day events (may be incomplete early in the day)`,
            default: `auto`,
            options: [
                { label: `Auto (include after 18:00 UTC)`, value: `auto` },
                { label: `Always include current day`, value: `always` },
                { label: `Never include current day`, value: `never` },
                { label: `Include after specific UTC hour (0-23)`, value: `0-23` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`en.wikipedia.org/wiki/Portal:Current_events`], target: `/wikipedia/current-events` }],
    name: `Current Events`,
    maintainers: [`aavanian`],
    handler: x,
    description: `Wikipedia Portal: Current events - Latest news and events from the past 7 days`,
};
async function x(n) {
    let i = S(n.req.param(`includeToday`) ?? `auto`),
        a = i.map((e) => r(e)),
        o = `wikipedia:current-events:batch:` + a.join(`|`);
    try {
        let n = await t.tryGet(o, async () => await y(a), e.cache.contentExpire);
        return {
            title: `Wikipedia: Portal: Current events`,
            link: `https://en.wikipedia.org/wiki/Portal:Current_events`,
            description: `Current events from Wikipedia - Latest news and events`,
            item: i
                .map((e) => {
                    let t = r(e),
                        i = n[t];
                    if (i) {
                        let n = e.getFullYear(),
                            r = `${n}-${String(e.getMonth() + 1).padStart(2, `0`)}-${String(e.getDate()).padStart(2, `0`)}`,
                            a = Date.UTC(n, e.getMonth(), e.getDate() + 1, 11, 59, 59);
                        return { title: `Current events: ${r}`, link: `https://en.wikipedia.org/wiki/${t}`, description: i, pubDate: new Date(Math.min(a, Date.now())), guid: `wikipedia-current-events-${r}` };
                    }
                    return null;
                })
                .filter((e) => e !== null),
        };
    } catch (e) {
        let t = e instanceof Error ? e.message : String(e);
        throw Error(`Failed to fetch Wikipedia current events: ${t}`);
    }
}
function S(e) {
    let t = new Date().getUTCHours(),
        n = !1;
    switch (e) {
        case `always`:
            n = !0;
            break;
        case `never`:
            n = !1;
            break;
        case `auto`:
            n = t >= 18;
            break;
        default:
            if (/^\d+$/.test(e)) {
                let r = Number.parseInt(e, 10);
                r >= 0 && r <= 23 && (n = t >= r);
            }
    }
    let r = n ? 0 : 1;
    return Array.from({ length: 7 }, (e, t) => {
        let n = new Date();
        return (n.setDate(n.getDate() - (t + r)), n);
    });
}
export { b as route, v as wikiToHtml };
