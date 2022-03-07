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

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Entry[];
}


export interface HospitalEntryInterface extends BaseEntry {
	type: "Hospital";
	discharge: {
		date: string;
		criteria: string;
	}
}

export interface OccupationalHealthcareEntryInterface extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	}
}

export interface HealthCheckEntryInterface extends BaseEntry {
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

export type Entry =
	| HospitalEntryInterface
	| OccupationalHealthcareEntryInterface
	| HealthCheckEntryInterface;


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
	}
	| {
		type: 'SET_DIAGNOSIS_LIST';
		payload: Diagnosis[];
	}
	| {
		type: 'UPDATE_PATIENT';
		payload: Patient;
	};


