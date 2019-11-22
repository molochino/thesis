import { countNewsMentionsByWeek } from "./count_mentions_week.js";
import { renderDiagram } from "./render_diagram.js";
import { renderStats } from "./render_stats.js";

document.title = `"${localStorage.query}" нашлось ${localStorage.numberOfArticles} публикаций`

renderStats();
renderDiagram(countNewsMentionsByWeek());

window.addEventListener('resize', function() {
    renderDiagram(countNewsMentionsByWeek());
})