import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Buffer as r } from 'node:buffer';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import s from 'node:crypto';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = `https://api.mercari.jp/`,
    d = `${u}v2/entities:search`,
    f = `${u}items/get`,
    p = `${u}v1/marketplaces/shops/products/`,
    m = () => s.randomUUID(),
    h = { default: ``, onsale: `STATUS_ON_SALE`, soldout: `STATUS_SOLD_OUT` },
    g = { default: `SORT_DEFAULT`, create_time: `SORT_CREATED_TIME`, like: `SORT_NUM_LIKES`, score: `SORT_SCORE`, price: `SORT_PRICE` },
    _ = { desc: `ORDER_DESC`, asc: `ORDER_ASC` },
    v = (e) =>
        c(
            o(i, {
                children: [
                    o(`p`, { children: [` ¥`, e.price, ` `] }),
                    a(`p`, { children: e.photos?.map((e) => a(`img`, { src: e, style: `width:100%` })) }),
                    a(`h2`, { children: ` 商品の説明 ` }),
                    a(`div`, {
                        children: l(
                            e.description.replaceAll(
                                `
`,
                                `<br/>`
                            )
                        ),
                    }),
                    a(`h2`, { children: ` 商品の情報 ` }),
                    o(`table`, {
                        children: [
                            o(`tr`, { children: [a(`td`, { children: `カテゴリー` }), o(`td`, { children: [e.item_category.root_category_name, ` > `, e.item_category.parent_category_name, ` > `, e.item_category.name] })] }),
                            o(`tr`, { children: [a(`td`, { children: `商品の状態` }), o(`td`, { children: [` `, e.item_condition.name, ` `] })] }),
                            o(`tr`, { children: [a(`td`, { children: `配送料の負担` }), o(`td`, { children: [` `, e.shipping_payer.name, ` `] })] }),
                            o(`tr`, { children: [a(`td`, { children: `配送の方法` }), o(`td`, { children: [` `, e.shipping_method.name, ` `] })] }),
                            o(`tr`, { children: [a(`td`, { children: `発送元の地域` }), o(`td`, { children: [` `, e.shipping_from_area.name, ` `] })] }),
                            o(`tr`, { children: [a(`td`, { children: `発送までの日数` }), o(`td`, { children: [` `, e.shipping_duration.name, ` `] })] }),
                        ],
                    }),
                    a(`h2`, { children: ` 出品者 ` }),
                    o(`div`, { style: `display:flex`, children: [a(`img`, { src: e.seller.photo_url, style: `width: 4em; height: 4em; border-radius: 50%;` }), o(`p`, { children: [` `, e.seller.name] })] }),
                ],
            })
        ),
    y = (e) =>
        c(
            o(i, {
                children: [
                    o(`p`, { children: [` ¥`, e.price, ` `] }),
                    a(`p`, { children: e.productDetail.photos?.map((e) => a(`img`, { src: e, style: `width:100%` })) }),
                    a(`h2`, { children: ` 商品の説明 ` }),
                    a(`div`, {
                        children: l(
                            e.productDetail.description.replaceAll(
                                `
`,
                                `<br/>`
                            )
                        ),
                    }),
                    a(`h2`, { children: ` 商品の情報 ` }),
                    o(`table`, {
                        children: [
                            o(`tr`, {
                                children: [
                                    a(`td`, { children: `カテゴリー` }),
                                    o(`td`, {
                                        children: [
                                            ` `,
                                            [...e.productDetail.categories]
                                                .toReversed()
                                                .map((e) => e.displayName)
                                                .join(` > `),
                                            ` `,
                                        ],
                                    }),
                                ],
                            }),
                            o(`tr`, { children: [a(`td`, { children: `商品の状態` }), o(`td`, { children: [` `, e.productDetail.condition.displayName, ` `] })] }),
                            o(`tr`, { children: [a(`td`, { children: `配送料の負担` }), o(`td`, { children: [` `, e.productDetail.shippingPayer.displayName, ` `] })] }),
                            o(`tr`, { children: [a(`td`, { children: `配送の方法` }), o(`td`, { children: [` `, e.productDetail.shippingMethod.displayName, ` `] })] }),
                            o(`tr`, { children: [a(`td`, { children: `発送元の地域` }), o(`td`, { children: [` `, e.productDetail.shippingFromArea.displayName, ` `] })] }),
                            o(`tr`, { children: [a(`td`, { children: `発送までの日数` }), o(`td`, { children: [` `, e.productDetail.shippingDuration.displayName, ` `] })] }),
                        ],
                    }),
                    a(`h2`, { children: ` 出品者 ` }),
                    o(`div`, {
                        style: `display:flex`,
                        children: [a(`img`, { src: e.productDetail.shop.thumbnail, style: `width: 4em; height: 4em; border-radius: 50%;` }), o(`p`, { children: [` `, e.productDetail.shop.displayName] })],
                    }),
                ],
            })
        );
