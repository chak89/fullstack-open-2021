interface result {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

const exerciseCalculator = (dailyExecise: number[], targetDaily: number): result => {

	const periodLength = dailyExecise.length;
	const trainingDays = dailyExecise.filter(hours => hours > 0).length;
	const target = targetDaily;
	let average = dailyExecise.reduce(
		(previousValue, currentValue) =>
			previousValue + currentValue
	);
	average = average / periodLength;

	const success = average >= target ? true : false;

	let rating;
	let ratingDescription;

	if ((average / target) >= 1) {
		rating = 3;
		ratingDescription = 'Excellent, you reached your target';

	} else if ((average / target) >= 0.8) {
		rating = 2;
		ratingDescription = 'Not too bad but could be better';
	} else if ((average / target) >= 0.4) {
		rating = 1;
		ratingDescription = 'You are not even halfway!';
	} else {
		rating = 1;
		ratingDescription = 'No hope for you!';
	}

	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		target: Number(targetDaily),
		average: average,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
	};
};


const dailyExecise: number[] = process.argv.slice(3).map(i => Number(i));
const targetDaily = Number(process.argv[2]);
console.log(exerciseCalculator(dailyExecise, targetDaily));