export function minutsConverter() {
	let minuts = new Date().getMinutes();
	if (minuts < 10) {
		return '0'.concat(minuts);
	} else return minuts;
}
