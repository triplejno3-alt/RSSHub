import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { a as t, n, r, t as i } from './utils-BDqpzFK3.mjs';
const a = {
    path: `/discovery`,
    name: `発見`,
    categories: [`social-media`],
    example: `/mixi2/discovery`,
    features: { supportRadar: !0, requireConfig: i },
    radar: [{ source: [`mixi.social/home/discovery`], target: `/discovery`, title: `発見` }],
    view: e.SocialMedia,
    handler: async (e) => {
        let i = Number.parseInt(e.req.query(`limit`) ?? `20`, 10),
            a = r(),
            o = await a.getRecommendedTimeline({ limit: i }),
            s = await a.getPersonas({ personaIds: o?.posts?.map((e) => e.personaId) ?? [] });
        return {
            title: `発見`,
            link: `https://mixi.social/home/discovery`,
            image: `https://mixi.social/_next/static/media/image_logo.8bb36f11.svg`,
            item: o?.posts?.filter(t).map((e) => ({ title: `@${s.personas.find((t) => t.personaId === e.personaId)?.name}`, ...n(e, s.personas) })) ?? [],
        };
    },
    maintainers: [`KarasuShin`],
};
export { a as route };
