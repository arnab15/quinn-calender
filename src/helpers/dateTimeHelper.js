import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getNumberOfDaysInMonth(year, month) {
	return dayjs(`${year}-${month}-01`).daysInMonth();
}

export function createDaysForCurrentMonth(year, month) {
	return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
		return {
			dateString: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
			dayOfMonth: index + 1,
			isCurrentMonth: true,
		};
	});
}

export function createDaysForPreviousMonth(year, month, currentMonthDays) {
	const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString);
	const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

	const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

	const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].dateString)
		.subtract(visibleNumberOfDaysFromPreviousMonth, "day")
		.date();

	return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
		return {
			dateString: dayjs(
				`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
			).format("YYYY-MM-DD"),
			dayOfMonth: previousMonthLastMondayDayOfMonth + index,
			isCurrentMonth: false,
			isPreviousMonth: true,
		};
	});
}

export function createDaysForNextMonth(year, month, currentMonthDays) {
	const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${currentMonthDays.length}`);
	const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
	const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

	return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
		return {
			dateString: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
			dayOfMonth: index + 1,
			isCurrentMonth: false,
			isNextMonth: true,
		};
	});
}

export const getOneMonthGridDays = (year, month) => {
	let currentMonthDays = createDaysForCurrentMonth(year, month);
	let previousMonthDays = createDaysForPreviousMonth(year, month, currentMonthDays);
	let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
	return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
};
// sunday === 0, saturday === 6
export function getWeekday(dateString) {
	return dayjs(dateString).weekday();
}

export function isWeekendDay(dateString) {
	return [6, 0].includes(getWeekday(dateString));
}
