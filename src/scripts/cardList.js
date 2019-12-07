import * as url from "../images/news.jpg"

export class CardList {
    constructor(container, cardsArray, callback) {
        this._container = container;
        this._cards = cardsArray; 
        this.createCard = callback;  
        this._renderedCards = 0;     
        this._moreButton = document.querySelector('.results__more-button');   
    }    

    clearList() {
        Array.from(this._container.childNodes).forEach((item) => {            
            this._container.removeChild(item)
        })
    }
    
    _addCard(cardsItem) { 
        const cardElement = this.createCard(cardsItem);         
        this._container.appendChild(cardElement)         
    }
    
    render() {         
        const cardsToRender = 3;        
        
        if (this._renderedCards + cardsToRender >= this._cards.length) {
            for (let i = this._renderedCards; i < this._cards.length; i++) {
                this._addCard(this._cards[i]);            
            }    
            this._renderedCards = this._cards.length;
            this._moreButton.style.display = 'none';
        } else {
            for (let i = this._renderedCards; i < this._renderedCards + cardsToRender; i++) {
                this._addCard(this._cards[i]);            
            }  
            this._renderedCards = this._renderedCards + cardsToRender;  
        }          
    }
}