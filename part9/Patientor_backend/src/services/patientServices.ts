import { patientEntries } from '../utils';

import {
	NewPatientEntry,
	PatientNonSSN,
	PatientEntry,
	Patient
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

const getPatientEntryById = (id: string): Patient | undefined => {
	const foundEntry = patientEntries().find(entry => entry.id === id);

	if (!foundEntry) {
		return undefined;
	}

	const formattedFoundEntry = {
		...foundEntry,
		entries: []
	};

	return formattedFoundEntry;
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
	addPatient,
	getPatientEntryById
};