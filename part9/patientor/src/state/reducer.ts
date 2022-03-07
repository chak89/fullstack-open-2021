import { State } from "./state";
import { Patient, Action, Diagnosis } from "../types";


export const setPatientList = (payload: Patient[]): Action => {
	return {
		type: 'SET_PATIENT_LIST',
		payload: payload,
	};
};

export const addPatient = (payload: Patient): Action => {
	return {
		type: 'ADD_PATIENT',
		payload: payload,
	};
};

export const setPatientInfo = (payload: Patient): Action => {
	return {
		type: 'SET_PATIENT_INFO',
		payload: payload,
	};
};


export const setDiagnosisList = (payload: Diagnosis[]): Action => {
	return {
		type: 'SET_DIAGNOSIS_LIST',
		payload: payload,
	};
};

export const updatePatient = (payload: Patient): Action => {
	return {
		type: 'UPDATE_PATIENT',
		payload: payload,
	};
};


export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_PATIENT_LIST":
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients
				}
			};
		case "ADD_PATIENT":
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload
				}
			};
		case "SET_PATIENT_INFO":
			return {
				...state,
				patientsInfo: {
					...state.patientsInfo,
					[action.payload.id]: action.payload
				}
			};
		case "SET_DIAGNOSIS_LIST":
			return {
				...state,
				diagonsisList: {
					...action.payload.reduce(
						(memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
						{}
					),
					...state.diagonsisList
				}
			};
		case "UPDATE_PATIENT":
			return {
				...state,
				patientsInfo: {
					...state.patientsInfo,
					[action.payload.id]: action.payload
				}
			};
		default:
			return state;
	}
};
