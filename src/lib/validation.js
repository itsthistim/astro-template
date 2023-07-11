import User from '../models/user';

export function validateFirstname(firstname) {
	if (typeof firstname !== 'string' || firstname.length < 1) {
		return new Error("First name can't be empty");
	}
	return true;
}

export function validateLastname(lastname) {
	if (typeof lastname !== 'string' || lastname.length < 1) {
		return new Error("Last name can't be empty");
	}
	return true;
}

export async function validateUsername(username) {
	if (typeof username !== 'string' || username.length < 1) {
		return new Error("Username can't be empty");
	} else if (isValidUsername(username) === false) {
		return new Error('Username can only consist of letters, numbers, underscores, periods or hyphens');
	} else if ((await usernameTaken(username)) === true) {
		return new Error('Username is already taken');
	}
	return true;
}

export async function validateEmail(email) {
	if (typeof email !== 'string' || email.length < 1) {
		console.log('email empty');
		return new Error("Email can't be empty");
	} else if (isValidEmail(email) === false) {
		console.log('email invalid');
		return new Error('Please enter a valid email address');
	} else if ((await emailTaken(email)) === true) {
		console.log('email taken');
		return new Error('There is already an account with this email address');
	}

	console.log('email valid and not taken');
	return true;
}

export function validatePassword(password) {
	if (typeof password !== 'string' || password.length < 1) {
		return new Error('Please enter a password');
	} else if (isValidPassword(password) === false) {
		return new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number');
	}
	return true;
}

export function validatePasswordConfirmed(password, passwordConfirmed) {
	if (typeof passwordConfirmed !== 'string' || passwordConfirmed.length < 1) {
		return new Error('Please confirm your password');
	} else if (password !== passwordConfirmed) {
		return new Error('Passwords do not match');
	}
	return true;
}

export function validateOptedIn(optedIn) {
	if (typeof optedIn !== 'string' || optedIn.length < 1) {
		return new Error('Please either opt in or out of our newsletter');
	}
	return true;
}


// helper functions
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

	return true; // TODO: add password validation
}

function isValidUsername(username) {
	// letters, numbers, underscores, periods or hyphens
	return /^[a-zA-Z0-9_.-]*$/.test(username);
}