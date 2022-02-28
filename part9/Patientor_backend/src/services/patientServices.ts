import { patientEntries } from '../utils';

import {
	NewPatientEntry,
	PatientNonSSN,
	PatientEntry,
} from '../types';

import { generateId, writeToJsonFile } from '../utils';

const getEntries = (): PatientEntry[] => {
	return patientEntries();
};

const getNonSsnEntries = (): PatientNonSSN[] => {
	return patientEntries().map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
	const newPatientEntry = {
		id: generateId(),
		...entry
	};

	try {
		writeToJsonFile(newPatientEntry);
		console.log('Successfully written to json file');
	} catch (error) {
		console.log('Error:', error);
	}

	return newPatientEntry;
};

export default {
	getEntries,
	getNonSsnEntries,
	addPatient
};