import { getPastDate } from "./get_past_date.js"

export function countNewsMentionsByWeek() {
    let newsMentionsByWeek = {};

    for (let i = 0; i < 7; i++) {
        newsMentionsByWeek[getPastDate(i)] = 0;   
    }

    for (let i = 0; i < localStorage.getItem('numberOfArticles'); i++) {
        newsMentionsByWeek[JSON.parse(localStorage.getItem(i)).publishedAt.slice(0, 10)]++
    }

    return newsMentionsByWeek;
}