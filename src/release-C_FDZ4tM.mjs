import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import o from 'markdown-it';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = ({ releaseDate: e, fingerprint: t, appOS: n, minOS: o, deviceFamily: l, androidMinApiLevel: u, bundleId: d, downloadUrl: f, installUrl: p, fileExtension: m, sizeInMBytes: h, releaseNotes: g }) => {
        let _ = g?.trim().replaceAll(
            `
`,
            `<br>`
        );
        return s(
            a(r, {
                children: [
                    a(`p`, {
                        children: [
                            i(`b`, { children: `Release Date` }),
                            `: `,
                            e,
                            i(`br`, {}),
                            i(`b`, { children: `Fingerprint` }),
                            `: `,
                            t,
                            i(`br`, {}),
                            i(`b`, { children: `OS` }),
                            `: `,
                            n,
                            i(`br`, {}),
                            o ? a(r, { children: [i(`b`, { children: `Minimum OS Version` }), `: `, o, i(`br`, {})] }) : null,
                            u ? a(r, { children: [i(`b`, { children: `Android Minimum API Level` }), `: `, u, i(`br`, {})] }) : null,
                            l ? a(r, { children: [i(`b`, { children: `Device Family` }), `: `, l, i(`br`, {})] }) : null,
                            d ? a(r, { children: [i(`b`, { children: `Bundle ID` }), `: `, d, i(`br`, {})] }) : null,
                            m ? a(r, { children: [i(`b`, { children: `File Extension` }), `: `, m, i(`br`, {})] }) : null,
                            i(`b`, { children: `Size` }),
                            `: `,
                            h,
                            ` MB`,
                        ],
                    }),
                    _ ? a(r, { children: [a(`p`, { children: [i(`b`, { children: `Release Notes` }), `:`] }), c(_)] }) : null,
                    a(`p`, { children: [`[ `, i(`a`, { href: f, children: `Download` }), f === p ? `` : a(r, { children: [` `, `| `, i(`a`, { href: p, children: `Install` })] }), ` `, `]`] }),
                ],
            })
        );
    },
    u = {
        path: `/release/:user/:app/:distribution_group`,
        categories: [`program-update`],
        example: `/app-center/release/cloudflare/1.1.1.1-windows/beta`,
        parameters: { user: `User`, app: `App name`, distribution_group: `Distribution group` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`install.appcenter.ms/users/:user/apps/:app/distribution_groups/:distribution_group`, `install.appcenter.ms/orgs/:user/apps/:app/distribution_groups/:distribution_group`] }],
        name: `Release`,
        maintainers: [`Rongronggg9`],
        handler: d,
        description: `::: tip
  The parameters can be extracted from the Release page URL: \`https://install.appcenter.ms/users/:user/apps/:app/distribution_groups/:distribution_group\`
:::`,
    };
async function d(r) {
    let i = r.req.param(`user`),
        a = r.req.param(`app`),
        s = r.req.param(`distribution_group`),
        c = `https://install.appcenter.ms/api/v0.1/apps/${i}/${a}/distribution_groups/${s}`,
        u = `${c}/public_releases?scope=tester`,
        d = `https://install.appcenter.ms/users/${i}/apps/${a}/distribution_groups/${s}`,
        f = (await n(u)).data.map((e) => ({ pubDate: t(e.uploaded_at), link: `${c}/releases/${e.id}?is_install_page=true` })),
        p = new o();
    f = await Promise.all(
        f.map((t) =>
            e.tryGet(t.link, async () => {
                let e = (await n(t.link)).data,
                    r = e.owner.display_name,
                    i = e.app_os,
                    a = e.short_version,
                    o = e.version,
                    s = e.is_external_build,
                    c = e.mandatory_update,
                    u = (e.size / (1024 * 1024)).toFixed(2),
                    f = e.uploaded_at,
                    m = e.fingerprint,
                    h = e.min_os,
                    g = e.android_min_api_level,
                    _ = e.device_family,
                    v = e.bundle_identifier,
                    y = e.release_notes,
                    b = e.download_url,
                    x = e.install_url,
                    S = e.fileExtension,
                    C = e.app_display_name,
                    w = e.distribution_group_id;
                ((t._feed_title = `${C} (${e.distribution_groups.find((e) => e.id === w).display_name}) for ${i} by ${r} - App Center Releases`), (t._feed_icon = e.app_icon_url));
                let T = a && o ? `${a} (${o})` : a || o;
                return (
                    (t.title = `${C}: ` + (c ? `[Mandatory]` : ``) + (s ? `[External Build]` : ``) + `Version ${T}`),
                    (t.link = d),
                    (t.author = r),
                    (t.description = l({
                        releaseDate: f,
                        sizeInMBytes: u,
                        minOS: h,
                        deviceFamily: _,
                        androidMinApiLevel: g,
                        bundleId: v,
                        downloadUrl: b,
                        installUrl: x,
                        fingerprint: m,
                        appOS: i,
                        fileExtension: S,
                        releaseNotes: y && p.render(y),
                    })),
                    (t.guid = m),
                    t
                );
            })
        )
    );
    let m = f && f[0]._feed_icon,
        h = f && f[0]._feed_title;
    return { title: h, link: d, description: h, image: m, item: f };
}
export { u as route };
