//import { patientEntries } from '../utils';
import patients from '../../data/patients';

import {
	NewPatientEntry,
	PatientNonSSN,
	PatientEntry,
	Patient,
	EntryWithoutId
} from '../types';

import { generateId, writeToJsonFile } from '../utils';

const getEntries = (): PatientEntry[] => {
	return patients;
};

const getNonSsnEntries = (): PatientNonSSN[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const getPatientEntryById = (id: string): Patient | undefined => {
	const foundEntry = patients.find(entry => entry.id == id);
	console.log('foundEntry');
	console.log(foundEntry);

	if (!foundEntry) {
		return undefined;
	}

	return foundEntry;
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

const addPatientEntry = (patientEntry: Patient, entryBody: EntryWithoutId): Patient => {

	const newEntryBody = {
		id: generateId(),
		...entryBody
	};

	patientEntry.entries.push(newEntryBody);

	return patientEntry;
};

export default {
	getEntries,
	getNonSsnEntries,
	addPatient,
	getPatientEntryById,
	addPatientEntry
};