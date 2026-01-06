import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/feeds/following/:characterId`,
    categories: [`social-media`],
    example: `/crossbell/feeds/following/10`,
    parameters: { characterId: `N` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Feeds of following`,
    maintainers: [`DIYgod`],
    handler: n,
};
async function n(t) {
    let n = t.req.param(`characterId`),
        r = await e(`https://indexer.crossbell.io/v1/characters/${n}/feed/follow`);
    return {
        title: `Crossbell Feeds of ` + n,
        link: `https://crossbell.io/`,
        item: r.data?.list
            ?.filter((e) => e.type !== `UPDATE_CHARACTER_METADATA`)
            .map((e) => {
                let t = e.note ? e.note.metadata?.content?.external_urls?.[0] || `https://crossbell.io/notes/${e.note.characterId}-${e.note.noteId}` : `https://xchar.app/` + e.character.handle;
                return (
                    t.startsWith(`https://xn--`) && (t = `https://crossbell.io/notes/${e.note?.characterId}-${e.note?.noteId}`),
                    {
                        title: `${e.type} ${e.character && e.character.metadata?.content?.name}@${e.character && e.character.handle}`,
                        description: `${e.type} ${e.note && `<br>Note: ${e.note.metadata?.content?.title || e.note.metadata?.content?.content}`}${e.character && `<br>Character: ${e.character.metadata?.content?.name}@${e.character.handle}`}`,
                        link: t,
                        pubDate: e.createdAt,
                        updated: e.updatedAt,
                        author: e.note?.metadata?.content?.authors?.[0] || e.note?.character?.metadata?.content?.name || e.note?.character?.handle || e.owner,
                        guid: e.transactionHash + e.logIndex + e.type,
                        category: [...(e.note?.metadata?.content?.sources || []), ...(e.note?.metadata?.content?.tags || [])],
                    }
                );
            }),
    };
}
export { t as route };
