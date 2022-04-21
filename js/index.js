// Get btn by ID
const boredBtn = document.getElementById('boredBtn');
boredBtn.addEventListener('click', getBoredAPI);

// Get's API response and converts it to JSON
async function getBoredAPI() {
	const response = await fetch('http://www.boredapi.com/api/activity/');
	const data = await response.json();
	console.log(data);
	createSuggestionCard(data);
}

// Function to create a suggestion card
function createSuggestionCard(data) {
	// Get suggestions ID
	const suggestions = document.getElementById('suggestions');

	// Clear Cards
	suggestions.innerHTML = '';

	// Loop to create three cards

	for (let index = 0; index < 3; index++) {
		// Create cards with new suggestions
		//! Bootstrap classes are used

		// Creates div with "col" class
		const col = document.createElement('div');
		col.classList.add('col-lg-4');
		suggestions.appendChild(col);

		// Creates div with "card" class
		const card = document.createElement('div');
		card.classList.add('card');
		col.appendChild(card);

		// Create card body
		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');
		card.appendChild(cardBody);

		// Create card title
		const cardTitle = document.createElement('h5');
		const cardTitleText = document.createTextNode('Title');
		cardTitle.classList.add('card-title');
		cardTitle.appendChild(cardTitleText);
		cardBody.appendChild(cardTitle);

		// Create card text
		const cardText = document.createElement('p');
		const cardTextText = document.createTextNode('Text');
		cardText.classList.add('card-text');
		cardText.appendChild(cardTextText);
		cardBody.appendChild(cardText);
	}
}
