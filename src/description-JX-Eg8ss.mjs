import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = (i) =>
    r(
        n(e, {
            children: [
                n(`p`, { children: [t(`span`, { children: t(`big`, { children: i.title }) }), t(`br`, {})] }),
                n(`p`, {
                    children: [
                        t(`span`, { children: t(`small`, { children: t(`i`, { children: i.authors }) }) }),
                        t(`br`, {}),
                        t(`span`, { children: t(`small`, { children: t(`i`, { children: `https://doi.org/${i.doi}` }) }) }),
                        t(`br`, {}),
                        t(`span`, { children: t(`small`, { children: t(`i`, { children: i.issue }) }) }),
                        t(`br`, {}),
                    ],
                }),
                n(`p`, { children: [t(`span`, { children: i.abstract }), t(`br`, {})] }),
            ],
        })
    );
export { i as t };
