import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './article-cjVzTuOw.mjs';
import { load as n } from 'cheerio';
const r = async (r) => {
        if (/\.blog\.caixin\.com$/.test(new URL(r.link).hostname)) return i(r);
        {
            let { data: i } = await e(r.link);
            return ((r.description = t({ item: r, $: n(i) })), r.audio && ((r.itunes_item_image = r.audio_image_url), (r.enclosure_url = r.audio), (r.enclosure_type = `audio/mpeg`)), r);
        }
    },
    i = async (t) => {
        let r = n((await e(t.link)).data)(`#the_content`).removeAttr(`style`);
        return (
            r.find(`img`).removeAttr(`style`),
            r
                .find(`p`)
                .filter((e, t) => t.children[0].data === String.fromCodePoint(160))
                .remove(),
            (t.description = r.html()),
            t
        );
    };
export { i as n, r as t };
