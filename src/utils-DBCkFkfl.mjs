import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './config-not-found-DGyG6Tbz.mjs';
function n(n) {
    if (!e.discourse.config[n.req.param(`configId`)]) throw new t(`Discourse RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/">relevant config</a>`);
    return e.discourse.config[n.req.param(`configId`)];
}
export { n as t };
