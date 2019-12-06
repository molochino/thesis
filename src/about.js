import "./pages/about.css";
import {Api} from  "./scripts/api.js";
import {CommitsList} from "./scripts/commitsLlist.js";
import Glide from '@glidejs/glide';

const commitsErrorMessage = document.querySelector('.commits__error-message');
commitsErrorMessage.style.display = 'none';
const glideArrows = document.querySelector('.glide__arrows');
const glideBullets = document.querySelector('.glide__bullets');
const glide = document.querySelector('.glide');
const glideSlides = document.querySelector('.glide__slides');

let api = new Api({
    baseUrl: 'https://api.github.com/repos/molochino/thesis/commits'     
}); 

api.getCommits()
    .then((result) => {        
        let commitsList = new CommitsList(glideSlides, result);
        commitsList.clearList();
        commitsList.render();    

        let glide = new Glide('.glide', {    
            type: 'slider',
            startAt: 0, 
            perView: 3,
            gap: 16,
            peek: 88,
            rewind: false,
            breakpoints: {
                1200: {
                    perView: 2
                },
                768: {
                    gap: 8,
                    focusAt: 0,
                    peek: 40,
                    perView: 2
                },
                600: {
                    perView: 1,
                    peek: 0		
                }	
            }            
        }).mount()
    })
    .catch((error) => {
        glide.style.display = 'none';
        glideArrows.style.display = 'none';
        glideBullets.style.display = 'none';    
        commitsErrorMessage.style.display = 'block';            
    })