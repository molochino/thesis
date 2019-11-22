import {getCurrentDate} from "./get_current_date.js"

export function saveInStorage(result) {
    for (let i = 0; i < result.articles.length; i++) {
        localStorage.setItem(i, JSON.stringify(result.articles[i]))        
    }   
    localStorage.setItem('numberOfArticles', result.articles.length);                   
    localStorage.setItem('totalNumberOfNews', result.totalResults);  
    localStorage.setItem('dateToday', getCurrentDate());               
}