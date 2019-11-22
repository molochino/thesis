import { countMentionsInHeaders } from "./count_mentions_in_headers";

export function renderStats() {
    const statsTitle = document.querySelector('.stats__title');
    const statsNumbersWeek = document.querySelector('.stats__numbers_week');
    const statsNumbersHeaders = document.querySelector('.stats__numbers_headers');
    
    statsTitle.textContent = `Вы спросили: "${localStorage.getItem('query')}"`
    statsNumbersWeek.textContent = localStorage.getItem('numberOfArticles');
    statsNumbersHeaders.textContent = countMentionsInHeaders(localStorage);
};