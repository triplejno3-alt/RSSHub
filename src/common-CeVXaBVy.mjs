import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
async function r(n) {
    let r = new URL(`https://9oyi4rk426.execute-api.ca-central-1.amazonaws.com/production/post`),
        s = Object.assign({ limit: 20, offset: 0 }, n);
    if (s.time_range !== void 0) {
        if (((s.time_range = s.time_range.toUpperCase()), !a.options.some((e) => e.value === s.time_range))) throw Error(`Invalid time range: ${s.time_range}`);
        s.time_range === `ALL` && (s.time_range = void 0);
    }
    if (s.category !== void 0 && s.category !== null) {
        let e = s.category;
        if (((s.category = i.options.find((t) => t.value.toLowerCase() === e.toLowerCase())?.value), s.category === void 0)) throw Error(`Invalid category: ${s.category}`);
    }
    if (s.tab !== void 0 && s.tab !== null && ((s.tab = s.tab.toUpperCase()), !Object.values(o).includes(s.tab))) throw Error(`Invalid tab: ${s.tab}`);
    for (let e in s) s[e] !== void 0 && s[e] !== null && r.searchParams.set(e, s[e]);
    return (await e(r.toString())).map((e) => ({
        title: e.headline,
        link: `https://www.voronoiapp.com/${e.category.split(` `).join(`-`).toLowerCase()}/${e.link}`,
        pubDate: t(e.published_at),
        description: `<img src="https://cdn.voronoiapp.com/public/${e.webp_image}" />
        ${e.description}`,
        image: `https://cdn.voronoiapp.com/public/${e.webp_image}`,
        author: e.author.first_name + ` ` + e.author.last_name,
        updated: t(e.updated_at),
        category: [e.category],
        enclosure_url: `https://cdn.voronoiapp.com/public/${e.dataset}`,
        enclosure_type: `text/csv`,
        enclosure_title: e.dataset,
        upvotes: e.likes,
        comments: e.commented,
    }));
}
const i = {
        description: `The category of the post`,
        default: ``,
        options: [
            { value: ``, label: `All categories` },
            { value: `Automotive`, label: `Automotive Data Insights - Explore a range of automotive data visualizations showcasing trends, innovations, and market dynamics in the automotive industry.` },
            { value: `Business`, label: `Business Visualization Trends - Discover business visualizations covering market analysis, corporate strategies, and economic impacts across global industries.` },
            { value: `Climate`, label: `Climate Data Visualized - Delve into climate change data visualizations that detail weather patterns, environmental impacts, and sustainability efforts worldwide.` },
            { value: `Demographics`, label: `Demographic Visual Insights - Explore visual demographics data showcasing population trends, societal changes, and demographic analytics across regions.` },
            { value: `Economy`, label: `Economic Visualization Insights - View economic visualizations illustrating financial markets, economic policies, and global economic health.` },
            { value: `Energy`, label: `Energy Industry Visual Data - Discover the dynamics of global energy consumption, renewable sources, and energy market trends through vivid visualizations.` },
            { value: `Entertainment`, label: `Entertainment Industry Data - Explore data visualizations in the entertainment industry, covering everything from box office trends to streaming service analytics.` },
            { value: `Geopolitics`, label: `Geopolitical Data Visualized - Understand global geopolitical shifts and international relations through comprehensive geopolitical data visualizations.` },
            { value: `Healthcare`, label: `Healthcare Insights Visualized - Analyze healthcare data visualizations spanning disease trends, healthcare services, and public health policies.` },
            { value: `Innovation`, label: `Innovation in Data - Dive into innovation data visualizations highlighting technology advancements, R&D investments, and patent trends.` },
            { value: `Maps`, label: `Cartographic Visual Insights - Discover cartographic visualizations that map everything from socio-economic data to geographical phenomena.` },
            { value: `Markets`, label: `Market Trends Visualized - Visualize market trends, financial data, and economic forecasts through comprehensive market visualizations.` },
            { value: `Money`, label: `Financial Data Visualized - Dive into financial visualizations depicting currency trends, investment flows, and banking statistics.` },
            { value: `Natural Resources`, label: `Natural Resources Data - Explore visualizations of natural resources, detailing extraction, consumption, and conservation data.` },
            { value: `Politics`, label: `Political Visual Insights - Analyze political trends, election results, and legislative impacts through detailed political visualizations.` },
            { value: `Public Opinion`, label: `Public Opinion Trends - Discover visualizations of public opinion polls, social trends, and cultural shifts across different regions.` },
            { value: `Real Estate`, label: `Real Estate Market Insights - Explore real estate market trends, property values, and urban development through targeted data visualizations.` },
            { value: `Sports`, label: `Sports Data Insights - Analyze sports data visualizations that showcase performance statistics, team rankings, and sports economics.` },
            { value: `Technology`, label: `Technology Trends Visualized - Dive into technology visualizations highlighting industry trends, tech adoption rates, and innovation impacts.` },
            { value: `Wealth`, label: `Wealth Distribution Insights - Explore wealth distribution, financial health, and economic disparities through detailed visualizations.` },
            { value: `Travel`, label: `Travel Trends Visualized - Discover travel trends, tourism statistics, and destination analytics through engaging visualizations.` },
            { value: `Nature`, label: `Nature and Conservation Data - Delve into visualizations of ecological data, wildlife statistics, and conservation efforts around the globe.` },
            { value: `Space`, label: `Space Exploration Data - Explore the universe with space data visualizations covering planetary science, space missions, and astronomical discoveries.` },
            { value: `Diagram`, label: `Diagrammatic Data Insights - Understand complex data through diagrams that simplify information across various topics and industries.` },
            { value: `Other`, label: `Diverse Data Visualizations - Explore a variety of data visualizations that don't neatly fit into any single category but offer unique insights.` },
        ],
    },
    a = {
        description: `Time range between which the posts are popular.`,
        default: `MONTH`,
        options: [
            { value: `WEEK`, label: `Last 7 days` },
            { value: `MONTH`, label: `Last 30 days` },
            { value: `YEAR`, label: `Last 12 months` },
            { value: `ALL`, label: `All time` },
        ],
    },
    o = { 'most-popular': `POPULAR`, 'most-discussed': `DISCUSSED`, 'most-viewed': `VIEWED` },
    s = {
        description: `The tab to get the popular posts from.`,
        default: `most-popular`,
        options: [
            { value: `most-popular`, label: `Most Liked` },
            { value: `most-discussed`, label: `Most Discussed` },
            { value: `most-viewed`, label: `Most Viewed` },
        ],
    },
    c = { url: `voronoiapp.com`, categories: [`picture`], view: n.Pictures, maintainers: [`Cesaryuan`] },
    l = {
        logo: `https://about.voronoiapp.com/wp-content/uploads/2023/07/voronoi-icon.png`,
        image: `https://about.voronoiapp.com/wp-content/uploads/2023/07/voronoi-icon.png`,
        icon: `https://about.voronoiapp.com/wp-content/uploads/2023/07/voronoi-icon.png`,
        allowEmpty: !0,
    };
export { s as a, o as i, l as n, a as o, c as r, r as s, i as t };
