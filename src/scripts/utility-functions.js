const dates = document.querySelectorAll('.analytics__date');
const mentions = document.querySelectorAll('.analytics__mentions');
const analyticsChartHeaderDiagram = document.querySelector('.analytics__chart-header-diagram');
const analyticsChartHeaderMonth = document.querySelector('.analytics__chart-header-month');
const statsTitle = document.querySelector('.stats__title');
const statsNumbersWeek = document.querySelector('.stats__numbers_week');
const statsNumbersHeaders = document.querySelector('.stats__numbers_headers');

function countMentionsInHeaders(storage) {
    let counter = 0;
    for (let i = 0; i < storage.getItem('numberOfArticles'); i++) {
        if (JSON.parse(storage.getItem(i)).title.toLowerCase().includes(storage.getItem('query').toLowerCase())) {
            counter++
        }        
    }
    return counter;
}

function countNewsMentionsByWeek() {
    let newsMentionsByWeek = {};
    let newsMentionsByWeekSorted = {};   

    for (let i = 0; i < localStorage.getItem('numberOfArticles'); i++) {       
        if (!Array.from(Object.keys(newsMentionsByWeek)).includes(JSON.parse(localStorage.getItem(i)).publishedAt.slice(0, 10))) {
            newsMentionsByWeek[JSON.parse(localStorage.getItem(i)).publishedAt.slice(0, 10)] = 0;
        }
        
        newsMentionsByWeek[JSON.parse(localStorage.getItem(i)).publishedAt.slice(0, 10)]++        
    }

    Object.keys(newsMentionsByWeek).sort().forEach(key => {
        newsMentionsByWeekSorted[key] = newsMentionsByWeek[key]
    })   
    
    return newsMentionsByWeekSorted;
}

function getArticlesFromStorage(storage) {
    let restoredArticles = [];
    for (let i = 0; i < storage.getItem('numberOfArticles'); i++) {
        restoredArticles[i] = JSON.parse(storage[i]);
    }   
    return restoredArticles;
}

function getCurrentDate() {
    let date = new Date(); 

    let month = date.getMonth() + 1;
    let day = date.getDate();  
    let year = date.getFullYear();
    
    return (year + '-' + month + '-' + day)
}

function getPastDate(days) {
    let date = new Date();
    let day;        

    let copyOfDate = new Date();
    copyOfDate.setDate(date.getDate() - days);    
    if (copyOfDate.getDate().toString().length == 1) {
        day = '0' + copyOfDate.getDate(); 
    } else {
        day = copyOfDate.getDate(); 
    }    
    
    let month = copyOfDate.getMonth() + 1;  

    let year = copyOfDate.getFullYear();    
    
    return (year + '-' + month + '-' + day)
}

function renderDiagram(newsMentionsByWeek) {    
    let onePercentWidthValue = analyticsChartHeaderDiagram.offsetWidth / 100;

    const daysOfWeek = {
        0: 'вс',
        1: 'пн',
        2: 'вт',
        3: 'ср',
        4: 'чт',
        5: 'пт',
        6: 'сб'
    }
    
    const months = {
        1: 'январь',
        2: 'февраль',
        3: 'март',
        4: 'апрель',
        5: 'май',
        6: 'июнь',
        7: 'июль',
        8: 'август',
        9: 'сентябрь',
        10: 'октябрь',
        11: 'ноябрь',
        12: 'декабрь'
    }

    analyticsChartHeaderMonth.textContent = `(${months[Object.keys(newsMentionsByWeek)[0].slice(5,7)]})`;

    dates.forEach((item, index) => {        
        item.textContent = Math.abs(Object.keys(newsMentionsByWeek)[index].slice(-2)) + ', ' + daysOfWeek[new Date(Object.keys(newsMentionsByWeek)[index]).getDay()];
    })    

    mentions.forEach((item, index) => {
        item.textContent = Object.values(newsMentionsByWeek)[index]
        item.style.width =  `${onePercentWidthValue * Object.values(newsMentionsByWeek)[index]}px`
    })
}

function renderStats() {    
    statsTitle.textContent = `Вы спросили: "${localStorage.getItem('query')}"`
    statsNumbersWeek.textContent = localStorage.getItem('numberOfArticles');
    statsNumbersHeaders.textContent = countMentionsInHeaders(localStorage);
};

function saveInStorage(result) {
    
    for (let i = 0; i < result.articles.length; i++) {
        localStorage.setItem(i, JSON.stringify(result.articles[i]))        
    }   
    localStorage.setItem('numberOfArticles', result.articles.length);                   
    localStorage.setItem('totalNumberOfNews', result.totalResults);  
    localStorage.setItem('dateToday', getCurrentDate());               
}

export {countMentionsInHeaders, countNewsMentionsByWeek, getArticlesFromStorage, getCurrentDate, getPastDate, renderDiagram, renderStats, saveInStorage};