import { capitalized } from './data/capitalized.js';

const number = document.querySelector('#number');
const input = document.querySelector('#input');
const output = document.querySelector('#output');

let limitChar = Number(number.value);

number.addEventListener('input', (e) => {
	limitChar = Number(e.target.value);
	console.log(limitChar);
});

input.addEventListener('input', (e) => {
	// Agarra el value y  To lowercase
	let inputValue = e.target.value.toLowerCase();

	// - Mayúsculas en nombres propios
	inputValue = capitalizeNames(inputValue);

	// - Mayúsculas despues de puntos, signos.
	inputValue = capitalizeFirstSentenceWord(inputValue);

	// Separamos string en array de letras
	const splitted = inputValue.split('');

	createBreakLines(splitted);

	output.value = splitted.join('');
});

function capitalizeNames(value) {
	const capitalizedObject = capitalized.reduce(
		(acc, cv) => ({
			...acc,
			[cv.toLowerCase()]: cv,
		}),
		{}
	);

	capitalized.forEach((element) => {
		element = element.toLowerCase();

		const rgx = new RegExp(element, 'g');

		value = value.replace(rgx, capitalizedObject[element]);
	});

	return value;
}

function capitalizeFirstSentenceWord(value) {
	const rgx = new RegExp(/(?<=[\.\¿\?\!]\s*)[a-z]/, 'g');
	value = value.replace(rgx, (v) => v.toUpperCase());
	return value;
}

function createBreakLines(splitted) {
	let letterCounter = 0;
	let breakCounter = 0;

	const afterBreakLine = ['.', ',', '?', '!'];

	splitted.forEach((letter, index) => {
		// // - Saltos de linea por coma, punto, signos de pregunta, etc...
		if (afterBreakLine.includes(letter) && letterCounter > limitChar / 2.5) {
			letter = splitted[index + 1];
			index++;
			letterCounter = limitChar;
		}

		if (letterCounter >= limitChar && letter === ' ') {
			splitted[index] = breakCounter % 2 ? '\n\n' : '\n';

			breakCounter++;
			// -1 para que despues con el ++ vuelva a 0
			letterCounter = -1;
		}

		letterCounter++;
	});
}
