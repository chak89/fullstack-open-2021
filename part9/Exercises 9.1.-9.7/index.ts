import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});