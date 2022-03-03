export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other"
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Entry[];
}


export interface HospitalEntry extends BaseEntry {
	discharge: {
		date: string;
		criteria: string;
	}
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	}
}

export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export interface BaseEntry {
	id: string;
	date: string;
	type: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
	description: string;
}



export type Action =
	| {
		type: 'SET_PATIENT_LIST';
		payload: Patient[];
	}
	| {
		type: 'ADD_PATIENT';
		payload: Patient;
	}
	| {
		type: 'SET_PATIENT_INFO';
		payload: Patient;
	};

