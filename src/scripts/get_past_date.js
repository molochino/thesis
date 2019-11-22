export function getPastDate(days) {
    let date = new Date();    

    let month = date.getMonth() + 1;    

    let copyOfDate = new Date();
    copyOfDate.setDate(date.getDate() - days);   
    let day = copyOfDate.getDate();    

    let year = date.getFullYear();
    
    return (year + '-' + month + '-' + day)
}