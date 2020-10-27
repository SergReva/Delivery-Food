const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


//day 1

const buttonAuth = document.querySelector('.button-auth'),
	modalAuth = document.querySelector('.modal-auth'),
	closeAuth = document.querySelector('.close-auth'),
	logInForm = document.querySelector('#logInForm'),
	loginInput = document.querySelector('#login'),
	userName = document.querySelector('.user-name'),
	buttonOut = document.querySelector('.button-out'),
	modalAuthPopup = document.querySelector('.modal-auth-popup');

let login = localStorage.getItem('user_a');

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

chekAuth();