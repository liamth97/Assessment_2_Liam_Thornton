// Get btn by ID
const boredBtn = document.getElementById('boredBtn');

// Runs getBoredAPI function on load
window.addEventListener('load', getBoredAPI);

// Gets more suggestions when the button is clicked
boredBtn.addEventListener('click', getBoredAPI);

//* Get's API response and converts it to JSON
async function getBoredAPI() {
	// Sets button to generate new cards to hidden
	boredBtn.style.visibility = 'hidden';

	// Resets page to blank so new suggestions can be filled in
	suggestions.innerHTML = '';

	// For loop that gets new request to generate new items
	for (let index = 0; index < 20; index++) {
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

	// Create cards with new suggestions
	//! Bootstrap classes are used

	// Creates div with "col" class
	const col = document.createElement('div');
	col.classList.add('col-sm-12', 'col-lg-6');
	col.setAttribute('data-aos', 'fade-right');
	col.setAttribute('data-aos', 'fade-right');
	suggestions.appendChild(col);

	// Creates div with "card" class
	const card = document.createElement('div');
	card.classList.add(
		'card',
		'border-dark',
		'bg-dark',
		'shadow',
		'text-light',
		'w-100',
		'h-100'
	);
	card.setAttribute('id', 'suggestionCard');
	col.appendChild(card);

	// Create card body
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body', 'p-5');
	card.appendChild(cardBody);

	// Create card title
	const cardTitle = document.createElement('h5');
	const cardTitleNode = document.createTextNode(data.activity);
	cardTitle.classList.add('card-title', 'h3');
	cardTitle.appendChild(cardTitleNode);
	cardBody.appendChild(cardTitle);

	// Create card text
	// type
	let cardText = document.createElement('p');
	let cardTextNode = document.createTextNode(
		data.type[0].toUpperCase() + data.type.substring(1)
	);
	cardText.classList.add('card-text', 'lead');
	cardText.appendChild(cardTextNode);
	cardBody.appendChild(cardText);
	// participants
	cardText = document.createElement('p');
	cardTextNode = document.createTextNode(
		'This activity requires ' + data.participants + ' participants'
	);
	cardText.classList.add('card-text');
	cardText.appendChild(cardTextNode);
	cardBody.appendChild(cardText);
	// price
	cardText = document.createElement('p');
	cardTextNode = document.createTextNode('Price: ' + data.price);
	cardText.classList.add('card-text');
	cardText.appendChild(cardTextNode);
	cardBody.appendChild(cardText);

	setTimeout(() => {
		boredBtn.style.visibility = 'visible';
	}, 2000);
}
