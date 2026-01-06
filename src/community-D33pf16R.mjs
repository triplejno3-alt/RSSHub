import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { a as t, n, r, t as i } from './utils-BDqpzFK3.mjs';
const a = {
    path: `/community/:id/:media?`,
    name: `コミュニティ`,
    categories: [`social-media`],
    example: `/mixi2/community/62e7e813-d242-4c54-a0ee-0aab5b2bbad2`,
    parameters: { id: { description: `コミュニティID` }, media: { description: '`media`を入力するとメディアを含むポストのみを取得、デフォルトは空で全てのポストを取得' } },
    features: { supportRadar: !0, requireConfig: i },
    radar: [
        { source: [`mixi.social/communities/:id`, `mixi.social/communities/:id/about`], target: `/community/:id`, title: `コミュニティ - ポスト` },
        { source: [`mixi.social/communities/:id`, `mixi.social/communities/:id/about`], target: `/community/:id/media`, title: `コミュニティ - メディア` },
    ],
    view: e.SocialMedia,
    handler: async (e) => {
        let i = Number.parseInt(e.req.query(`limit`) ?? `20`, 10),
            a = e.req.param(`id`),
            o = e.req.param(`media`) === `media`,
            s = r(),
            [c, l] = await Promise.all([s.getCommunity({ communityId: a }), s.getCommunityTimeline({ communityId: a, limit: i, mediaOnly: o })]),
            u = await s.getPersonas({ personaIds: l?.posts.map((e) => e.personaId) });
        return {
            title: `${c.community.name} - ${o ? `メディア` : `ポスト`}`,
            description: c.community.purpose.replaceAll(
                `
`,
                ` `
            ),
            link: `https://mixi.social/communities/${a}/about`,
            image: c.community.coverImage.postImage?.largeImageUrl,
            item: l?.posts?.filter(t).map((e) => ({ title: c.community.name, ...n(e, u.personas) })) ?? [],
        };
    },
    maintainers: [`KarasuShin`],
};
export { a as route };
