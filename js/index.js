// Get btn by ID
const boredBtn = document.getElementById('boredBtn');
boredBtn.addEventListener('click', getBoredAPI);

// Get's API response and converts it to JSON
async function getBoredAPI() {
	const response = await fetch('http://www.boredapi.com/api/activity/');
	const data = await response.json();
	console.log(data.activity);
	console.log(data.type);
}

// function printBored() {}
