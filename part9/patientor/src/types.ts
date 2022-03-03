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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
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

/* export interface Action1 {
	type: string;
	payload: Patient;
}

export interface Action2 {
	type: string;
	payload: Patient[];
}

export type Action = | Action1 | Action2; 
 */