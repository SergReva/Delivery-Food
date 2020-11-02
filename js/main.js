'use strict';

const cartButton = document.querySelector("#cart-button"),
	modal = document.querySelector(".modal"),
	close = document.querySelector(".close"),
	buttonAuth = document.querySelector('.button-auth'),
	modalAuth = document.querySelector('.modal-auth'),
	closeAuth = document.querySelector('.close-auth'),
	logInForm = document.querySelector('#logInForm'),
	loginInput = document.querySelector('#login'),
	userName = document.querySelector('.user-name'),
	buttonOut = document.querySelector('.button-out'),
	modalAuthPopup = document.querySelector('.modal-auth-popup'),
	cardsRestaurants = document.querySelector('.cards-restaurants'),
	containerPromo = document.querySelector('.container-promo'),
	restaurants = document.querySelector('.restaurants'),
	menu = document.querySelector('.menu'),
	logo = document.querySelector('.logo'),
	cardsMenu = document.querySelector('.cards-menu');

	


let login = localStorage.getItem('user_a');

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toogleModalAuth() {
	modalAuth.classList.toggle('is-open');
	loginInput.style.background = '';
	modalAuthPopup.style.display = '';
};


function autorized() {
	function logOut() {
		login = null;
		localStorage.removeItem('user_a');
		buttonAuth.style.display = '';
		userName.style.display = '';
		buttonOut.style.display = '';
		modalAuthPopup.style.display = '';
		buttonOut.removeEventListener('click', logOut)

		chekAuth();
	}

	console.log('Авторизованый');

	userName.textContent = login;

	buttonAuth.style.display = 'none'
	userName.style.display = 'inline';
	buttonOut.style.display = 'block';

	buttonOut.addEventListener('click', logOut)
}

function notAutorized() {
	console.log('Не авторизован');

	function logIn(event) {
		event.preventDefault();
		login = loginInput.value;

		localStorage.setItem('user_a', login);

		if (login) {
			toogleModalAuth();	
		} else {
			loginInput.style.background = 'red';
			modalAuthPopup.style.display = 'block';
		}
		

		buttonAuth.removeEventListener('click', toogleModalAuth);
		closeAuth.removeEventListener('click', toogleModalAuth);
		logInForm.removeEventListener('submit', logIn);
		logInForm.reset();

		chekAuth();
	}

	buttonAuth.addEventListener('click', toogleModalAuth);
	closeAuth.addEventListener('click', toogleModalAuth);
	logInForm.addEventListener('submit', logIn);
	loginInput.addEventListener('click', () => {
		loginInput.style.background = '';
		modalAuthPopup.style.display = '';
	});
}

function chekAuth() {
	if (login) {
		autorized();
	} else {
		notAutorized();
	}
}

function createCardRestaurant() {

	const card = ` 
		<a class="card card-restaurant">
			<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">Пицца плюс</h3>
					<span class="card-tag tag">50 мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						4.5
					</div>
					<div class="price">От 900 ₽</div>
					<div class="category">Пицца</div>
				</div>
			</div>
		</a>
	`;
	cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}


function createCardGood() {
	const card = document.createElement('div');
	card.className = 'card';

	card.insertAdjacentHTML('afterbegin', `

	 	<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
	 	<div class="card-text">
	 		<div class="card-heading">
	 			<h3 class="card-title">Пицца плюс</h3>
	 			<span class="card-tag tag">50 мин</span>
	 		</div>
	 		<div class="card-info">
	 			<div class="rating">
	 				4.5
	 			</div>
	 			<div class="price">От 900 ₽</div>
	 			<div class="category">Пицца</div>
	 		</div>
	 	</div>

	`);

	cardsMenu.insertAdjacentElement('beforeend', card);

}


function openGoods(event) {
	const target = event.target;
	const restaurant = target.closest('.card-restaurant');

	if (restaurant) {
		cardsMenu.textContent = '';
		containerPromo.classList.add('hide');
		restaurants.classList.add('hide');
		menu.classList.remove('hide');

		createCardGood();
		createCardGood();
		createCardGood();

	}

}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', () => {
	containerPromo.classList.remove('hide')
	restaurants.classList.remove('hide')
	menu.classList.add('hide')
});

chekAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();
