import "./styles/about.css";
import "./styles/header.css";
import "./styles/author.css";
import "./styles/footer.css";
import "./styles/glide.core.css";
import Glide from '@glidejs/glide';
let glide = new Glide('.glide', {
	perView: 3,
	gap: 16,
	peek: 88,
	rewind: false
}).mount()

window.addEventListener('resize', function() {
	if (window.innerWidth <= 1200 ) {
		glide.update({
			perView: 2
		})
	}
	if (window.innerWidth <=768) {
		glide.update({
			gap: 8,
			focusAt: 0,
			peek: 40
		})
	}
	
	if (window.innerWidth <=600) {
		glide.update({
			perView: 1,
			peek: 0			
		})
	}
})





