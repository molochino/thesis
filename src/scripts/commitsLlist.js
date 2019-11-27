import * as url from "../images/blank-avatar.jpg"

export class CommitsList {
    constructor(container, cardsArray) {
        this._container = container;
        this._cards = cardsArray;       
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
        const glideSlide = this._createElement('li', 'glide__slide');
        
        const commitsLink = this._createElement('a', 'link', 'commits__single-commit-link');
        
        commitsLink.setAttribute('href', `${cardsItem.html_url}`);
         
        commitsLink.setAttribute('target', '_blank');
        
        const commitsCard = this._createElement('div', 'commits__card');
        
        const commitsDate = this._createElement('p', 'commits__date');        
        commitsDate.textContent = this._transformDate(cardsItem.commit.committer.date);        
        
        const commitsProfile = this._createElement('div', 'commits__profile');
        
        const commitsAvatar = this._createElement('img', 'commits__avatar')          
        try {
            commitsAvatar.setAttribute('src', `${cardsItem.author.avatar_url}`);    
        }
        catch(error) {
            commitsAvatar.src = url;
        }        
        commitsAvatar.setAttribute('alt', 'Аватар автора коммита');
        
        const commitsInfo = this._createElement('div', 'commits__info');
        
        const commitsName = this._createElement('p', 'commits__name');
        commitsName.textContent = cardsItem.commit.committer.name;

        const commitsMail = this._createElement('p', 'commits__mail');
        commitsMail.textContent = cardsItem.commit.committer.email;

        const commitsText = this._createElement('p', 'commits__text');
        commitsText.textContent = cardsItem.commit.message;
        
        commitsInfo.appendChild(commitsName);
        commitsInfo.appendChild(commitsMail);
        commitsProfile.appendChild(commitsAvatar);
        commitsProfile.appendChild(commitsInfo);
        commitsCard.appendChild(commitsDate);
        commitsCard.appendChild(commitsProfile);
        commitsCard.appendChild(commitsText);
        commitsLink.appendChild(commitsCard);
        glideSlide.appendChild(commitsLink);        
        
        return glideSlide;
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
        this._cards.forEach((item) => this._addCard(item))        
    }
}