let timeSlots = [];

const openTime = 16,
	closeTime = 22,
	lectureLength = 1;

function toTimeString (timeDecimal) {
		const hours = Math.floor(timeDecimal);
		let minutes = Math.round(timeDecimal % 1 * 60);
		minutes = (minutes < 10) ? ('0' + minutes) : minutes.toString();
		return hours + ':' + minutes;
}

for ( let time = openTime; time <= closeTime - lectureLength; time += lectureLength) {
	timeSlots.push(toTimeString(time) + ' - ' + toTimeString(time + lectureLength));
};

export {timeSlots as default};
