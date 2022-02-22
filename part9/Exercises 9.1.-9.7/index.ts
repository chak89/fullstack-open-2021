import express from 'express';
import calculateBmi from './bmiCalculator';
import bodyParser from 'body-parser';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

	if (!req.query) {
		return res.status(400).send({ error: 'malformatted parameters' });
	}

	if (!req.query.height || !req.query.weight) {
		return res.status(400).send({ error: 'malformatted parameters' });
	}

	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	const result = {
		...req.query,
		bmi: calculateBmi(height, weight)
	};

	return res.send(result);
});


app.post('/exercises', (req, res) => {

	if (!req.body) {
		return res.status(400).send({ error: 'parameters missing' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if (!req.body.daily_exercises || !req.body.target) {
		return res.status(400).send({ error: 'parameters missing' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (isNaN(Number(target))) {
		return res.status(400).send({ error: 'malformatted parameters"' });
	}

	if (Array.isArray(daily_exercises)) {
		if (daily_exercises.some(isNaN)) {
			return res.status(400).send({ error: 'malformatted parameters"' });
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = exerciseCalculator(daily_exercises, target);
	return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});