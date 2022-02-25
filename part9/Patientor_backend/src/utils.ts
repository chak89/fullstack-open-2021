/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v1 as uuid } from 'uuid';
import { Patient } from './types';
import fs = require('fs');

export const generateId = (): string => {
	const id = uuid();
	return id;
};

//Write to patients.json file
export const writeToJsonFile = (patientObj: Patient) => {
	let patientsJson = fs.readFileSync("./data/patients.json", "utf-8");
	const patients = JSON.parse(patientsJson);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	patients.push(patientObj);
	patientsJson = JSON.stringify(patients);
	fs.writeFileSync("./data/patients.json", patientsJson, "utf-8");
};

