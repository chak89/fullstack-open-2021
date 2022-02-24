import patientData from '../../data/patients.json';

import { PatientNonSSN, Patient } from '../types';

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

export default {
	getEntries,
	getNonSsnEntries
};