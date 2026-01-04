import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";const i={url:`denonbu.jp`,path:`/news/:area?`,categories:[`anime`],example:`/denonbu/news/azabu`,parameters:{area:`The id of the area or category; values are as follows.`},description:`**Area**
| ID            | Group name/Area name                             |
| ------------- | ------------------------------------------------ |
| akiba         | 外神田文芸高校                                   |
| harajuku      | 神宮前参道學園                                   |
| azabu         | 港白金女学院                                     |
| shibuya       | 帝音国際学院                                     |
| kabuki        | 真新宿GR学園                                     |
| deep-okubo    | Bellemule（深大久保DJ＆ダンスアカデミー）        |
| deep-okubo-k  | 輝きノスタルジア（深大久保DJ＆ダンスアカデミー） |
| shinsaibashi  | OKINI☆PARTY'S（心斎橋演芸高校）                  |
| ikebukuro     | 池袋電音部（池袋空乗院高校）                     |
| neotokyo      | 東京電脳（東京電脳学園）                         |
| neonakano     | 中野電脳（中野電脳学園）                         |
| shimokitazawa | Ma'Scar'Piece（北沢音箱高校）                    |

**Category**
Working category IDs include \`news\` (the default), \`event\`, \`goods\`, \`comic\`, \`movie\`, \`music\` or \`livearchives\`.

`,features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`denonbu.jp/news`],target:`/news`},{source:[`denonbu.jp/event`],target:`/news/event`},{source:[`denonbu.jp/goods`],target:`/news/goods`},{source:[`denonbu.jp/comic`],target:`/news/comic`},{source:[`denonbu.jp/movie`],target:`/news/movie`},{source:[`denonbu.jp/music`],target:`/news/music`},{source:[`denonbu.jp/livearchives`],target:`/news/livearchives`},{source:[`denonbu.jp/area/:area`],target:`/news/:area`}],name:`新闻`,maintainers:[`outloudvi`],handler:f},a={akiba:`外神田文芸高校`,harajuku:`神宮前参道學園`,azabu:`港白金女学院`,shibuya:`帝音国際学院`,kabuki:`真新宿GR学園`,"deep-okubo":`Bellemule（深大久保DJ＆ダンスアカデミー）`,"deep-okubo-k":`輝きノスタルジア（深大久保DJ＆ダンスアカデミー）`,shinsaibashi:`OKINI☆PARTY'S（心斎橋演芸高校）`,ikebukuro:`池袋電音部（池袋空乗院高校）`,neotokyo:`東京電脳（東京電脳学園）`,neonakano:`中野電脳（中野電脳学園）`,shimokitazawa:`Ma'Scar'Piece（北沢音箱高校）`,news:`新闻`,event:`活动`,goods:`商品`,comic:`漫画`,movie:`影片`,music:`音乐`,livearchives:`Live留档`},o=`https://denonbu.jp/backend-api/v1.0.0/`,s={"X-API-KEY":`FVpHcMLqyf7v2EubqiLxznC9gVMqBDFFMt4zvkS2`},c=new Set([`news`,`event`,`goods`,`comic`,`movie`,`music`,`livearchives`]),l=`denonbu-news`;async function u(){let n=await t.get(l,!1);if(n)return n;let{token:r,expires:i}=await e(String(new URL(`auths/token/get`,o)),{headers:s}).then(e=>e.payload);if(!r)throw Error(`Failed to get token`);return t.set(l,r,i?i-Number(Date.now())/1e3-1:3600),r}function d(e){switch(e.source_type){case`main`:case`deep-okubo`:case`shinsaibashi`:case`neotokyo`:{let{sid:t,uid:n}=e;return t&&n?`https://denonbu.jp/detail/${t}/${n}`:null}case`tw`:{let{account:{account_id:t},uid:n}=e;return t&&n?`https://twitter.com/${t}/status/${n}`:null}default:return null}}async function f(t){let{area:i}=t.req.param(),l=i??`news`,f=await u(),p=(await e(String(new URL(`contents/search/${l}?limit=20&offset=0`,o)),{headers:{...s,Authorization:`Bearer ${f}`}}).then(e=>e.payload.items)).map(e=>{let{title:t,body:i,post_date:a,category:o,media:s}=e,c=d(e),l={title:t??i.split(`
`)[0],description:i,pubDate:r(n(a),9),category:o.map(e=>e.name)};if(s?.[0]){let e=s[0],t=typeof e==`string`?e:e?.url;typeof t==`string`&&(l.image=t)}return c&&(l.link=c),l});return{title:`電音部新闻 - ${a[l]??l}`,link:c.has(l)?`https://denonbu.jp/${l}`:`https://denonbu.jp/area/${l}`,item:p,language:`ja`}}export{i as route};