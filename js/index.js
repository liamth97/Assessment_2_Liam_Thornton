//! This script pulls data from an API and displays it to the user
//! The API used is the BoredAPI
//! This file grabs the data and displays them in a Bootstrap card layout
//! Bootstrap attributes have been used for the creation and grouping of the cards
//! the animate-on-scroll library has been used for the fade in animation when the cards are created
//! the anime.js library has been used for the hover animations of the cards

// Get btn by ID
const boredBtn = document.getElementById('boredBtn');
const numCards = document.getElementById('inputSuggestions');

const baseURL = 'http://www.boredapi.com/api/activity/';
const categories = document.getElementById('inputCategory');

// Gets new suggestions when the button is clicked
boredBtn.addEventListener('click', (event) => {
	getBoredAPI(categories.value);
});

// Get's API response and converts it to JSON
async function getBoredAPI(type) {
	try {
		// Converts category to lower case, allows user to select 'random' as an option
		type = type.toLowerCase();
		if (type == 'random') {
			type = '';
		}

		// Form validation. Makes sure the category and amount of cards have been chosen
		// Validates whether an amount of cards has been chosen
		if (numCards.value == 'Choose...') {
			numCards.setCustomValidity(
				'Please choose how many suggestions you would like.'
			);
			numCards.reportValidity();
			suggestions.innerHTML = ' '; // Resets page to blank so new suggestions can be filled in
			boredBtn.style.visibility = 'visible'; // Hides button
		} else {
			categories.setCustomValidity('');
		}

		// Validates whether a category has been chosen
		if (categories.value == 'Choose...') {
			categories.setCustomValidity('Please choose a category.');
			categories.reportValidity();
			suggestions.innerHTML = ' '; // Resets page to blank so new suggestions can be filled in
			boredBtn.style.visibility = 'visible'; // Hides button
		} else {
			categories.setCustomValidity('');
		}

		suggestions.innerHTML = ' '; // Resets page to blank so new suggestions can be filled in

		// For loop that gets new request to generate new items
		for (let index = 0; index < numCards.value; index++) {
			const response = await fetch(`${baseURL}?type=${type}`);
			const data = await response.json();
			const cardBody = createSuggestionCards(index); // Stores createSuggestionCards(index) as a variable to pass it's data into other functions
			cardBadge(data, cardBody); // Creates the colored badges
			cardTitle(data, cardBody); // Creates the title description
			cardParticipants(data, cardBody); // Creates icons of people to represent the amount of participants
			hoverCardLoop(index);
		}
	} catch (e) {
		console.log(e);
		console.log(
			"Most likely error: category wasn't chosen. API fetch request probably failed as a result."
		);
	}
}

// Function to create a suggestion card
// This loops as it is tied to the for loop in the async GetBoredAPI() function
function createSuggestionCards(index) {
	// Get suggestions ID
	const suggestions = document.getElementById('suggestions');

	// Create cards with new suggestions
	//! Bootstrap classes are used

	// Creates div with "col" class
	const col = document.createElement('div');
	col.classList.add('col-sm-12', 'col-lg-6');
	col.setAttribute('data-aos', 'fade-right');
	suggestions.appendChild(col);

	// Creates div with "card" class
	const card = document.createElement('div');
	card.classList.add('card', 'border-dark', 'w-100', 'h-100');
	card.setAttribute('id', String(index));
	// card.setAttribute('id', 'suggestionCard');
	col.appendChild(card);
	// console.log(card);

	// Create card body
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body', 'p-5');
	card.appendChild(cardBody);

	return cardBody;
}

// Adds a badge to the card
// This loops as it is tied to the for loop in the async GetBoredAPI() function
function cardBadge(data, cardBody) {
	// Creates badges for each activity type
	const cardType = document.createElement('p');
	const cardTypeNode = document.createTextNode(
		data.type[0].toUpperCase() + data.type.substring(1)
	);
	if (data.type == 'recreational') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-warning', 'text-dark');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	} else if (data.type == 'relaxation') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-primary');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	} else if (data.type == 'education') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-success');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	} else if (data.type == 'busywork') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-light', 'text-dark');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	} else if (data.type == 'social') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-info', 'text-dark');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	} else if (data.type == 'charity') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-dark');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	} else if (data.type == 'cooking') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-danger');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	} else if (data.type == 'music') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-secondary');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	} else {
		cardType.classList.add('badge', 'rounded-pill', 'bg-light', 'text-dark');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	}
}

// Creates a card title
// This loops as it is tied to the for loop in the async GetBoredAPI() function

