export function getCurrentDate() {
    let date = new Date(); 

    let month = date.getMonth() + 1;
    let day = date.getDate();  
    let year = date.getFullYear();
    
    return (year + '-' + month + '-' + day)
}