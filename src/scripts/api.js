export class Api {
    constructor(options) {
        this._options = options;
    }

    _constructUrl() {        
        return Object.values(this._options).reduce((url, item) => url + item)            
    }

    getNews() {        
        return fetch(`${this._constructUrl()}`, {
            method: 'GET'
        })
        .then(res => {
            if (res.ok) {
                return res.json()             
            }  
            return Promise.reject(`Ошибка: ${res.status}`);    
        })     
    }

    getCommits() {
        return fetch(`${this._constructUrl()}`, {
            method: 'GET'
        })
        .then(res => {
            if (res.ok) {
                return res.json()             
            }  
            return Promise.reject(`Ошибка: ${res.status}`);    
        })      
    }
}