export class Validation {
    constructor() {
        this._errorMessages = {
            'tooShort': 'Нужно ввести ключевое слово!'
        }       
        this._errorMessage = document.querySelector('.search__error-message');         
    }

    _showErrorMessage() {
        this._errorMessage.style.display = 'block';  
        this._errorMessage.style.animation = 'none';
        this._errorMessage.offsetHeight;
        this._errorMessage.style.animation = null;   
    }

    validateSearchForm(input) {
        switch (input) {
            case '': 
                this._errorMessage.textContent = this._errorMessages['tooShort']
                this._showErrorMessage();
                return false;   
            default: 
                return true; 
        }
    }    
}