function cardTitle(data, cardBody) {
	// Create card title
	const cardTitle = document.createElement('h5');
	const cardTitleNode = document.createTextNode(data.activity);
	cardTitle.classList.add('card-title', 'h3');
	cardTitle.appendChild(cardTitleNode);
	cardBody.appendChild(cardTitle);
}

function cardParticipants(data, cardBody) {
	// Creates a div inside the cardBody to put the participant icons in
	const personContainer = document.createElement('div');
	personContainer.classList.add(
		'd-flex',
		'justify-content-center',
		'text-center'
	);
	cardBody.appendChild(personContainer);

	// Creates participant icons
	// Primary icon for amount
	const personSolidOne = document.createElement('i');
	personSolidOne.classList.add(
		'text-primary',
		'fa-solid',
		'fa-person',
		'fa-2x'
	);
	let personSolidTwo = personSolidOne.cloneNode(true);
	let personSolidThree = personSolidOne.cloneNode(true);
	let personSolidFour = personSolidOne.cloneNode(true);
	let personSolidFive = personSolidOne.cloneNode(true);

	// Secondary icon for placeholder max amount
	const personBlankOne = document.createElement('i');
	personBlankOne.classList.add(
		'text-secondary',
		'fa-solid',
		'fa-person',
		'fa-2x'
	);
	let personBlankTwo = personBlankOne.cloneNode(true);
	let personBlankThree = personBlankOne.cloneNode(true);
	let personBlankFour = personBlankOne.cloneNode(true);

	// Adds a plus if it's more than 5 people
	// For primary
	const peoplePlusSolid = document.createElement('i');
	peoplePlusSolid.classList.add('text-primary', 'fa-solid', 'fa-plus');
	// For secondary
	const peoplePlusBlank = document.createElement('i');
	peoplePlusBlank.classList.add('text-secondary', 'fa-solid', 'fa-plus');

	// if statement that appends the appropriate icons based on the amount of participants
	if (data.participants == 1) {
		personContainer.appendChild(personSolidOne);
		personContainer.appendChild(personBlankOne);
		personContainer.appendChild(personBlankTwo);
		personContainer.appendChild(personBlankThree);
		personContainer.appendChild(personBlankFour);
		personContainer.appendChild(peoplePlusBlank);
	} else if (data.participants == 2) {
		personContainer.appendChild(personSolidOne);
		personContainer.appendChild(personSolidTwo);
		personContainer.appendChild(personBlankOne);
		personContainer.appendChild(personBlankTwo);
		personContainer.appendChild(personBlankThree);
		personContainer.appendChild(peoplePlusBlank);
	} else if (data.participants == 3) {
		personContainer.appendChild(personSolidOne);
		personContainer.appendChild(personSolidTwo);
		personContainer.appendChild(personSolidThree);
		personContainer.appendChild(personBlankOne);
		personContainer.appendChild(personBlankTwo);
		personContainer.appendChild(peoplePlusBlank);
	} else if (data.participants == 4) {
		personContainer.appendChild(personSolidOne);
		personContainer.appendChild(personSolidTwo);
		personContainer.appendChild(personSolidThree);
		personContainer.appendChild(personSolidFour);
		personContainer.appendChild(personBlankOne);
		personContainer.appendChild(peoplePlusBlank);
	} else {
		personContainer.appendChild(personSolidOne);
		personContainer.appendChild(personSolidTwo);
		personContainer.appendChild(personSolidThree);
		personContainer.appendChild(personSolidFour);
		personContainer.appendChild(personSolidFive);
		personContainer.appendChild(peoplePlusSolid);
	}
	console.log(data);
}

// creates an array for all the cards with unique IDs to apply a hover animation to each one
// This loops as it is tied to the for loop in the async GetBoredAPI() function
function hoverCardLoop(index) {
	const hoverCard = [];
	hoverCard[index] = document.getElementById(String(index));
	hoverCard[index].addEventListener('mouseenter', function (e) {
		enterCard(e.target);
	});
	hoverCard[index].addEventListener('mouseleave', function (e) {
		leaveCard(e.target);
	});
}

// anime.js for hover animations
function animateCard(el, scale, duration, elasticity) {
	anime.remove(el);
	anime({
		targets: el,
		scale: scale,
		duration: duration,
		elasticity: elasticity,
	});
}

function enterCard(el) {
	animateCard(el, 1.1, 800, 400);
}

function leaveCard(el) {
	animateCard(el, 1.0, 600, 300);
}

// Return to top button
// Get the button
let mybutton = document.getElementById('btn-back-to-top');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (
		document.body.scrollTop > 100 ||
		document.documentElement.scrollTop > 100
	) {
		mybutton.style.display = 'block';
	} else {
		mybutton.style.display = 'none';
	}
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener('click', backToTop);

function backToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
