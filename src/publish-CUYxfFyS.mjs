import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, description: t }) => o(i, { children: [e?.map((e, t) => (e?.src ? a(`figure`, { children: a(`img`, { src: e.src, alt: e.alt }) }, `${e.src}-${t}`) : null)), t ? a(i, { children: l(t) }) : null] }),
    d = (e) => c(a(u, { ...e })),
    f = async (r) => {
        let { id: i = `hourly-temperature/html` } = r.req.param(),
            a = Number.parseInt(r.req.query(`limit`) ?? `50`, 10),
            o = `https://www.nmc.cn`,
            c = i.split(/\//).pop() === `htm` ? `htm` : `html`,
            l = new URL(`publish/${i.replace(new RegExp(String.raw`\/${c}$`), ``)}.${c}`, o).href,
            u = s(await e(l)),
            f = u(`html`).attr(`lang`) ?? `zh`,
            p =
                u(`div#home div[data-img]`).length === 0
                    ? u(`div#text`)
                          .slice(0, a)
                          .toArray()
                          .map((e) => {
                              let r = u(e),
                                  i = r
                                      .find(`div.author b`)
                                      .toArray()
                                      .map((e) => u(e).text().trim()),
                                  a = `${i.pop()}:00 ${i.join(`/`)}`,
                                  s = `${a} - ${r.find(`div.title`).text().replaceAll(/\s/g, ``)}`,
                                  c = d({ description: r.find(`div.writing`).html() }),
                                  p = l,
                                  m = r
                                      .find(`div.author`)
                                      .contents()
                                      .first()
                                      .text()
                                      .split(/\s/)
                                      .filter(Boolean)
                                      .map((e) => ({ name: e.split(/：/).pop(), url: void 0, avatar: void 0 })),
                                  h = `${p}#${a}`,
                                  g = a;
                              return {
                                  title: s,
                                  description: c,
                                  pubDate: n(t(a, `HH:mm YYYY/MM/DD`), 8),
                                  link: p ? new URL(p, o).href : void 0,
                                  author: m,
                                  guid: h,
                                  id: h,
                                  content: { html: c, text: c },
                                  updated: n(t(g, `HH:mm YYYY/MM/DD`), 8),
                                  language: f,
                              };
                          })
                    : u(`div[data-img]`)
                          .slice(0, a)
                          .toArray()
                          .map((e) => {
                              let r = u(e),
                                  i = r.attr(`data-img`),
                                  a = `${r.find(`div`).text().trim()} - ${u(`div.nav1 a.actived, div#menuNavBar button.dropdown-toggle`)
                                      .toArray()
                                      .map((e) => u(e).text().trim())
                                      .join(` - `)}`,
                                  s = d({ images: i ? [{ src: i, alt: a }] : void 0 }),
                                  c = i?.match(/product\/(\d{4})\//)?.[1],
                                  p = `${c ? `${c}/` : ``}${r.attr(`data-time`)}`,
                                  m = l,
                                  h = `${m}#${p}`,
                                  g = p;
                              return { title: a, description: s, pubDate: n(t(p), 8), link: m ? new URL(m, o).href : void 0, guid: h, id: h, content: { html: s, text: s }, image: i, banner: i, updated: n(t(g), 8), language: f };
                          });
        return {
            title: u(`title`).text(),
            description: u(`meta[name="description"]`).attr(`content`),
            link: l,
            item: p,
            allowEmpty: !0,
            image: u(`a.navbar-brand img`).attr(`src`),
            author: u(`meta[name="description"]`).attr(`content`),
            language: f,
            id: l,
        };
    },
    p = {
        path: `/publish/:id{.+}?`,
        name: `产品`,
        url: `www.nmc.cn`,
        maintainers: [`nczitzk`],
        handler: f,
        example: `/nmc/publish/observations/hourly-temperature/html`,
        parameters: {
            id: {
                description: '分类，默认为 `hourly-temperature` 即全国逐时气温，可在对应分类页 URL 中找到',
                options: [
                    { label: `首页 - 卫星云图`, value: `satellite/fy4b-visible/htm` },
                    { label: `首页 - 气象灾害预警`, value: `country/warning/index/html` },
                    { label: `首页 - 环境气象公报`, value: `observations/environmental/html` },
                    { label: `首页 - 降水量预报`, value: `precipitation/1-day/html` },
                    { label: `首页 - 天气公报`, value: `weather-bulletin/index/htm` },
                    { label: `首页 - 每日天气提示`, value: `weatherperday/index/htm` },
                    { label: `首页 - 城市天气预报`, value: `forecast/html` },
                    { label: `天气实况 - 天气图`, value: `observations/china/dm/weatherchart-h000/htm` },
                    { label: `天气实况 - 卫星云图`, value: `satellite/fy4b-visible/htm` },
                    { label: `天气实况 - 雷达图`, value: `radar/chinaall/html` },
                    { label: `天气实况 - 降水量`, value: `observations/hourly-precipitation/html` },
                    { label: `天气实况 - 气温`, value: `observations/hourly-temperature/html` },
                    { label: `天气实况 - 风`, value: `observations/hourly-winds/html` },
                    { label: `天气实况 - 能见度`, value: `sea/seaplatform1/html` },
                    { label: `天气实况 - 强对流`, value: `observations/lighting/html` },
                    { label: `天气实况 - 土壤水分`, value: `soil-moisture/10cm/html` },
                    { label: `城市预报 - 城市预报`, value: `forecast/html` },
                    { label: `天气预报 - 天气公报`, value: `weather-bulletin/index/htm` },
                    { label: `天气预报 - 每日天气提示`, value: `weatherperday/index/htm` },
                    { label: `天气预报 - 春运气象服务专报`, value: `weather_forecast/swssr/htm` },
                    { label: `天气预报 - 气象灾害预警`, value: `country/warning/fog/html` },
                    { label: `天气预报 - 重要天气提示`, value: `news/weather_new/html` },
                    { label: `天气预报 - 重要天气盘点`, value: `tianqiyubao/zhongyaotianqipandian/index/html` },
                    { label: `天气预报 - 降水量预报`, value: `precipitation/1-day/html` },
                    { label: `天气预报 - 冻雨预报`, value: `tianqiyubao/dongyuyubao/index/html` },
                    { label: `天气预报 - 气温预报`, value: `temperature/hight/24hour/html` },
                    { label: `天气预报 - 大风预报`, value: `wind/24h/html` },
                    { label: `天气预报 - 强对流天气预报`, value: `bulletin/swpc/html` },
                    { label: `天气预报 - 中期天气`, value: `bulletin/mid-range/htm` },
                    { label: `天气预报 - 全球天气预报`, value: `bulletin/abroadweather/html` },
                    { label: `天气预报 - 全球灾害性天气监测月报`, value: `tianqiyubao/quanqiuzaihaixingtianqijianceyuebao/index/html` },
                    { label: `天气预报 - 环境气象公报`, value: `observations/environmental/html` },
                    { label: `天气预报 - 山洪灾害气象预警`, value: `mountainflood/html` },
                    { label: `天气预报 - 地质灾害气象风险预警`, value: `geohazard/html` },
                    { label: `天气预报 - 中小河流洪水气象风险预警`, value: `swdz/zxhlhsqxyj/html` },
                    { label: `天气预报 - 渍涝风险气象预警`, value: `waterlogging/html` },
                    { label: `天气预报 - 交通气象预报`, value: `traffic/html` },
                    { label: `天气预报 - 森林火险预报`, value: `environment/forestfire-doc/html` },
                    { label: `天气预报 - 草原火险预报`, value: `environment/glassland-fire/html` },
                    { label: `台风海洋 - 台风快讯与报文`, value: `typhoon/typhoon_new/html` },
                    { label: `台风海洋 - 台风路径预报`, value: `typhoon/probability-img2/html` },
                    { label: `台风海洋 - 台风公报`, value: `typhoon/warning/html` },
                    { label: `台风海洋 - 台风预警`, value: `typhoon/warning_index/html` },
                    { label: `台风海洋 - 海区预报`, value: `marine/newcoastal/html` },
                    { label: `台风海洋 - 海事公报`, value: `marine/maritime/html` },
                    { label: `台风海洋 - 海洋天气预报`, value: `marine/forecast/htm` },
                    { label: `台风海洋 - 近海海雾预报`, value: `taifenghaiyang/jinhaihaiwuyubao/index/html` },
                    { label: `台风海洋 - 海区风力预报`, value: `taifenghaiyang/haiqufengliyubao/index/html` },
                    { label: `台风海洋 - 北太平洋分析与预报`, value: `marine/h000/html` },
                    { label: `台风海洋 - 全球热带气旋监测公报`, value: `typhoon/totalcyclone/htm` },
                    { label: `台风海洋 - 台风命名`, value: `typhoon/typhoon-name/index/html` },
                    { label: `台风海洋 - 台风综合信息`, value: `http://typhoon/nmc.cn` },
                    { label: `全球预报 - 全球天气公报`, value: `quanqiuyubao/quanqiutianqigongbao/index/html` },
                    { label: `全球预报 - 全球热带气旋监测公报`, value: `quanqiuyubao/quanqiuredaiqixuanjiancegongbao/index/html` },
                    { label: `全球预报 - WMO第XI海区海事天气公报`, value: `quanqiuyubao/WMOdiXIhaiquhaishitianqigongbao/index/html` },
                    { label: `全球预报 - 全球灾害性天气监测月报`, value: `quanqiuyubao/quanqiuzaihaixingtianqijianceyuebao/index/html` },
                    { label: `全球预报 - 全球雨雪落区预报`, value: `quanqiuyubao/quanqiuyuxueluoquyubao/yazhou/24xiaoshi/index/html` },
                    { label: `环境气象 - 雾预报`, value: `fog/html` },
                    { label: `环境气象 - 霾预报`, value: `haze/html` },
                    { label: `环境气象 - 沙尘天气预报`, value: `severeweather/dust/html` },
                    { label: `环境气象 - 空气污染气象条件预报`, value: `environment/air_pollution-24/html` },
                    { label: `环境气象 - 环境气象公报`, value: `observations/environmental/html` },
                    { label: `环境气象 - 大气环境气象公报`, value: `environment/National-Bulletin-atmospheric-environment/htm` },
                    { label: `农业气象 - 土壤水分监测`, value: `agro/soil-moisture-monitoring-10cm/html` },
                    { label: `农业气象 - 农业干旱综合监测`, value: `agro/disastersmonitoring/Agricultural_Drought_Monitoring/htm` },
                    { label: `农业气象 - 关键农时农事`, value: `agro/weatherservices/harvest_in_autumn/html` },
                    { label: `农业气象 - 农业气象周报`, value: `agro/ten-week/index/html` },
                    { label: `农业气象 - 农业气象月报`, value: `agro/monthly/index/html` },
                    { label: `农业气象 - 生态气象监测评估`, value: `nongyeqixiang/shengtaiqixiangjiance/caodishengtaiqixiangjiance/index/html` },
                    { label: `农业气象 - 农业气象专报`, value: `crop/index/htm` },
                    { label: `农业气象 - 作物发育期监测`, value: `agro/information/winter-wheat/html` },
                    { label: `农业气象 - 农业气象灾害风险预警`, value: `nongyeqixiang/quanguonongyeqixiangzaihaifengxianyujing/index/html` },
                    { label: `农业气象 - 国外农业气象月报`, value: `nongyeqixiang/guowainongyeqixiangyuebao/index/html` },
                ],
            },
        },
        description: `::: tip
订阅[全国逐时气温](https://www.nmc.cn/publish/observations/hourly-temperature.html)，其源网址为 \`https://www.nmc.cn/publish/observations/hourly-temperature.html\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/nmc/publish/observations/hourly-temperature/html\`](https://rsshub.app/nmc/publish/observations/hourly-temperature/html)。

订阅[天气公报](https://www.nmc.cn/publish/weather-bulletin/index.htm)，其源网址为 \`https://www.nmc.cn/publish/weather-bulletin/index.htm\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/nmc/publish/weather-bulletin/index/htm\`](https://rsshub.app/nmc/publish/weather-bulletin/index/htm)。
:::

<details>
  <summary>更多分类</summary>

  #### [首页](https://www.nmc.cn/)

  | Category                                                                   | ID                                                                                                |
  | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
  | [卫星云图](https://www.nmc.cn/publish/satellite/fy4b-visible.htm)          | [satellite/fy4b-visible/htm](https://rsshub.app/nmc/publish/satellite/fy4b-visible/htm)           |
  | [气象灾害预警](https://www.nmc.cn/publish/country/warning/index.html)      | [country/warning/index/html](https://rsshub.app/nmc/publish/country/warning/index/html)           |
  | [环境气象公报](https://www.nmc.cn/publish/observations/environmental.html) | [observations/environmental/html](https://rsshub.app/nmc/publish/observations/environmental/html) |
  | [降水量预报](https://www.nmc.cn/publish/precipitation/1-day.html)          | [precipitation/1-day/html](https://rsshub.app/nmc/publish/precipitation/1-day/html)               |
  | [天气公报](https://www.nmc.cn/publish/weather-bulletin/index.htm)          | [weather-bulletin/index/htm](https://rsshub.app/nmc/publish/weather-bulletin/index/htm)           |
  | [每日天气提示](https://www.nmc.cn/publish/weatherperday/index.htm)         | [weatherperday/index/htm](https://rsshub.app/nmc/publish/weatherperday/index/htm)                 |
  | [城市天气预报](https://www.nmc.cn/publish/forecast.html)                   | [forecast/html](https://rsshub.app/nmc/publish/forecast/html)                                     |

  #### [天气实况](https://www.nmc.cn/publish/observations/hourly-precipitation.html)

  | Category                                                                         | ID                                                                                                                        |
  | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
  | [天气图](https://www.nmc.cn/publish/observations/china/dm/weatherchart-h000.htm) | [observations/china/dm/weatherchart-h000/htm](https://rsshub.app/nmc/publish/observations/china/dm/weatherchart-h000/htm) |
  | [卫星云图](https://www.nmc.cn/publish/satellite/fy4b-visible.htm)                | [satellite/fy4b-visible/htm](https://rsshub.app/nmc/publish/satellite/fy4b-visible/htm)                                   |
  | [雷达图](https://www.nmc.cn/publish/radar/chinaall.html)                         | [radar/chinaall/html](https://rsshub.app/nmc/publish/radar/chinaall/html)                                                 |
  | [降水量](https://www.nmc.cn/publish/observations/hourly-precipitation.html)      | [observations/hourly-precipitation/html](https://rsshub.app/nmc/publish/observations/hourly-precipitation/html)           |
  | [气温](https://www.nmc.cn/publish/observations/hourly-temperature.html)          | [observations/hourly-temperature/html](https://rsshub.app/nmc/publish/observations/hourly-temperature/html)               |
  | [风](https://www.nmc.cn/publish/observations/hourly-winds.html)                  | [observations/hourly-winds/html](https://rsshub.app/nmc/publish/observations/hourly-winds/html)                           |
  | [能见度](https://www.nmc.cn/publish/sea/seaplatform1.html)                       | [sea/seaplatform1/html](https://rsshub.app/nmc/publish/sea/seaplatform1/html)                                             |
  | [强对流](https://www.nmc.cn/publish/observations/lighting.html)                  | [observations/lighting/html](https://rsshub.app/nmc/publish/observations/lighting/html)                                   |
  | [土壤水分](https://www.nmc.cn/publish/soil-moisture/10cm.html)                   | [soil-moisture/10cm/html](https://rsshub.app/nmc/publish/soil-moisture/10cm/html)                                         |

  #### [城市预报](https://www.nmc.cn/publish/forecast.html)

  | Category                                             | ID                                                            |
  | ---------------------------------------------------- | ------------------------------------------------------------- |
  | [城市预报](https://www.nmc.cn/publish/forecast.html) | [forecast/html](https://rsshub.app/nmc/publish/forecast/html) |

  #### [天气预报](https://www.nmc.cn/publish/weather-bulletin/index.htm)

  | Category                                                                                                        | ID                                                                                                                                                      |
  | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | [天气公报](https://www.nmc.cn/publish/weather-bulletin/index.htm)                                               | [weather-bulletin/index/htm](https://rsshub.app/nmc/publish/weather-bulletin/index/htm)                                                                 |
  | [每日天气提示](https://www.nmc.cn/publish/weatherperday/index.htm)                                              | [weatherperday/index/htm](https://rsshub.app/nmc/publish/weatherperday/index/htm)                                                                       |
  | [春运气象服务专报](https://www.nmc.cn/publish/weather_forecast/swssr.htm)                                       | [weather_forecast/swssr/htm](https://rsshub.app/nmc/publish/weather_forecast/swssr/htm)                                                                 |
  | [气象灾害预警](https://www.nmc.cn/publish/country/warning/fog.html)                                             | [country/warning/fog/html](https://rsshub.app/nmc/publish/country/warning/fog/html)                                                                     |
  | [重要天气提示](https://www.nmc.cn/publish/news/weather_new.html)                                                | [news/weather_new/html](https://rsshub.app/nmc/publish/news/weather_new/html)                                                                           |
  | [重要天气盘点](https://www.nmc.cn/publish/tianqiyubao/zhongyaotianqipandian/index.html)                         | [tianqiyubao/zhongyaotianqipandian/index/html](https://rsshub.app/nmc/publish/tianqiyubao/zhongyaotianqipandian/index/html)                             |
  | [降水量预报](https://www.nmc.cn/publish/precipitation/1-day.html)                                               | [precipitation/1-day/html](https://rsshub.app/nmc/publish/precipitation/1-day/html)                                                                     |
  | [冻雨预报](https://www.nmc.cn/publish/tianqiyubao/dongyuyubao/index.html)                                       | [tianqiyubao/dongyuyubao/index/html](https://rsshub.app/nmc/publish/tianqiyubao/dongyuyubao/index/html)                                                 |
  | [气温预报](https://www.nmc.cn/publish/temperature/hight/24hour.html)                                            | [temperature/hight/24hour/html](https://rsshub.app/nmc/publish/temperature/hight/24hour/html)                                                           |
  | [大风预报](https://www.nmc.cn/publish/wind/24h.html)                                                            | [wind/24h/html](https://rsshub.app/nmc/publish/wind/24h/html)                                                                                           |
  | [强对流天气预报](https://www.nmc.cn/publish/bulletin/swpc.html)                                                 | [bulletin/swpc/html](https://rsshub.app/nmc/publish/bulletin/swpc/html)                                                                                 |
  | [中期天气](https://www.nmc.cn/publish/bulletin/mid-range.htm)                                                   | [bulletin/mid-range/htm](https://rsshub.app/nmc/publish/bulletin/mid-range/htm)                                                                         |
  | [全球天气预报](https://www.nmc.cn/publish/bulletin/abroadweather.html)                                          | [bulletin/abroadweather/html](https://rsshub.app/nmc/publish/bulletin/abroadweather/html)                                                               |
  | [全球灾害性天气监测月报](https://www.nmc.cn/publish/tianqiyubao/quanqiuzaihaixingtianqijianceyuebao/index.html) | [tianqiyubao/quanqiuzaihaixingtianqijianceyuebao/index/html](https://rsshub.app/nmc/publish/tianqiyubao/quanqiuzaihaixingtianqijianceyuebao/index/html) |
  | [环境气象公报](https://www.nmc.cn/publish/observations/environmental.html)                                      | [observations/environmental/html](https://rsshub.app/nmc/publish/observations/environmental/html)                                                       |
  | [山洪灾害气象预警](https://www.nmc.cn/publish/mountainflood.html)                                               | [mountainflood/html](https://rsshub.app/nmc/publish/mountainflood/html)                                                                                 |
  | [地质灾害气象风险预警](https://www.nmc.cn/publish/geohazard.html)                                               | [geohazard/html](https://rsshub.app/nmc/publish/geohazard/html)                                                                                         |
  | [中小河流洪水气象风险预警](https://www.nmc.cn/publish/swdz/zxhlhsqxyj.html)                                     | [swdz/zxhlhsqxyj/html](https://rsshub.app/nmc/publish/swdz/zxhlhsqxyj/html)                                                                             |
  | [渍涝风险气象预警](https://www.nmc.cn/publish/waterlogging.html)                                                | [waterlogging/html](https://rsshub.app/nmc/publish/waterlogging/html)                                                                                   |
  | [交通气象预报](https://www.nmc.cn/publish/traffic.html)                                                         | [traffic/html](https://rsshub.app/nmc/publish/traffic/html)                                                                                             |
  | [森林火险预报](https://www.nmc.cn/publish/environment/forestfire-doc.html)                                      | [environment/forestfire-doc/html](https://rsshub.app/nmc/publish/environment/forestfire-doc/html)                                                       |
  | [草原火险预报](https://www.nmc.cn/publish/environment/glassland-fire.html)                                      | [environment/glassland-fire/html](https://rsshub.app/nmc/publish/environment/glassland-fire/html)                                                       |

  #### [台风海洋](https://www.nmc.cn/publish/typhoon/typhoon_new.html)

  | Category                                                                              | ID                                                                                                                      |
  | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
  | [台风快讯与报文](https://www.nmc.cn/publish/typhoon/typhoon_new.html)                 | [typhoon/typhoon_new/html](https://rsshub.app/nmc/publish/typhoon/typhoon_new/html)                                     |
  | [台风路径预报](https://www.nmc.cn/publish/typhoon/probability-img2.html)              | [typhoon/probability-img2/html](https://rsshub.app/nmc/publish/typhoon/probability-img2/html)                           |
  | [台风公报](https://www.nmc.cn/publish/typhoon/warning.html)                           | [typhoon/warning/html](https://rsshub.app/nmc/publish/typhoon/warning/html)                                             |
  | [台风预警](https://www.nmc.cn/publish/typhoon/warning_index.html)                     | [typhoon/warning_index/html](https://rsshub.app/nmc/publish/typhoon/warning_index/html)                                 |
  | [海区预报](https://www.nmc.cn/publish/marine/newcoastal.html)                         | [marine/newcoastal/html](https://rsshub.app/nmc/publish/marine/newcoastal/html)                                         |
  | [海事公报](https://www.nmc.cn/publish/marine/maritime.html)                           | [marine/maritime/html](https://rsshub.app/nmc/publish/marine/maritime/html)                                             |
  | [海洋天气预报](https://www.nmc.cn/publish/marine/forecast.htm)                        | [marine/forecast/htm](https://rsshub.app/nmc/publish/marine/forecast/htm)                                               |
  | [近海海雾预报](https://www.nmc.cn/publish/taifenghaiyang/jinhaihaiwuyubao/index.html) | [taifenghaiyang/jinhaihaiwuyubao/index/html](https://rsshub.app/nmc/publish/taifenghaiyang/jinhaihaiwuyubao/index/html) |
  | [海区风力预报](https://www.nmc.cn/publish/taifenghaiyang/haiqufengliyubao/index.html) | [taifenghaiyang/haiqufengliyubao/index/html](https://rsshub.app/nmc/publish/taifenghaiyang/haiqufengliyubao/index/html) |
  | [北太平洋分析与预报](https://www.nmc.cn/publish/marine/h000.html)                     | [marine/h000/html](https://rsshub.app/nmc/publish/marine/h000/html)                                                     |
  | [全球热带气旋监测公报](https://www.nmc.cn/publish/typhoon/totalcyclone.htm)           | [typhoon/totalcyclone/htm](https://rsshub.app/nmc/publish/typhoon/totalcyclone/htm)                                     |
  | [台风命名](https://www.nmc.cn/publish/typhoon/typhoon-name/index.html)                | [typhoon/typhoon-name/index/html](https://rsshub.app/nmc/publish/typhoon/typhoon-name/index/html)                       |
  | [台风综合信息](http://typhoon.nmc.cn)                                                 | [http://typhoon/nmc.cn](https://rsshub.app/nmc/publish/http://typhoon/nmc.cn)                                           |

  #### [全球预报](https://www.nmc.cn/publish/quanqiuyubao/quanqiutianqigongbao/index.html)

  | Category                                                                                                         | ID                                                                                                                                                                |
  | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | [全球天气公报](https://www.nmc.cn/publish/quanqiuyubao/quanqiutianqigongbao/index.html)                          | [quanqiuyubao/quanqiutianqigongbao/index/html](https://rsshub.app/nmc/publish/quanqiuyubao/quanqiutianqigongbao/index/html)                                       |
  | [全球热带气旋监测公报](https://www.nmc.cn/publish/quanqiuyubao/quanqiuredaiqixuanjiancegongbao/index.html)       | [quanqiuyubao/quanqiuredaiqixuanjiancegongbao/index/html](https://rsshub.app/nmc/publish/quanqiuyubao/quanqiuredaiqixuanjiancegongbao/index/html)                 |
  | [WMO第XI海区海事天气公报](https://www.nmc.cn/publish/quanqiuyubao/WMOdiXIhaiquhaishitianqigongbao/index.html)    | [quanqiuyubao/WMOdiXIhaiquhaishitianqigongbao/index/html](https://rsshub.app/nmc/publish/quanqiuyubao/WMOdiXIhaiquhaishitianqigongbao/index/html)                 |
  | [全球灾害性天气监测月报](https://www.nmc.cn/publish/quanqiuyubao/quanqiuzaihaixingtianqijianceyuebao/index.html) | [quanqiuyubao/quanqiuzaihaixingtianqijianceyuebao/index/html](https://rsshub.app/nmc/publish/quanqiuyubao/quanqiuzaihaixingtianqijianceyuebao/index/html)         |
  | [全球雨雪落区预报](https://www.nmc.cn/publish/quanqiuyubao/quanqiuyuxueluoquyubao/yazhou/24xiaoshi/index.html)   | [quanqiuyubao/quanqiuyuxueluoquyubao/yazhou/24xiaoshi/index/html](https://rsshub.app/nmc/publish/quanqiuyubao/quanqiuyuxueluoquyubao/yazhou/24xiaoshi/index/html) |

  #### [环境气象](https://www.nmc.cn/publish/fog.html)

  | Category                                                                                                 | ID                                                                                                                                                    |
  | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
  | [雾预报](https://www.nmc.cn/publish/fog.html)                                                            | [fog/html](https://rsshub.app/nmc/publish/fog/html)                                                                                                   |
  | [霾预报](https://www.nmc.cn/publish/haze.html)                                                           | [haze/html](https://rsshub.app/nmc/publish/haze/html)                                                                                                 |
  | [沙尘天气预报](https://www.nmc.cn/publish/severeweather/dust.html)                                       | [severeweather/dust/html](https://rsshub.app/nmc/publish/severeweather/dust/html)                                                                     |
  | [空气污染气象条件预报](https://www.nmc.cn/publish/environment/air_pollution-24.html)                     | [environment/air_pollution-24/html](https://rsshub.app/nmc/publish/environment/air_pollution-24/html)                                                 |
  | [环境气象公报](https://www.nmc.cn/publish/observations/environmental.html)                               | [observations/environmental/html](https://rsshub.app/nmc/publish/observations/environmental/html)                                                     |
  | [大气环境气象公报](https://www.nmc.cn/publish/environment/National-Bulletin-atmospheric-environment.htm) | [environment/National-Bulletin-atmospheric-environment/htm](https://rsshub.app/nmc/publish/environment/National-Bulletin-atmospheric-environment/htm) |

  #### [农业气象](https://www.nmc.cn/publish/agro/soil-moisture-monitoring-10cm.html)

  | Category                                                                                                                 | ID                                                                                                                                                                                    |
  | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | [土壤水分监测](https://www.nmc.cn/publish/agro/soil-moisture-monitoring-10cm.html)                                       | [agro/soil-moisture-monitoring-10cm/html](https://rsshub.app/nmc/publish/agro/soil-moisture-monitoring-10cm/html)                                                                     |
  | [农业干旱综合监测](https://www.nmc.cn/publish/agro/disastersmonitoring/Agricultural_Drought_Monitoring.htm)              | [agro/disastersmonitoring/Agricultural_Drought_Monitoring/htm](https://rsshub.app/nmc/publish/agro/disastersmonitoring/Agricultural_Drought_Monitoring/htm)                           |
  | [关键农时农事](https://www.nmc.cn/publish/agro/weatherservices/harvest_in_autumn.html)                                   | [agro/weatherservices/harvest_in_autumn/html](https://rsshub.app/nmc/publish/agro/weatherservices/harvest_in_autumn/html)                                                             |
  | [农业气象周报](https://www.nmc.cn/publish/agro/ten-week/index.html)                                                      | [agro/ten-week/index/html](https://rsshub.app/nmc/publish/agro/ten-week/index/html)                                                                                                   |
  | [农业气象月报](https://www.nmc.cn/publish/agro/monthly/index.html)                                                       | [agro/monthly/index/html](https://rsshub.app/nmc/publish/agro/monthly/index/html)                                                                                                     |
  | [生态气象监测评估](https://www.nmc.cn/publish/nongyeqixiang/shengtaiqixiangjiance/caodishengtaiqixiangjiance/index.html) | [nongyeqixiang/shengtaiqixiangjiance/caodishengtaiqixiangjiance/index/html](https://rsshub.app/nmc/publish/nongyeqixiang/shengtaiqixiangjiance/caodishengtaiqixiangjiance/index/html) |
  | [农业气象专报](https://www.nmc.cn/publish/crop/index.htm)                                                                | [crop/index/htm](https://rsshub.app/nmc/publish/crop/index/htm)                                                                                                                       |
  | [作物发育期监测](https://www.nmc.cn/publish/agro/information/winter-wheat.html)                                          | [agro/information/winter-wheat/html](https://rsshub.app/nmc/publish/agro/information/winter-wheat/html)                                                                               |
  | [农业气象灾害风险预警](https://www.nmc.cn/publish/nongyeqixiang/quanguonongyeqixiangzaihaifengxianyujing/index.html)     | [nongyeqixiang/quanguonongyeqixiangzaihaifengxianyujing/index/html](https://rsshub.app/nmc/publish/nongyeqixiang/quanguonongyeqixiangzaihaifengxianyujing/index/html)                 |
  | [国外农业气象月报](https://www.nmc.cn/publish/nongyeqixiang/guowainongyeqixiangyuebao/index.html)                        | [nongyeqixiang/guowainongyeqixiangyuebao/index/html](https://rsshub.app/nmc/publish/nongyeqixiang/guowainongyeqixiangyuebao/index/html)                                               |

</details>
`,
        categories: [`forecast`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [String.raw`www.nmc.cn/publish/$:path(.*)\.(:ext(html|htm))`],
                target: (e) => {
                    let t = e.path,
                        n = e.ext,
                        r = t && n ? `${t}/${n}` : void 0;
                    return `/nmc/publish${r ? `/${r}` : ``}`;
                },
            },
            { title: `首页 - 卫星云图`, source: [`www.nmc.cn/publish/satellite/fy4b-visible.htm`], target: `/publish/satellite/fy4b-visible/htm` },
            { title: `首页 - 气象灾害预警`, source: [`www.nmc.cn/publish/country/warning/index.html`], target: `/publish/country/warning/index/html` },
            { title: `首页 - 环境气象公报`, source: [`www.nmc.cn/publish/observations/environmental.html`], target: `/publish/observations/environmental/html` },
            { title: `首页 - 降水量预报`, source: [`www.nmc.cn/publish/precipitation/1-day.html`], target: `/publish/precipitation/1-day/html` },
            { title: `首页 - 天气公报`, source: [`www.nmc.cn/publish/weather-bulletin/index.htm`], target: `/publish/weather-bulletin/index/htm` },
            { title: `首页 - 每日天气提示`, source: [`www.nmc.cn/publish/weatherperday/index.htm`], target: `/publish/weatherperday/index/htm` },
            { title: `首页 - 城市天气预报`, source: [`www.nmc.cn/publish/forecast.html`], target: `/publish/forecast/html` },
            { title: `天气实况 - 天气图`, source: [`www.nmc.cn/publish/observations/china/dm/weatherchart-h000.htm`], target: `/publish/observations/china/dm/weatherchart-h000/htm` },
            { title: `天气实况 - 卫星云图`, source: [`www.nmc.cn/publish/satellite/fy4b-visible.htm`], target: `/publish/satellite/fy4b-visible/htm` },
            { title: `天气实况 - 雷达图`, source: [`www.nmc.cn/publish/radar/chinaall.html`], target: `/publish/radar/chinaall/html` },
            { title: `天气实况 - 降水量`, source: [`www.nmc.cn/publish/observations/hourly-precipitation.html`], target: `/publish/observations/hourly-precipitation/html` },
            { title: `天气实况 - 气温`, source: [`www.nmc.cn/publish/observations/hourly-temperature.html`], target: `/publish/observations/hourly-temperature/html` },
            { title: `天气实况 - 风`, source: [`www.nmc.cn/publish/observations/hourly-winds.html`], target: `/publish/observations/hourly-winds/html` },
            { title: `天气实况 - 能见度`, source: [`www.nmc.cn/publish/sea/seaplatform1.html`], target: `/publish/sea/seaplatform1/html` },
            { title: `天气实况 - 强对流`, source: [`www.nmc.cn/publish/observations/lighting.html`], target: `/publish/observations/lighting/html` },
            { title: `天气实况 - 土壤水分`, source: [`www.nmc.cn/publish/soil-moisture/10cm.html`], target: `/publish/soil-moisture/10cm/html` },
            { title: `城市预报 - 城市预报`, source: [`www.nmc.cn/publish/forecast.html`], target: `/publish/forecast/html` },
            { title: `天气预报 - 天气公报`, source: [`www.nmc.cn/publish/weather-bulletin/index.htm`], target: `/publish/weather-bulletin/index/htm` },
            { title: `天气预报 - 每日天气提示`, source: [`www.nmc.cn/publish/weatherperday/index.htm`], target: `/publish/weatherperday/index/htm` },
            { title: `天气预报 - 春运气象服务专报`, source: [`www.nmc.cn/publish/weather_forecast/swssr.htm`], target: `/publish/weather_forecast/swssr/htm` },
            { title: `天气预报 - 气象灾害预警`, source: [`www.nmc.cn/publish/country/warning/fog.html`], target: `/publish/country/warning/fog/html` },
            { title: `天气预报 - 重要天气提示`, source: [`www.nmc.cn/publish/news/weather_new.html`], target: `/publish/news/weather_new/html` },
            { title: `天气预报 - 重要天气盘点`, source: [`www.nmc.cn/publish/tianqiyubao/zhongyaotianqipandian/index.html`], target: `/publish/tianqiyubao/zhongyaotianqipandian/index/html` },
            { title: `天气预报 - 降水量预报`, source: [`www.nmc.cn/publish/precipitation/1-day.html`], target: `/publish/precipitation/1-day/html` },
            { title: `天气预报 - 冻雨预报`, source: [`www.nmc.cn/publish/tianqiyubao/dongyuyubao/index.html`], target: `/publish/tianqiyubao/dongyuyubao/index/html` },
            { title: `天气预报 - 气温预报`, source: [`www.nmc.cn/publish/temperature/hight/24hour.html`], target: `/publish/temperature/hight/24hour/html` },
            { title: `天气预报 - 大风预报`, source: [`www.nmc.cn/publish/wind/24h.html`], target: `/publish/wind/24h/html` },
            { title: `天气预报 - 强对流天气预报`, source: [`www.nmc.cn/publish/bulletin/swpc.html`], target: `/publish/bulletin/swpc/html` },
            { title: `天气预报 - 中期天气`, source: [`www.nmc.cn/publish/bulletin/mid-range.htm`], target: `/publish/bulletin/mid-range/htm` },
            { title: `天气预报 - 全球天气预报`, source: [`www.nmc.cn/publish/bulletin/abroadweather.html`], target: `/publish/bulletin/abroadweather/html` },
            { title: `天气预报 - 全球灾害性天气监测月报`, source: [`www.nmc.cn/publish/tianqiyubao/quanqiuzaihaixingtianqijianceyuebao/index.html`], target: `/publish/tianqiyubao/quanqiuzaihaixingtianqijianceyuebao/index/html` },
            { title: `天气预报 - 环境气象公报`, source: [`www.nmc.cn/publish/observations/environmental.html`], target: `/publish/observations/environmental/html` },
            { title: `天气预报 - 山洪灾害气象预警`, source: [`www.nmc.cn/publish/mountainflood.html`], target: `/publish/mountainflood/html` },
            { title: `天气预报 - 地质灾害气象风险预警`, source: [`www.nmc.cn/publish/geohazard.html`], target: `/publish/geohazard/html` },
            { title: `天气预报 - 中小河流洪水气象风险预警`, source: [`www.nmc.cn/publish/swdz/zxhlhsqxyj.html`], target: `/publish/swdz/zxhlhsqxyj/html` },
            { title: `天气预报 - 渍涝风险气象预警`, source: [`www.nmc.cn/publish/waterlogging.html`], target: `/publish/waterlogging/html` },
            { title: `天气预报 - 交通气象预报`, source: [`www.nmc.cn/publish/traffic.html`], target: `/publish/traffic/html` },
            { title: `天气预报 - 森林火险预报`, source: [`www.nmc.cn/publish/environment/forestfire-doc.html`], target: `/publish/environment/forestfire-doc/html` },
            { title: `天气预报 - 草原火险预报`, source: [`www.nmc.cn/publish/environment/glassland-fire.html`], target: `/publish/environment/glassland-fire/html` },
            { title: `台风海洋 - 台风快讯与报文`, source: [`www.nmc.cn/publish/typhoon/typhoon_new.html`], target: `/publish/typhoon/typhoon_new/html` },
            { title: `台风海洋 - 台风路径预报`, source: [`www.nmc.cn/publish/typhoon/probability-img2.html`], target: `/publish/typhoon/probability-img2/html` },
            { title: `台风海洋 - 台风公报`, source: [`www.nmc.cn/publish/typhoon/warning.html`], target: `/publish/typhoon/warning/html` },
            { title: `台风海洋 - 台风预警`, source: [`www.nmc.cn/publish/typhoon/warning_index.html`], target: `/publish/typhoon/warning_index/html` },
            { title: `台风海洋 - 海区预报`, source: [`www.nmc.cn/publish/marine/newcoastal.html`], target: `/publish/marine/newcoastal/html` },
            { title: `台风海洋 - 海事公报`, source: [`www.nmc.cn/publish/marine/maritime.html`], target: `/publish/marine/maritime/html` },
            { title: `台风海洋 - 海洋天气预报`, source: [`www.nmc.cn/publish/marine/forecast.htm`], target: `/publish/marine/forecast/htm` },
            { title: `台风海洋 - 近海海雾预报`, source: [`www.nmc.cn/publish/taifenghaiyang/jinhaihaiwuyubao/index.html`], target: `/publish/taifenghaiyang/jinhaihaiwuyubao/index/html` },
            { title: `台风海洋 - 海区风力预报`, source: [`www.nmc.cn/publish/taifenghaiyang/haiqufengliyubao/index.html`], target: `/publish/taifenghaiyang/haiqufengliyubao/index/html` },
            { title: `台风海洋 - 北太平洋分析与预报`, source: [`www.nmc.cn/publish/marine/h000.html`], target: `/publish/marine/h000/html` },
            { title: `台风海洋 - 全球热带气旋监测公报`, source: [`www.nmc.cn/publish/typhoon/totalcyclone.htm`], target: `/publish/typhoon/totalcyclone/htm` },
            { title: `台风海洋 - 台风命名`, source: [`www.nmc.cn/publish/typhoon/typhoon-name/index.html`], target: `/publish/typhoon/typhoon-name/index/html` },
            { title: `台风海洋 - 台风综合信息`, source: [`typhoon.nmc.cn`], target: `/publish/http://typhoon/nmc.cn` },
            { title: `全球预报 - 全球天气公报`, source: [`www.nmc.cn/publish/quanqiuyubao/quanqiutianqigongbao/index.html`], target: `/publish/quanqiuyubao/quanqiutianqigongbao/index/html` },
            { title: `全球预报 - 全球热带气旋监测公报`, source: [`www.nmc.cn/publish/quanqiuyubao/quanqiuredaiqixuanjiancegongbao/index.html`], target: `/publish/quanqiuyubao/quanqiuredaiqixuanjiancegongbao/index/html` },
            { title: `全球预报 - WMO第XI海区海事天气公报`, source: [`www.nmc.cn/publish/quanqiuyubao/WMOdiXIhaiquhaishitianqigongbao/index.html`], target: `/publish/quanqiuyubao/WMOdiXIhaiquhaishitianqigongbao/index/html` },
            { title: `全球预报 - 全球灾害性天气监测月报`, source: [`www.nmc.cn/publish/quanqiuyubao/quanqiuzaihaixingtianqijianceyuebao/index.html`], target: `/publish/quanqiuyubao/quanqiuzaihaixingtianqijianceyuebao/index/html` },
            { title: `全球预报 - 全球雨雪落区预报`, source: [`www.nmc.cn/publish/quanqiuyubao/quanqiuyuxueluoquyubao/yazhou/24xiaoshi/index.html`], target: `/publish/quanqiuyubao/quanqiuyuxueluoquyubao/yazhou/24xiaoshi/index/html` },
            { title: `环境气象 - 雾预报`, source: [`www.nmc.cn/publish/fog.html`], target: `/publish/fog/html` },
            { title: `环境气象 - 霾预报`, source: [`www.nmc.cn/publish/haze.html`], target: `/publish/haze/html` },
            { title: `环境气象 - 沙尘天气预报`, source: [`www.nmc.cn/publish/severeweather/dust.html`], target: `/publish/severeweather/dust/html` },
            { title: `环境气象 - 空气污染气象条件预报`, source: [`www.nmc.cn/publish/environment/air_pollution-24.html`], target: `/publish/environment/air_pollution-24/html` },
            { title: `环境气象 - 环境气象公报`, source: [`www.nmc.cn/publish/observations/environmental.html`], target: `/publish/observations/environmental/html` },
            { title: `环境气象 - 大气环境气象公报`, source: [`www.nmc.cn/publish/environment/National-Bulletin-atmospheric-environment.htm`], target: `/publish/environment/National-Bulletin-atmospheric-environment/htm` },
            { title: `农业气象 - 土壤水分监测`, source: [`www.nmc.cn/publish/agro/soil-moisture-monitoring-10cm.html`], target: `/publish/agro/soil-moisture-monitoring-10cm/html` },
            { title: `农业气象 - 农业干旱综合监测`, source: [`www.nmc.cn/publish/agro/disastersmonitoring/Agricultural_Drought_Monitoring.htm`], target: `/publish/agro/disastersmonitoring/Agricultural_Drought_Monitoring/htm` },
            { title: `农业气象 - 关键农时农事`, source: [`www.nmc.cn/publish/agro/weatherservices/harvest_in_autumn.html`], target: `/publish/agro/weatherservices/harvest_in_autumn/html` },
            { title: `农业气象 - 农业气象周报`, source: [`www.nmc.cn/publish/agro/ten-week/index.html`], target: `/publish/agro/ten-week/index/html` },
            { title: `农业气象 - 农业气象月报`, source: [`www.nmc.cn/publish/agro/monthly/index.html`], target: `/publish/agro/monthly/index/html` },
            {
                title: `农业气象 - 生态气象监测评估`,
                source: [`www.nmc.cn/publish/nongyeqixiang/shengtaiqixiangjiance/caodishengtaiqixiangjiance/index.html`],
                target: `/publish/nongyeqixiang/shengtaiqixiangjiance/caodishengtaiqixiangjiance/index/html`,
            },
            { title: `农业气象 - 农业气象专报`, source: [`www.nmc.cn/publish/crop/index.htm`], target: `/publish/crop/index/htm` },
            { title: `农业气象 - 作物发育期监测`, source: [`www.nmc.cn/publish/agro/information/winter-wheat.html`], target: `/publish/agro/information/winter-wheat/html` },
            {
                title: `农业气象 - 农业气象灾害风险预警`,
                source: [`www.nmc.cn/publish/nongyeqixiang/quanguonongyeqixiangzaihaifengxianyujing/index.html`],
                target: `/publish/nongyeqixiang/quanguonongyeqixiangzaihaifengxianyujing/index/html`,
            },
            { title: `农业气象 - 国外农业气象月报`, source: [`www.nmc.cn/publish/nongyeqixiang/guowainongyeqixiangyuebao/index.html`], target: `/publish/nongyeqixiang/guowainongyeqixiangyuebao/index/html` },
        ],
        view: r.Articles,
    };
export { f as handler, p as route };
