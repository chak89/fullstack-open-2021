/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientServices from '../services/patientServices';
import { toNewPatientEntry, validatePatientEntry } from '../utils';

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

router.get('/:id', (req, res) => {
	console.log('id: ' + req.params.id);
	const patientEntry = patientServices.getPatientEntryById(req.params.id);

	if (!patientEntry) {
		return res.status(404).send('Error: ID not found');
	}

	console.log('patientEntry:', patientEntry);
	return res.send(patientEntry);
});


router.post('/:id/entries', (req, res) => {
	try {
		console.log('POSTing /:id/entries');
		const entryBody = req.body;
		const patientEntry = patientServices.getPatientEntryById(req.params.id);

		if (!entryBody) {
			return res.status(404).send('Error: something wrong with the entry');
		}

		if (!patientEntry) {
			return res.status(404).send('Error: ID not found');
		}


		const validatedBody = validatePatientEntry(entryBody);

		if (validatedBody === undefined) {
			return res.status(404).send('Error: entry didnt pass validation');
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const result = patientServices.addPatientEntry(patientEntry, validatedBody);

		return res.send(result);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).send(errorMessage);
	}
});



export default router;