import { t as e } from './got-CKQ7C9HX.mjs';
const t = `http://www.yxdown.com`,
    n = async () => (await e(t)).data.match(/(?<=.cookie=").*(?=; path)/g)[0];
export { t as n, n as t };
