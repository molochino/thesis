import "./pages/paper.css";
import {countNewsMentionsByWeek, renderDiagram, renderStats} from "./scripts/utility-functions.js";

document.title = `"${localStorage.query}" нашлось ${localStorage.numberOfArticles} публикаций`

renderStats();
renderDiagram(countNewsMentionsByWeek());

window.addEventListener('resize', function() {
    renderDiagram(countNewsMentionsByWeek());
})