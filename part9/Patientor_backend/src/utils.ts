/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v1 as uuid } from 'uuid';

import {
	PatientEntry,
	NewPatientEntry,
	Gender,
	//Diagnosis,
	EntryWithoutId
} from './types';

import patientData from '../data/patientsOLD.json';
import fs = require('fs');

//Generate ID
export const generateId = (): string => {
	const id = uuid();
	return id;
};

//Write to patients.json file
export const writeToJsonFile = (patientObj: PatientEntry) => {
	let patientsJson = fs.readFileSync("./data/patients.json", "utf-8");
	const patients = JSON.parse(patientsJson);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	patients.push(patientObj);
	patientsJson = JSON.stringify(patients);
	fs.writeFileSync("./data/patients.json", patientsJson, "utf-8");
};

//Safe parse, validate and type guards patients
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatientEntry => {
	const newEntry: NewPatientEntry = {
		name: parseName(object.name),
		dateOfBirth: parseDateOfBirth(object.dateOfBirth),
		ssn: parseSSN(object.ssn),
		gender: parseGender(object.gender),
		occupation: parseOccupation(object.occupation)
	};

	return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validatePatientEntry = (object: any): EntryWithoutId | undefined => {


	switch (object.type) {
		case 'Hospital': {
			if (!isValidHospitalEntry(object as EntryWithoutId)) {
				return undefined;
			}
			return object as EntryWithoutId;
		}
		case 'OccupationalHealthcare': {
			if (!isValidOccupationalHealthcareEntry(object as EntryWithoutId)) {
				return undefined;
			}
			return object as EntryWithoutId;
		}
		case 'HealthCheck': {
			if (!isValidHealthCheckEntry(object as EntryWithoutId)) {
				return undefined;
			}
			return object as EntryWithoutId;
		}
		default:
			console.log('Type is missing or wrong');
			return undefined;
	}
};

//Mapping the patients.json to PatientEntry type with the toNewPatientEntry function
export const patientEntries = (): PatientEntry[] => {
	return patientData.map(obj => {
		const object = toNewPatientEntry(obj) as PatientEntry;
		object.id = obj.id;
		return object;
	});
};


//---------------------------------------------------------------------------//
//------------------------------ Validators ---------------------------------//
const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
		throw new Error('Incorrect or missing date: ' + dateOfBirth);
	}
	return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

/*
const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}
	return specialist;
};

 const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {

	if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
		throw new Error('Incorrect or missing diagnosisCodes');
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return diagnosisCodes;
}; 

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}
	return description;
};

const parseEmployerName = (employerName: unknown): string => {
	if (!employerName || !isString(employerName)) {
		throw new Error('Incorrect or missing description');
	}
	return employerName;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
	if (!healthCheckRating || isNaN(Number(healthCheckRating))) {
		throw new Error('Incorrect or missing healthCheckRating');
	}

	return Number(healthCheckRating);
}; */

//------------------------------------------------------------------------------//
//------- Check that reqiured fields are given for each entry types- ------------//
//------------------------------------------------------------------------------//
const isValidHospitalEntry = (object: EntryWithoutId): boolean => {
	const propertiesToTest = ['date', 'type', 'specialist', 'description', 'discharge'];
	return propertiesToTest.every((p) => p in object);
};

const isValidOccupationalHealthcareEntry = (object: EntryWithoutId): boolean => {
	const propertiesToTest = ['date', 'type', 'specialist', 'description', 'employerName'];
	return propertiesToTest.every((p) => p in object);
};

const isValidHealthCheckEntry = (object: EntryWithoutId): boolean => {
	const propertiesToTest = ['date', 'type', 'specialist', 'description', 'healthCheckRating'];
	return propertiesToTest.every((p) => p in object);
};

//---------------------------------------------------------------------------//