

const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / Math.pow((height/100),2);

	switch (true) {
		case (bmi < 18.5):
			return 'Underweight';
		case (bmi >=18.5 && bmi <= 24.9):
			return 'Normal (healthy weight)';
		case (bmi > 24.9):
			return 'Underweight';
			break;
		default:
			return 'Out of range';
	}
};

/* 
const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(calculateBmi(height, weight)); */

export default calculateBmi;