

const calculateBmi = (height: number, weight: number): String => {
	const bmi = weight / Math.pow((height/100),2)

	switch (true) {
		case (bmi < 18.5):
			return 'Underweight';
		case (bmi >=18.5 && bmi <= 24.9):
			return 'Normal (healthy weight)';
		case (bmi > 24.9):
			break;
		default:
			return 'Overweight';
	}
}

console.log(calculateBmi(180, 74))