import patientData from '../../data/patients.json';

import { NewPatientEntry, PatientNonSSN, Patient } from '../types';
import { generateId, writeToJsonFile } from '../utils';

const getEntries = (): Patient[] => {
	return patientData;
};

const getNonSsnEntries = (): PatientNonSSN[] => {
	return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (entry: NewPatientEntry): Patient => {
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