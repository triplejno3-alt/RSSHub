import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = `kuaidi100-wwwid`,
    r = `kuaidi100-csrf`,
    i = `kuaidi100-globacsrftoken`,
    a = `kuaidi100-dasddocTitl`,
    o = `kuaidi100-dasddocReferrer`,
    s = `kuaidi100-dasddocHref`,
    c = `kuaidi100-cookie-count`;
async function l() {
    d();
    let c = await e.get(n),
        l = await e.get(r),
        u = await e.get(i),
        f = await e.get(a),
        p = await e.get(o),
        m = await e.get(s);
    if (!c || !l || !f || !p || !m) {
        let h = (
            await t({
                method: `get`,
                url: `https://www.kuaidi100.com/?from=appstore`,
                headers: { Referer: `https://apps.apple.com/cn/app/%E5%BF%AB%E9%80%92100-%E5%8F%8C11%E5%AF%84%E4%BB%B6%E9%80%80%E8%B4%A7-%E4%B8%8A%E5%BF%AB%E9%80%92100/id458270120` },
            })
        ).headers[`set-cookie`];
        if (h)
            for (let e of h)
                e.indexOf(`WWWID`) === 0
                    ? (c = e.split(`;`)[0])
                    : e.indexOf(`csrftoken`) === 0
                      ? (l = e.split(`;`)[0])
                      : e.indexOf(`globacsrftoken`) === 0
                        ? (u = e.split(`;`)[0])
                        : e.includes(`dasddocTitle`)
                          ? (f = e.split(`;`)[0])
                          : e.includes(`dasddocReferrer`)
                            ? (p = e.split(`;`)[0])
                            : e.includes(`dasddocHref`) && (m = e.split(`;`)[0]);
        (e.set(n, c, 600), e.set(r, l, 600), e.set(i, u, 600), e.set(a, f, 600), e.set(o, p, 600), e.set(s, m, 600), d(!0));
    }
    return { wwwid: c, csrf: l, globacsrftoken: u, dasddocTitl: f, dasddocReferrer: p, dasddocHref: m };
}
function u() {
    let n = `kuaidi100-company-name-${new Date().toISOString().split(`T`)[0]}`;
    return e.tryGet(n, async () => {
        let e = (await l()).wwwid,
            n = (await t({ method: `post`, url: `https://www.kuaidi100.com/company.do?method=js&t=201701051440`, headers: { Referer: `https://www.kuaidi100.com/`, Cookie: e } })).body;
        try {
            ((n = n.slice(12).replaceAll(`};`, `}`).replaceAll(`'`, `"`)), (n = JSON.parse(n)), (n = n.company));
        } catch {
            throw Error(`无法正确获取快递公司列表：请稍后重试`);
        }
        return n;
    });
}
function d(t = !1) {
    if (t) e.set(c, 0);
    else {
        let t = e.get(c);
        t ? (t > 30 ? (e.set(c, 0), f()) : e.set(c, t + 1)) : e.set(c, 1);
    }
}
function f() {
    (e.set(n, null), e.set(r, null));
}
var p = {
    company: () => u(),
    checkCode: async (e, t, n) => {
        let r = (await u()).find((t) => t.number === e);
        return r
            ? e.includes(`shunfeng`) && !Number.isNaN(n) && String(n).length !== 4
                ? { status: !1, message: `顺丰查询需要手机号后四位！`, company: r }
                : r.checkReg
                  ? { status: !0, regex: new RegExp(r.checkReg).test(t), company: r }
                  : { status: !0, regex: void 0, company: r }
            : { status: !1, message: `快递公司编号不受支持！`, company: { name: `未知` } };
    },
    getQuery: async (n, r, i) => {
        let a = `kuaidi100-query-${n}-${r}`,
            o = await e.get(a),
            s = Number.parseInt(Date.now() / 1e3),
            c = Date.now() - 3600 * 24 * 60 * 1e3,
            u = new Date(c).toLocaleDateString(`ZH`).split(`/`).join(``),
            d = encodeURIComponent(JSON.stringify({ date: u, nums: [r] }));
        if (o) o = JSON.parse(o);
        else {
            let c = await l();
            if (
                ((o = (
                    await t({
                        method: `get`,
                        url: `https://www.kuaidi100.com/query?type=${n}&postid=${r}&temp=${Math.random()}&phone=${i ?? ``}`,
                        headers: {
                            Referer: `https://www.kuaidi100.com/`,
                            'Accept-Language': `zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7`,
                            'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36`,
                            Cookie: `${c.globacsrftoken}; ${c.csrf}; ${c.wwwid}; ${c.dasddocHref}; ${c.dasddocReferrer}; ${c.dasddocTitl}; addcom=${n}; addnu=${r}; snt_query_meta=${d}; sortStatus=0; Hm_lpvt_22ea01af58ba2be0fec7c11b25e88e6c=${s}; Hm_lvt_22ea01af58ba2be0fec7c11b25e88e6c=${s - 1642}`,
                        },
                    })
                ).data),
                o.status === `200`)
            ) {
                if (o.data && o.data[0].context === `查无结果`) throw (f(), Error(`暂时无法获取快递信息，请稍后重试...`));
                o.ischeck === `0` ? e.set(a, o, 180) : e.set(a, o);
            } else throw (e.set(a, o), Error(`[${o.status}]信息有误，请重新检查后订阅：${o.message}`));
        }
        return o;
    },
};
export { p as t };
