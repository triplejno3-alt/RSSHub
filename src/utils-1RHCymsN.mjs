import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './config-not-found-DGyG6Tbz.mjs';
const n = new Set([`www.xlmp4.com`]),
    r = [
        `https://tracker.iriseden.fr:443/announce`,
        `https://tr.highstar.shop:443/announce`,
        `https://tr.fuckbitcoin.xyz:443/announce`,
        `https://tr.doogh.club:443/announce`,
        `https://tr.burnabyhighstar.com:443/announce`,
        `https://t.btcland.xyz:443/announce`,
        `http://vps02.net.orel.ru:80/announce`,
        `https://tracker.kuroy.me:443/announce`,
        `http://tr.cili001.com:8070/announce`,
        `http://t.overflow.biz:6969/announce`,
        `http://t.nyaatracker.com:80/announce`,
        `http://open.acgnxtracker.com:80/announce`,
        `http://nyaa.tracker.wf:7777/announce`,
        `http://home.yxgz.vip:6969/announce`,
        `http://buny.uk:6969/announce`,
        `https://tracker.tamersunion.org:443/announce`,
        `https://tracker.nanoha.org:443/announce`,
        `https://tracker.loligirl.cn:443/announce`,
        `udp://bubu.mapfactor.com:6969/announce`,
        `http://share.camoe.cn:8080/announce`,
        `udp://movies.zsw.ca:6969/announce`,
        `udp://ipv4.tracker.harry.lu:80/announce`,
        `udp://tracker.sylphix.com:6969/announce`,
        `http://95.216.22.207:9001/announce`,
    ];
function i(e, t = r) {
    return `${e}&tr=${t.join(`&tr=`)}`;
}
function a(e) {
    return e.startsWith(`magnet:`) ? `magnet` : e.startsWith(`ed2k:`) ? `ed2k` : ``;
}
function o(e, t, n, r, i, a) {
    if (
        ((i = function (e) {
            return (e < t ? `` : i(Number.parseInt((e / t).toString()))) + ((e %= t) > 35 ? String.fromCharCode(e + 29) : e.toString(36));
        }),
        !``.replace(/^/, String))
    ) {
        for (; n--; ) a[i(n.toString())] = r[n] || i(n.toString());
        ((r = [
            function (e) {
                return a[e];
            },
        ]),
            (i = function () {
                return String.raw`\w+`;
            }),
            (n = 1));
    }
    for (; n--; ) r[n] && (e = e.replaceAll(new RegExp(String.raw`\b` + i(n.toString()) + String.raw`\b`, `g`), r[n]));
    return e;
}
function s(r, i = `www.xlmp4.com`) {
    let a = `https://${i}`;
    if (!e.feature.allow_user_supply_unsafe_domain && !n.has(new URL(a).hostname)) throw new t(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
    return a;
}
export { a as i, o as n, s as r, i as t };
