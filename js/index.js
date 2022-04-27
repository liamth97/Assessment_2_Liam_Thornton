// Get btn by ID
const boredBtn = document.getElementById('boredBtn');

// Runs getBoredAPI function on load
window.addEventListener('load', getBoredAPI);

// Gets more suggestions when the button is clicked
boredBtn.addEventListener('click', getBoredAPI);

// Get's API response and converts it to JSON
async function getBoredAPI() {
	// Hides button
	boredBtn.style.visibility = 'hidden';

	// Resets page to blank so new suggestions can be filled in
	suggestions.innerHTML = '';

	// For loop that gets new request to generate new items
	for (let index = 0; index < 20; index++) {
		const response = await fetch('http://www.boredapi.com/api/activity/');
		const data = await response.json();
		console.log(data);
		createSuggestionCards(data);

		// shows button again after 5 seconds
		setTimeout(() => {
			boredBtn.style.visibility = 'visible';
		}, 5000);
	}
}

// Function to create a suggestion card
function createSuggestionCards(data) {
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
	card.classList.add('card', 'border-dark', 'w-100', 'h-100', 'shadow');
	card.setAttribute('id', 'suggestionCard');
	col.appendChild(card);

	// Create card body
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body', 'p-5');
	card.appendChild(cardBody);

	cardBadge(cardBody, data);
}

// Adds a badge to the card
function cardBadge(cardBody, data) {
	// Creates badges for each activity type
	let cardType = document.createElement('p');
	let cardTypeNode = document.createTextNode(
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
	} else if (data.type == 'diy') {
		cardType.classList.add('badge', 'rounded-pill', 'bg-light', 'text-dark');
		cardType.appendChild(cardTypeNode);
		cardBody.appendChild(cardType);
	}
	cardTitle(cardBody, data);
}

// Creates a card title
function cardTitle(cardBody, data) {
	// Create card title
	const cardTitle = document.createElement('h5');
	const cardTitleNode = document.createTextNode(data.activity);
	cardTitle.classList.add('card-title', 'h3');
	cardTitle.appendChild(cardTitleNode);
	cardBody.appendChild(cardTitle);
}
