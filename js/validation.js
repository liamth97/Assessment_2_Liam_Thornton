const fname = document.getElementById('inputFirstName');
const lname = document.getElementById('inputLastName');
const email = document.getElementById('inputEmail');
const textArea = document.getElementById('inputTextArea');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('contactForm');

// First name validation
submitBtn.addEventListener('click', (e) => {
	if (fname.validity.valueMissing) {
		fname.setCustomValidity('Please enter a first name.');
		fname.reportValidity();
	} else {
		fname.setCustomValidity('');
	}
});

// Last name validation
submitBtn.addEventListener('click', (e) => {
	if (lname.validity.valueMissing) {
		lname.setCustomValidity('Please enter a last name.');
		lname.reportValidity();
	} else {
		lname.setCustomValidity('');
	}
});

// Email validation
submitBtn.addEventListener('click', (e) => {
	if (email.validity.valueMissing) {
		email.setCustomValidity('Please enter a valid email.');
		email.reportValidity();
	} else {
		email.setCustomValidity('');
	}
});

// Text area validation
submitBtn.addEventListener('click', (e) => {
	if (textArea.validity.valueMissing) {
		textArea.setCustomValidity('Please enter your message here.');
		textArea.reportValidity();
	} else {
		textArea.setCustomValidity('');
	}
});

// Text area validation
submitBtn.addEventListener('click', (e) => {
	if (form.checkValidity(true)) {
		alert('Thanks for you message! We will get back to you as soon as we can!');
		e.preventDefault();
		window.location.href = '/index.html';
	}
});