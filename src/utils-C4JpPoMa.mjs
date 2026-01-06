import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './config-not-found-DGyG6Tbz.mjs';
async function r() {
    if (!t.spotify || !t.spotify.clientId || !t.spotify.clientSecret) throw new n(`Spotify public RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let { clientId: r, clientSecret: i } = t.spotify;
    return (
        await e(`https://accounts.spotify.com/api/token`, {
            method: `POST`,
            headers: { Authorization: `Basic ${Buffer.from(`${r}:${i}`).toString(`base64`)}`, 'Content-Type': `application/x-www-form-urlencoded` },
            body: new URLSearchParams({ grant_type: `client_credentials` }).toString(),
        })
    ).access_token;
}
async function i() {
    if (!t.spotify || !t.spotify.clientId || !t.spotify.clientSecret || !t.spotify.refreshToken)
        throw new n(`Spotify private RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let { clientId: r, clientSecret: i, refreshToken: a } = t.spotify;
    return (
        await e(`https://accounts.spotify.com/api/token`, {
            method: `POST`,
            headers: { Authorization: `Basic ${Buffer.from(`${r}:${i}`).toString(`base64`)}`, 'Content-Type': `application/x-www-form-urlencoded` },
            body: new URLSearchParams({ grant_type: `refresh_token`, refresh_token: a }).toString(),
        })
    ).access_token;
}
var a = {
    getPublicToken: r,
    getPrivateToken: i,
    parseTrack: (e) => ({ title: e.name, author: e.artists.map((e) => e.name).join(`, `), description: `"${e.name}" by ${e.artists.map((e) => e.name).join(`, `)} from the album "${e.album.name}"`, link: e.external_urls.spotify }),
    parseArtist: (e) => ({ title: e.name, description: `${e.name}, with ${e.followers.total} followers`, link: e.external_urls.spotify }),
};
export { a as t };
