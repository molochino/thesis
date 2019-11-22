export function countMentionsInHeaders(storage) {
    let counter = 0;
    for (let i = 0; i < storage.getItem('numberOfArticles'); i++) {
        if (JSON.parse(storage.getItem(i)).title.toLowerCase().includes(storage.getItem('query'))) {
            counter++
        }        
    }
    return counter;
}