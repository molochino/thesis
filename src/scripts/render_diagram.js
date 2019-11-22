export function renderDiagram(newsMentionsByWeek) {
    const dates = document.querySelectorAll('.analytics__date');
    const mentions = document.querySelectorAll('.analytics__mentions');
    const analyticsChartHeaderDiagram = document.querySelector('.analytics__chart-header-diagram');
    const analyticsChartHeaderMonth = document.querySelector('.analytics__chart-header-month');
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
        item.textContent = Object.keys(newsMentionsByWeek)[index].slice(-2) + ', ' + daysOfWeek[new Date(Object.keys(newsMentionsByWeek)[index]).getDay()];
    })    

    mentions.forEach((item, index) => {
        item.textContent = Object.values(newsMentionsByWeek)[index]
        item.style.width =  `${onePercentWidthValue * Object.values(newsMentionsByWeek)[index]}px`
    })
}