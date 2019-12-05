import * as url from "../images/news.jpg"

export class CardList {
    constructor(container, cardsArray) {
        this._container = container;
        this._cards = cardsArray;   
        this._renderedCards = 0;         
    }

    _createElement(type, userClasses) {
        const el = document.createElement(type);
        el.classList.add(userClasses);
        return el;
    } 

    _transformDate(date) {        
        const months = {
            1: 'января',
            2: 'февраля',
            3: 'марта',
            4: 'апреля',
            5: 'мая',
            6: 'июня',
            7: 'июля',
            8: 'августа',
            9: 'сентября',
            10: 'октября',
            11: 'ноября',
            12: 'декабря',
        }

        const month = date.slice(5,7)        
        const day = date.slice(8,10);        
        const year = date.slice(0,4);       

        const transformedDate = day + ' ' + months[month] + ', ' + year;        
        return transformedDate;
    }
    
    _makeCard(cardsItem) {          
        const cardLink = this._createElement('a', 'link', 'results__card-link');
        cardLink.setAttribute('href', `${cardsItem.url}`);
        cardLink.setAttribute('target', "_blank")

        const card = this._createElement('div', 'results__card');

        const cardImage = this._createElement('img', 'results__card-image');
        
        cardImage.setAttribute('src', `${cardsItem.urlToImage}`);           
        cardImage.onerror = function() {
            cardImage.src = url;
        }
        cardImage.setAttribute('alt', "Картинка для статьи")      

        const cardInfo = this._createElement('div', 'results__card-info');

        const cardDate = this._createElement('p', 'results__card-date');        
        cardDate.textContent = this._transformDate(cardsItem.publishedAt)

        const cardTitle = this._createElement('h3', 'results__card-title');
        cardTitle.textContent = cardsItem.title;

        const cardText = this._createElement('p', 'results__card-text');
        cardText.textContent = cardsItem.description;

        const cardSource = this._createElement('p', 'results__card-source');
        cardSource.textContent = cardsItem.source.name;
        
        cardInfo.appendChild(cardDate);
        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(cardText);
        card.appendChild(cardImage);
        card.appendChild(cardInfo);
        card.appendChild(cardSource);
        cardLink.appendChild(card);

        return cardLink;
    } 

    clearList() {
        Array.from(this._container.childNodes).forEach((item) => {            
            this._container.removeChild(item)
        })
    }
    
    _addCard(cardsItem) { 
        this._container.appendChild(this._makeCard(cardsItem))         
    }
    
    render() {         
        const cardsToRender = 3;
        const moreButton = document.querySelector('.results__more-button');
        
        if (this._renderedCards + cardsToRender >= this._cards.length) {
            for (let i = this._renderedCards; i < this._cards.length; i++) {
                this._addCard(this._cards[i]);            
            }    
            this._renderedCards = this._cards.length;
            moreButton.style.display = 'none';
        } else {
            for (let i = this._renderedCards; i < this._renderedCards + cardsToRender; i++) {
                this._addCard(this._cards[i]);            
            }  
            this._renderedCards = this._renderedCards + cardsToRender;  
        }         
    }
}