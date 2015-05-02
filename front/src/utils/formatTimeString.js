import timeSlots from 'utils/timeSlots';
import formatMonth from 'utils/formatMonth';

const formatTimeString = (date, timeSlot) => {
	let dateNum = date.getDate();
	if (dateNum === (1 || 21 || 31)) {
		dateNum += 'st';
	} else if (dateNum === (2 || 22)) {
		dateNum += 'nd';
	} else {
		dateNum += 'th';
	}
	return formatMonth(date)
		+ ', '
		+ dateNum
		+ ' '
		+ timeSlots[timeSlot];
};

export {formatTimeString as default};
