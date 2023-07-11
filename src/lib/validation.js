import { parse } from 'path';
import User from '../models/user';

export async function registerValidation(firstname, lastname, username, email, password, passwordConfirmed, agreeTOS, optedIn) {
	let messages = { firstname: '', lastname: '', username: '', email: '', password: '', passwordConfirmed: '', general: '' };

	// firstname
	if (typeof firstname !== 'string' || firstname.length < 1) {
		messages.firstname = "First name can't be empty";
	}

	// lastname
	if (typeof lastname !== 'string' || lastname.length < 1) {
		messages.lastname = "Last name can't be empty";
	}

	// username
	if (typeof username !== 'string' || username.length < 1) {
		messages.username = "Username can't be empty";
	} else if (isValidUsername(username) === false) {
		messages.username = 'Username can only consist of letters, numbers, underscores, periods or hyphens';
	} else if ((await usernameTaken(username)) === true) {
		messages.username = 'Username is already taken';
	}

	// email
	if (typeof email !== 'string' || email.length < 1) {
		messages.email = "Email can't be empty";
	} else if (isValidEmail(email) === false) {
		messages.email = 'Please enter a valid email address';
	} else if ((await emailTaken(email)) === true) {
		messages.email = 'There is already an account with this email address';
	}

	// password
	if (typeof password !== 'string' || password.length < 1) {
		messages.password = "Password can't be empty";
	} else if (isValidPassword(password) === false) {
		messages.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number';
	}

	// passwordConfirmed
	if (typeof passwordConfirmed !== 'string' || passwordConfirmed.length < 1) {
		messages.passwordConfirmed = "Please confirm your password";
	} else if (password !== passwordConfirmed) {
		messages.passwordConfirmed = 'Passwords do not match';
	}

	// agreeTOS
	if (typeof agreeTOS !== 'string' || agreeTOS !== 'on') {
		messages.general = 'You must agree to the Terms of Service';
	}

	// optedIn
	if (parseInt(optedIn) !== 1 && parseInt(optedIn) !== 0) {
		messages.general = 'You must either opt in or opt out of email notifications';
	}

	return messages;
}

//#region Helper functions
async function emailTaken(email) {
	return (await User.getByEmail(email)) !== null;
}

async function usernameTaken(username) {
	return (await User.getByUsername(username)) !== null;
}

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
	// at least 8 characters, at least one uppercase letter, one lowercase letter and one number
	// return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

	return true; // TODO: add password requirements
}

function isValidUsername(username) {
	// letters, numbers, underscores, periods or hyphens
	return /^[a-zA-Z0-9_.-]*$/.test(username);
}
//#endregion