function b(e) {
    return e.toString(`base64`).replaceAll(`+`, `-`).replaceAll(`/`, `_`).replaceAll(`=`, ``);
}
function x(e) {
    return b(r.from(e, `utf-8`));
}
function S(e) {
    let t = e.export({ format: `jwk` });
    return { crv: `P-256`, kty: `EC`, x: t.x, y: t.y };
}
function C(e) {
    return { typ: `dpop+jwt`, alg: `ES256`, jwk: S(e) };
}
function w(e) {
    let t = 0;
    if (e[t++] !== 48) throw Error(`Invalid DER signature`);
    let n = T(e, t);
    if (((t += n.bytesRead), e[t++] !== 2)) throw Error(`Expected INTEGER for R`);
    let r = T(e, t);
    t += r.bytesRead;
    let i = e.subarray(t, t + r.length);
    if (((t += r.length), e[t++] !== 2)) throw Error(`Expected INTEGER for S`);
    let a = T(e, t);
    t += a.bytesRead;
    let o = e.subarray(t, t + a.length);
    if (((t += a.length), t !== e.length)) throw Error(`Extra bytes in DER signature`);
    return { r: E(i, 32), s: E(o, 32) };
}
function T(e, t) {
    let n = e[t];
    if (n < 128) return { length: n, bytesRead: 1 };
    let r = n & 127;
    if (r > 4) throw Error(`DER length too long`);
    let i = 0;
    for (let n = 0; n < r; n++) i = (i << 8) | e[t + 1 + n];
    return { length: i, bytesRead: 1 + r };
}
function E(e, t) {
    if (e.length > t) {
        let n = e.length - t;
        return e.subarray(n);
    }
    return e.length < t ? r.concat([Uint8Array.from(r.alloc(t - e.length)), Uint8Array.from(e)]) : e;
}
function D({ uuid: e, method: t, url: n }) {
    let { privateKey: i, publicKey: a } = s.generateKeyPairSync(`ec`, { namedCurve: `prime256v1` }),
        o = { iat: Math.floor(Date.now() / 1e3), jti: e, htu: n, htm: t.toUpperCase() },
        c = C(a),
        l = `${x(JSON.stringify(c))}.${x(JSON.stringify(o))}`,
        u = s.createSign(`SHA256`);
    u.update(l);
    let { r: d, s: f } = w(u.sign(i));
    return `${l}.${b(r.concat([Uint8Array.from(d), Uint8Array.from(f)]))}`;
}
const O = async function (t, n, r = `POST`) {
        let i = D({ uuid: m(), method: r, url: t }),
            a = {
                method: r,
                headers: new Headers({ DPOP: i, 'X-Platform': `web`, 'Accept-Encoding': `gzip, deflate`, 'Content-Type': `application/json; charset=utf-8` }),
                body: r === `POST` ? JSON.stringify(n) : void 0,
                query: r === `GET` ? n : void 0,
            };
        try {
            return await e(t, a);
        } catch (e) {
            throw Error(`API request failed: ${e}`);
        }
    },
    k = (e) => (e === 0 ? `` : `v1:${e}`),
    A = async (e, n, r, i, a = {}) => {
        let o = {
            userId: `MERCARI_BOT_${m()}`,
            pageSize: 120,
            pageToken: k(0),
            searchSessionId: m(),
            indexRouting: `INDEX_ROUTING_UNSPECIFIED`,
            thumbnailTypes: [],
            searchCondition: {
                keyword: i,
                excludeKeyword: a.excludeKeyword || ``,
                sort: e,
                order: n,
                status: r || [],
                sizeId: [],
                categoryId: a.categoryId || [],
                brandId: a.brandId || [],
                sellerId: [],
                priceMin: a.priceMin || 0,
                priceMax: a.priceMax || 0,
                itemConditionId: a.itemConditionId || [],
                shippingPayerId: [],
                shippingFromArea: [],
                shippingMethod: [],
                colorId: [],
                hasCoupon: !1,
                attributes: a.attributes || [],
                itemTypes: a.itemTypes || [],
                skuIds: [],
                shopIds: [],
                excludeShippingMethodIds: [],
            },
            serviceFrom: `suruga`,
            withItemBrand: !0,
            withItemSize: !1,
            withItemPromotions: !0,
            withItemSizes: !0,
            withShopname: !1,
            useDynamicAttribute: !0,
            withSuggestedItems: !0,
            withOfferPricePromotion: !0,
            withProductSuggest: !0,
            withParentProducts: !1,
            withProductArticles: !0,
            withSearchConditionId: !0,
            withAuction: !0,
        };
        return (t.debug(JSON.stringify(o)), await O(d, o, `POST`));
    },
    j = (e, t, n) =>
        t === `ITEM_TYPE_BEYOND`
            ? O(p + e, { view: `FULL`, imageType: `JPEG` }, `GET`)
            : O(
                  f,
                  {
                      id: e,
                      country_code: n,
                      include_item_attributes: !0,
                      include_product_page_component: !0,
                      include_non_ui_item_attributes: !0,
                      include_donation: !0,
                      include_offer_like_coupon_display: !0,
                      include_offer_coupon_display: !0,
                      include_item_attributes_sections: !0,
                      include_auction: !1,
                  },
                  `GET`
              ),
    M = (e) => {
        if (e.displayName) {
            let t = e;
            return {
                title: t.displayName,
                description: y(t),
                pubDate: n(t.createTime),
                guid: t.name,
                link: `https://jp.mercari.com/shops/product/${t.name}`,
                image: t.thumbnail,
                language: `ja`,
                author: t.productDetail.shop.displayName,
                updated: n(t.updateTime),
            };
        }
        let t = e;
        return {
            title: t.data.name,
            description: v(t.data),
            pubDate: n(t.data.created * 1e3),
            guid: t.data.id,
            link: `https://jp.mercari.com/item/${t.data.id}`,
            image: t.data.thumbnails[0],
            language: `ja`,
            author: t.data.seller.name,
            updated: n(t.data.updated * 1e3),
        };
    };
export { A as a, j as i, g as n, M as o, h as r, _ as t };
