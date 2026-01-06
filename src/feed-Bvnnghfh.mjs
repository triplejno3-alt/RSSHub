import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import * as s from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ attributes: e, relationships: t, included: n }) => {
        let r = e.post_type,
            s = e.post_metadata?.image_order ?? [],
            u = e.image?.url ?? e.meta_image_url,
            d = t.audio?.attributes?.download_url || t.audio_preview?.attributes?.download_url,
            f = s.map((e) => n.find((t) => t.id === e)).filter(Boolean);
        return c(
            o(i, {
                children: [
                    r === `image_file`
                        ? a(i, { children: f.map((e) => o(i, { children: [a(`img`, { src: e.attributes.image_urls.original, alt: e.attributes.file_name }), a(`br`, {})] })) })
                        : r === `video_external_file`
                          ? e.video_preview
                              ? o(i, { children: [a(`video`, { controls: !0, preload: `metadata`, poster: e.image?.url, children: a(`source`, { src: t.video_preview?.attributes?.download_url, type: `video/mp4` }) }), a(`br`, {})] })
                              : null
                          : r === `audio_file` || r === `podcast`
                            ? o(i, {
                                  children: [
                                      e.thumbnail?.url ? o(i, { children: [a(`img`, { src: e.thumbnail.url }), a(`br`, {})] }) : null,
                                      d ? o(i, { children: [a(`audio`, { controls: !0, preload: `metadata`, children: a(`source`, { src: d, type: `audio/mpeg` }) }), a(`br`, {})] }) : null,
                                  ],
                              })
                            : r === `video_embed` || r === `link`
                              ? u
                                  ? o(i, { children: [a(`img`, { src: u }), a(`br`, {})] })
                                  : null
                              : r === `text_only`
                                ? null
                                : o(i, { children: [`Post type: "`, r, `" is not supported.`, a(`br`, {})] }),
                    e.content || e.teaser_text ? l(e.content || e.teaser_text) : null,
                    t.attachments_media?.length ? t.attachments_media.map((e) => o(i, { children: [a(`a`, { href: e.attributes.download_url, children: e.attributes.file_name }), a(`br`, {})] })) : null,
                ],
            })
        );
    },
    d = {
        path: `/:creator`,
        categories: [`new-media`],
        example: `/patreon/straightupsisters`,
        parameters: { creator: `Patreon creator id, can be found in the url` },
        features: { requireConfig: [{ name: `PATREON_SESSION_ID`, optional: !0, description: `The value of the session_id cookie after logging in to Patreon, required to access paid posts` }], nsfw: !0 },
        radar: [{ source: [`patreon.com/:creator`, `www.patreon.com/cw/:creator`] }],
        name: `Home`,
        maintainers: [`TonyRL`],
        handler: f,
    };
async function f(i) {
    let { creator: a } = i.req.param(),
        o = `https://www.patreon.com`,
        c = `${o}/${a}`,
        l = await n.tryGet(`patreon:creator:${a}`, async () => {
            let t = await e(c),
                n = s.load(t);
            if (n(`meta[property="og:url"]`).attr(`content`)?.startsWith(`${o}/cw/`)) {
                let t = n(`meta[property="og:image"]`).attr(`content`),
                    r = decodeURIComponent(t || ``).match(/card-teaser-image\/creator\/(\d+?)\?/)?.[1];
                if (r) return { id: r, attributes: (await e(`${o}/api/campaigns/${r}`)).data.attributes };
                throw Error(`Unable to extract creator ID`);
            }
            let r = JSON.parse(n(`#__NEXT_DATA__`).text()).props.pageProps.bootstrapEnvelope;
            return { id: r.pageBootstrap.campaign.data.id, attributes: r.pageBootstrap.campaign.data.attributes };
        });
    if (!l.id) throw Error(`Creator not found`);
    let d = {};
    t.patreon?.sessionId && (d = { Cookie: `session_id=${t.patreon.sessionId}` });
    let f = await e(`https://www.patreon.com/api/posts`, {
            headers: d,
            query: {
                include: `campaign,access_rules,access_rules.tier.null,attachments_media,audio,audio_preview.null,drop,images,media,native_video_insights,poll.choices,poll.current_user_responses.user,poll.current_user_responses.choice,poll.current_user_responses.poll,user,user_defined_tags,ti_checks,video.null,content_unlock_options.product_variant.null`,
                'fields[campaign]': `currency,show_audio_post_download_links,avatar_photo_url,avatar_photo_image_urls,earnings_visibility,is_nsfw,is_monthly,name,url`,
                'fields[post]': `change_visibility_at,comment_count,commenter_count,content,created_at,current_user_can_comment,current_user_can_delete,current_user_can_report,current_user_can_view,current_user_comment_disallowed_reason,current_user_has_liked,embed,image,insights_last_updated_at,is_paid,like_count,meta_image_url,min_cents_pledged_to_view,monetization_ineligibility_reason,post_file,post_metadata,published_at,patreon_url,post_type,pledge_url,preview_asset_type,thumbnail,thumbnail_url,teaser_text,title,upgrade_url,url,was_posted_by_campaign_owner,has_ti_violation,moderation_status,post_level_suspension_removal_date,pls_one_liners_by_category,video,video_preview,view_count,content_unlock_options,is_new_to_current_user,watch_state`,
                'fields[post_tag]': `tag_type,value`,
                'fields[user]': `image_url,full_name,url`,
                'fields[access_rule]': `access_rule_type,amount_cents`,
                'fields[media]': `id,image_urls,display,download_url,metadata,file_name`,
                'fields[native_video_insights]': `average_view_duration,average_view_pct,has_preview,id,last_updated_at,num_views,preview_views,video_duration`,
                'fields[content-unlock-option]': `content_unlock_type`,
                'fields[product-variant]': `price_cents,currency_code,checkout_url,is_hidden,published_at_datetime,content_type,orders_count,access_metadata`,
                'filter[campaign_id]': l.id,
                'filter[contains_exclusive_posts]': !0,
                'filter[is_draft]': !1,
                sort: `-published_at`,
                'json-api-use-default-includes': !1,
                'json-api-version': `1.0`,
            },
        }),
        p = f.data.map(({ attributes: e, relationships: t }) => {
            for (let [e, n] of Object.entries(t)) n.data && (t[e] = Array.isArray(n.data) ? n.data.map((e) => f.included.find((t) => t.id === e.id)) : f.included.find((e) => e.id === n.data.id));
            return (
                e.video_preview && (t.video_preview = f.included.find((t) => Number.parseInt(t.id) === e.video_preview?.media_id)),
                {
                    title: e.title,
                    description: u({ attributes: e, relationships: t, included: f.included }),
                    link: e.url,
                    pubDate: r(e.published_at),
                    image: e.thumbnail?.url ?? e.image?.url,
                    category: t.user_defined_tags?.map((e) => e.attributes.value),
                }
            );
        });
    return {
        title: l.attributes.name,
        description: l.attributes.creation_name,
        link: c,
        image: l.attributes.avatar_photo_image_urls?.thumbnail_large || l.attributes.avatar_photo_image_urls?.thumbnail || l.attributes.avatar_photo_image_urls?.original || l.attributes.avatar_photo_url,
        item: p,
        allowEmpty: !0,
    };
}
export { d as route };
