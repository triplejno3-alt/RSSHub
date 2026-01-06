import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
var i = {
    getUserFullInfo: (i, a) => {
        if (!a && !e.mihoyo.cookie)
            throw new r(`GetUserFullInfo is not available due to the absense of [Miyoushe Cookie]. Check <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config tutorial</a>`);
        a ||= ``;
        let o = `mihoyo:user-full-info-uid-` + a;
        return t.tryGet(o, async () => {
            let t = (
                await n({
                    method: `get`,
                    url: `https://bbs-api.miyoushe.com/user/wapi/getUserFullInfo?${new URLSearchParams({ uid: a, gids: 2 }).toString()}`,
                    headers: { Referer: `https://www.miyoushe.com/ys/accountCenter/postList?id=${a}`, Cookie: e.mihoyo.cookie },
                })
            )?.data?.data?.user_info;
            if (!t) throw Error(`未获取到数据！`);
            let { nickname: r, introduce: i, gender: o, certification: s, avatar_url: c, uid: l } = t;
            return { nickname: r, introduce: i, gender: o, certification: s, avatar_url: c, uid: l };
        });
    },
};
export { i as t };
