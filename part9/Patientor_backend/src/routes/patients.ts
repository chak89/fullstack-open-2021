/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientServices from '../services/patientServices';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	console.log('Fetching all patients!');
	res.send(patientServices.getNonSsnEntries());
});

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		const addedEntry = patientServices.addPatient(newPatientEntry);
		console.log('POSTing patients');
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;