import * as url from "../images/news.jpg"

export class Card {
    constructor(cardsItem) {
        this._cardsItem = cardsItem;        
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

    makeCard() {          
        const cardLink = this._createElement('a', 'link', 'results__card-link');
        cardLink.setAttribute('href', `${this._cardsItem.url}`);
        cardLink.setAttribute('target', "_blank")

        const card = this._createElement('div', 'results__card');

        const cardImage = this._createElement('img', 'results__card-image');
        
        cardImage.setAttribute('src', `${this._cardsItem.urlToImage}`);           
        cardImage.onerror = function() {
            cardImage.src = url;
        }
        cardImage.setAttribute('alt', "Картинка для статьи")      

        const cardInfo = this._createElement('div', 'results__card-info');

        const cardDate = this._createElement('p', 'results__card-date');        
        cardDate.textContent = this._transformDate(this._cardsItem.publishedAt)

        const cardTitle = this._createElement('h3', 'results__card-title');
        cardTitle.textContent = this._cardsItem.title;

        const cardText = this._createElement('p', 'results__card-text');
        cardText.textContent = this._cardsItem.description;

        const cardSource = this._createElement('p', 'results__card-source');
        cardSource.textContent = this._cardsItem.source.name;
        
        cardInfo.appendChild(cardDate);
        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(cardText);
        card.appendChild(cardImage);
        card.appendChild(cardInfo);
        card.appendChild(cardSource);
        cardLink.appendChild(card);

        // console.log(cardLink)
        return cardLink;
    } 
}