import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { load as n } from 'cheerio';
const r = async (t) => {
        let r = Number.parseInt(t.req.query(`limit`) ?? `30`, 10),
            i = new URL(`downloads`, `https://www.azul.com`).href,
            a = new URL(`metadata/v1/zulu/packages`, `https://api.azul.com`).href,
            o = n(await e(i)),
            s = o(`html`).attr(`lang`) ?? `en`,
            c = (
                await e(a, {
                    query: {
                        availability_types: `ca`,
                        release_status: `both`,
                        page_size: 1e3,
                        include_fields: `java_package_features, release_status, support_term, os, arch, hw_bitness, abi, java_package_type, javafx_bundled, sha256_hash, cpu_gen, size, archive_type, certifications, lib_c_type, crac_supported`,
                        page: 1,
                        azul_com: !0,
                    },
                })
            )
                .slice(0, r)
                .map((e) => {
                    let t = `[${`${e.java_version.join(`.`)}+${e.openjdk_build_number}`}] (${e.distro_version.join(`.`)}) ${e.name}`,
                        n = e.download_url,
                        r = [e.os, e.arch, e.java_package_type, e.archive_type, e.abi, ...(e.javafx_bundled ? [`javafx`] : []), ...(e.crac_supported ? [`crac`] : [])],
                        i = `azul-${e.name}`,
                        a = { title: t, link: n, category: r, guid: i, id: i, language: s },
                        o = e.download_url;
                    if (o) {
                        let n = e.name,
                            r = e.size;
                        a = { ...a, enclosure_url: o, enclosure_title: n || t, enclosure_length: r };
                    }
                    return a;
                });
        return {
            title: o(`title`).text(),
            description: o(`meta[property="og:description"]`).attr(`content`),
            link: i,
            item: c,
            allowEmpty: !0,
            image: o(`meta[property="og:image"]`).attr(`content`),
            author: o(`meta[property="og:site_name"]`).attr(`content`),
            language: s,
            id: o(`meta[property="og:url"]`).attr(`content`),
        };
    },
    i = {
        path: `/downloads`,
        name: `Downloads`,
        url: `www.azul.com`,
        maintainers: [`nczitzk`],
        handler: r,
        example: `/azul/downloads`,
        parameters: void 0,
        description: void 0,
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.azul.com/downloads`], target: `/downloads` }],
        view: t.Notifications,
    };
export { r as handler, i as route };
