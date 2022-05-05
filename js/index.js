// Get btn by ID
const boredBtn = document.getElementById('boredBtn');
const numCards = document.getElementById('inputSuggestions');

const baseURL = 'http://www.boredapi.com/api/activity/';
const categories = document.getElementById('inputCategory');

// getBoredAPI();

// Gets more suggestions when the button is clicked
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

		if (numCards.value == 'Choose...') {
			alert(
				'There was an error! Make sure you select a category and the number of suggestions you want!'
			);
			suggestions.innerHTML = ' '; // Resets page to blank so new suggestions can be filled in
			boredBtn.style.visibility = 'visible'; // Hides button
		}

		suggestions.innerHTML = ' '; // Resets page to blank so new suggestions can be filled in

		// For loop that gets new request to generate new items
		for (let index = 0; index < numCards.value; index++) {
			const response = await fetch(`${baseURL}?type=${type}`);
			const data = await response.json();
			const cardBody = createSuggestionCards(index); // Stores createSuggestionCards(index) as a variable to pass it's data into other functions
			cardBadge(data, cardBody); // Creates the colored badges
			cardTitle(data, cardBody); //
			hoverCardLoop(index);
		}
	} catch (e) {
		alert(
			'There was an error! Make sure you select  a category and the number of suggestions you want!'
		);
		suggestions.innerHTML = ' '; // Resets page to blank so new suggestions can be filled in
		boredBtn.style.visibility = 'visible'; // Hides button
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

//Get the button
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
