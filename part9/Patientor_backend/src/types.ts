
export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}


export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export type PatientNonSSN = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;