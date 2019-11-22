import {Api} from "./api.js"
import {CardList} from "./card_list.js"
import {getCurrentDate} from "./get_current_date.js"
import {getPastDate} from "./get_past_date.js"
import {saveInStorage} from "./save_in_storage"

const form = document.forms.search__form;
let list;
const moreButton = document.querySelector('.results__more-button');

form.query.setCustomValidity('Нужно ввести ключевое слово!');

form.addEventListener('input', function(event) {
    if (!event.target.value) {
        event.target.setCustomValidity('Нужно ввести ключевое слово!')
    } else {
        event.target.setCustomValidity('')
    }
})

moreButton.addEventListener('click', function(event){
    list.render()
});

form.addEventListener('submit', function(event) {
    event.preventDefault();      

    const results = document.querySelector('.results');
    const noResults = document.querySelector('.no-results');
    const resultsLink = document.querySelector('.results__link');    
    const resultsError = document.querySelector('.results__error-message');
    const numberOfDaysToLookBack = 6;
    const preloader = document.querySelector('.preloader');   

    noResults.style.display = 'none';
    resultsLink.style.display = 'none';
    results.style.display = 'none';
    resultsError.style.display = 'none';
    preloader.style.display = 'block'; 
    form.query.disabled = true;     

    let api = new Api({
        baseUrl: 'https://newsapi.org/v2/everything?',    
        query: `q=${form.query.value}&`,        
        fromDate: `from=${getCurrentDate()}&`,
        toDate: `to=${getPastDate(numberOfDaysToLookBack)}&`,
        lang: 'language=ru&',
        pageSize: 'pageSize=100&',
        apiKey: 'apiKey=67f58f12c67744ffb7a0bd169d0d09e0',
    });    

    api.getNews()    
        .then((result) => {
            if (result.articles.length > 0) {
                results.style.display = 'block';
                moreButton.style.display = 'block';
                resultsLink.style.display = 'block';                
                
                saveInStorage(result);                      
                localStorage.setItem('query', form.query.value);               
                
                list = new CardList (document.querySelector('.results__cards-container'), result.articles);
            } else {                            
                noResults.style.display = 'flex';
            }
        })
        .catch((error) => {                      
            resultsError.style.display = 'block';
        })  
        .finally(function() {
            form.query.disabled = false;
            preloader.style.display = 'none';
        })
})