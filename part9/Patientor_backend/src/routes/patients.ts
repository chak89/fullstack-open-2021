/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientServices from '../services/patientServices';

const router = express.Router();

router.get('/', (_req, res) => {
	console.log('Fetching all patients!');
	res.send(patientServices.getNonSsnEntries());
});

router.post('/', (req, res) => {
	const { name, ssn, dateOfBirth, occupation, gender } = req.body;

	const newPatientEntry = patientServices.addPatient({
		name,
		ssn,
		dateOfBirth,
		occupation,
		gender
	});

	console.log('POSTing patients');
	res.json(newPatientEntry);
});

export default router;