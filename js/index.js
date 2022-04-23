//* Get btn by ID
const boredBtn = document.getElementById('boredBtn');

//* Runs getBoredAPI function on load
window.addEventListener('load', getBoredAPI);

//* Runs getBoredAPI function on scroll
//* This continually generates content for the user
window.addEventListener('scroll', getBoredAPI);

//* Get's API response and converts it to JSON
async function getBoredAPI() {
	//* For loop that gets new request to generate new items
	for (let index = 0; index < 24; index++) {
		const response = await fetch('http://www.boredapi.com/api/activity/');
		const data = await response.json();
		console.log(data);
		createSuggestionCard(data);
	}
}

//* Function to create a suggestion card
function createSuggestionCard(data) {
	// Get suggestions ID
	const suggestions = document.getElementById('suggestions');

	//* Create cards with new suggestions
	//! Bootstrap classes are used

	//* Creates div with "col" class
	const col = document.createElement('div');
	col.classList.add('col-sm-12', 'col-xl-3', 'col-lg-4', 'col-md-6');
	col.setAttribute('data-aos', 'fade-right');
	col.setAttribute('data-aos', 'fade-right');
	suggestions.appendChild(col);

	//* Creates div with "card" class
	const card = document.createElement('div');
	card.classList.add('card', 'border-dark', 'bg-dark', 'shadow', 'text-light');
	card.setAttribute('id', 'suggestionCard');
	col.appendChild(card);

	//* Create card body
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	card.appendChild(cardBody);

	//* Create card title
	const cardTitle = document.createElement('h5');
	const cardTitleText = document.createTextNode(data.activity);
	cardTitle.classList.add('card-title');
	cardTitle.appendChild(cardTitleText);
	cardBody.appendChild(cardTitle);

	//* Create card text
	// type
	let cardText = document.createElement('p');
	let cardTextText = document.createTextNode('This activity is ' + data.type);
	cardText.classList.add('card-text');
	cardText.appendChild(cardTextText);
	cardBody.appendChild(cardText);
	// participants
	cardText = document.createElement('p');
	cardTextText = document.createTextNode(
		'This activity requires ' + data.participants + ' participants'
	);
	cardText.classList.add('card-text');
	cardText.appendChild(cardTextText);
	cardBody.appendChild(cardText);
	// price
	cardText = document.createElement('p');
	cardTextText = document.createTextNode('Price: ' + data.price);
	cardText.classList.add('card-text');
	cardText.appendChild(cardTextText);
	cardBody.appendChild(cardText);
}
