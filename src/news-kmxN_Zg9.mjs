import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './common-Dctt9O6R.mjs';
const t = {
    name: `News`,
    maintainers: [`Rjnishant530`],
    path: [`/:category`],
    example: `/dnaindia/headlines`,
    parameters: { category: `Find it in the URL, or tables below` },
    radar: [{ source: [`www.dnaindia.com/:category`] }],
    handler: e,
    url: `www.dnaindia.com`,
    description: `Categories:

| Headlines | Explainer | India | Entertainment | Sports | Viral | Lifestyle | Education | Business | World |
| --------- | --------- | ----- | ------------- | ------ | ----- | --------- | --------- | -------- | ----- |
| headlines | explainer | india | entertainment | sports | viral | lifestyle | education | business | world |`,
};
export { t as route };
