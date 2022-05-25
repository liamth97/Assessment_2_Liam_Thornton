//! This file does validation checks on the form
//! It will prevent form submission until the form is filled out
//! There is an option to download the form as a text file

const fname = document.getElementById('inputFirstName'); //First Name Input Box
const lname = document.getElementById('inputLastName'); // Last Name Input Box
const email = document.getElementById('inputEmail'); // Email Input Box
const textArea = document.getElementById('inputTextArea'); // Message Input Box
const id = Date.now(); // Gets date for custom ID
const submitBtn = document.getElementById('submitBtn'); // Submit Form Button
const form = document.getElementById('contactForm'); // Gets whole form

// This script validates the form
submitBtn.addEventListener('click', (ev) => {
	// First name validation
	if (fname.validity.valueMissing) {
		fname.setCustomValidity('Please enter a first name.');
		fname.reportValidity();
	} else {
		fname.setCustomValidity('');
	}

	// Last name validation
	if (lname.validity.valueMissing) {
		lname.setCustomValidity('Please enter a last name.');
		lname.reportValidity();
	} else {
		lname.setCustomValidity('');
	}

	// Email validation
	if (email.validity.valueMissing) {
		email.setCustomValidity('Please enter a valid email.');
		email.reportValidity();
	} else {
		email.setCustomValidity('');
	}

	// Message validation
	if (textArea.validity.valueMissing) {
		textArea.setCustomValidity('Please enter your message here.');
		textArea.reportValidity();
	} else {
		textArea.setCustomValidity('');
	}

	// Alerts the user if validation is done and message sent
	if (form.checkValidity(true)) {
		alert('Thanks for you message! We will get back to you as soon as we can!');
		ev.preventDefault();

		// Stores the form data in an object
		let formData = {
			First: fname.value,
			Last: lname.value,
			Email: email.value,
			Message: textArea.value,
		};

		// Stores the data in local storage
		// You can view this in browser dev tools under 'Application'
		// Then in the left hand menu under 'local storage'
		localStorage.setItem('FormMessage', JSON.stringify(formData));

		// Returns the user to the main page after form submission
		window.location.href = '/index.html';
	}
});

// This allows the user to save the data as a .txt file
document.getElementById('btnSave').addEventListener('click', () => {
	// This variable stores all the data.
	let data =
		'\r First Name: ' +
		fname.value +
		' \r\n ' +
		'Last Name: ' +
		lname.value +
		' \r\n ' +
		'Email: ' +
		email.value +
		' \r\n ' +
		'Message: ' +
		textArea.value +
		' \r\n ' +
		'ID:' +
		id;

	// Convert the text to BLOB.
	const textToBLOB = new Blob([data], { type: 'text/plain' });
	const sFileName = 'formData.txt'; // The file to save the data.

	let newLink = document.createElement('a');
	newLink.download = sFileName;

	if (window.webkitURL != null) {
		newLink.href = window.webkitURL.createObjectURL(textToBLOB);
	} else {
		newLink.href = window.URL.createObjectURL(textToBLOB);
		newLink.style.display = 'none';
		document.body.appendChild(newLink);
	}

	newLink.click();
});

// Last name validation
// submitBtn.addEventListener('click', (e) => {
// 	if (lname.validity.valueMissing) {
// 		lname.setCustomValidity('Please enter a last name.');
// 		lname.reportValidity();
// 	} else {
// 		lname.setCustomValidity('');
// 	}
// });

// Email validation
// submitBtn.addEventListener('click', (e) => {
// 	if (email.validity.valueMissing) {
// 		email.setCustomValidity('Please enter a valid email.');
// 		email.reportValidity();
// 	} else {
// 		email.setCustomValidity('');
// 	}
// });

// Text area validation
// submitBtn.addEventListener('click', (e) => {
// 	if (textArea.validity.valueMissing) {
// 		textArea.setCustomValidity('Please enter your message here.');
// 		textArea.reportValidity();
// 	} else {
// 		textArea.setCustomValidity('');
// 	}
// });

// Text area validation
// submitBtn.addEventListener('click', (e) => {
// 	if (form.checkValidity(true)) {
// 		alert('Thanks for you message! We will get back to you as soon as we can!');
// 		e.preventDefault();
// 		window.location.href = '/index.html';
// 	}
// });
