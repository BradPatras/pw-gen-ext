var shouldUseSymbols = true;
var shouldUseUppercase = true;
var shouldUseNumbers = true;
var length = 14;

const numbers = '1234567890';
const symbols = '~`!@#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

window.onload = (event) => {
	setup();
};

function setup() {
	setupSlider();
	setupCheckboxes();
	generatePassword();

	document.getElementById("regen").onclick = function () {
		generatePassword();
	}
}

function setupSlider() {
	var slider = document.getElementById("lengthRange");
	var output = document.getElementById("lengthValue");
	output.innerHTML = length;
	slider.value = length;

	slider.oninput = function () {
		output.innerHTML = this.value;
		length = this.value;
		generatePassword();
	};
}

function setupCheckboxes() {
	var symbolsCheckbox = document.getElementById("symbolsCheckbox");
	symbolsCheckbox.checked = shouldUseSymbols
	symbolsCheckbox.onclick = function () {
		shouldUseSymbols = this.checked;
		generatePassword();
	};

	var numbersCheckbox = document.getElementById("numbersCheckbox");
	numbersCheckbox.checked = shouldUseNumbers
	numbersCheckbox.onclick = function () {
		shouldUseNumbers = this.checked;
		generatePassword();
	};

	var uppercaseCheckbox = document.getElementById("uppercaseCheckbox");
	uppercaseCheckbox.checked = shouldUseUppercase
	uppercaseCheckbox.onclick = function () {
		shouldUseUppercase = this.checked;
		generatePassword();
	};
}

function generatePassword() {
	var chars = lowercase;

	var required = generateRandomString(1, lowercase);

	if (shouldUseNumbers) {
		chars += numbers;
		required += generateRandomString(1, numbers);
	}

	if (shouldUseUppercase) {
		chars += uppercase;
		required += generateRandomString(1, uppercase);
	}

	if (shouldUseSymbols) {
		chars += symbols;
		required += generateRandomString(1, symbols);
	}
	
	let pwFill = generateRandomString(length - required.length, chars);
	var pw = pwFill + required;
	let shuffledPW = shuffleArray(Array.from(pw)).join('');

	document.getElementById("pwInput").value = shuffledPW;
}

function generateRandomString(length, chars) {
	return Array.from(crypto.getRandomValues(new Uint32Array(length)))
		.map((x) => chars[x % chars.length])
		.join('');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}