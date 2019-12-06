import "./pages/index.css";
import {Api} from "./scripts/api.js";
import {CardList} from "./scripts/cardList.js";
import {getCurrentDate, getPastDate, saveInStorage, getArticlesFromStorage} from "./scripts/utility-functions.js";
import {Validation} from "./scripts/validation.js";

const form = document.forms.search__form;
let list;
const moreButton = document.querySelector('.results__more-button');
const results = document.querySelector('.results');
const noResults = document.querySelector('.no-results');
const resultsLink = document.querySelector('.results__link');    
const resultsError = document.querySelector('.results__error-message');
const cardContainer = document.querySelector('.results__cards-container');
const numberOfDaysToLookBack = 6;
const preloader = document.querySelector('.preloader'); 

let validation = new Validation ();

function setResultDisplaysToNone() {
    noResults.style.display = 'none';
    resultsLink.style.display = 'none';
    results.style.display = 'none';
    resultsError.style.display = 'none';
    moreButton.style.display = 'none';
    cardContainer.style.display = 'none';
}

function drawCards(articles) {
    results.style.display = 'block';
    moreButton.style.display = 'block';
    resultsLink.style.display = 'block'; 
    cardContainer.style.display = 'grid';

    list = new CardList(cardContainer, articles);  
    list.clearList();
    list.render();               
}

if (localStorage.length > 1) {
    drawCards(getArticlesFromStorage(localStorage));
    form.query.value = localStorage.getItem('query');
}

moreButton.addEventListener('click', function(event){
    list.render()
});

form.addEventListener('submit', function(event) {
    event.preventDefault();  
    
    if (validation.validateSearchForm(form.query.value)) {
        setResultDisplaysToNone();

        preloader.style.display = 'block'; 
        form.query.disabled = true;  
        form.button.disabled = true;

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
                    localStorage.clear();              
                    saveInStorage(result);                                    
                    localStorage.setItem('query', form.query.value);
                                        
                    drawCards(result.articles)               
                } else {                            
                    noResults.style.display = 'flex';
                    localStorage.clear();
                }
            })        
            .catch((error) => {       
                results.style.display = 'block';            
                resultsError.style.display = 'block';
                localStorage.clear();
            })  
            .finally(function() {
                form.query.disabled = false;
                form.button.disabled = false;
                preloader.style.display = 'none';           
            })
    }    
})