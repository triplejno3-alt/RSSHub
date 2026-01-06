import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = (n) =>
    e.tryGet(`luogu:username:` + n, async () => {
        let e = await t(`https://www.luogu.com/user/${n}`, { query: { _contentOnly: 1 } });
        return { name: e.data.currentData.user.name, description: e.data.currentData.user.slogan, avatar: e.data.currentData.user.avatar };
    });
export { n as t };
