import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { setPatientInfo, updatePatient, useStateValue } from "../state";
import {
	useParams
} from 'react-router-dom';

import {
	Patient,
} from "../types";

import { PatientEntryFormValues } from "../AddPatientEntryModal/AddPatientEntryForm";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AddPatientEntryModal from "../AddPatientEntryModal";
import { Button } from "@material-ui/core";
import PatientEntry from "./PatientEntry";


const DisplayPatientInfo = () => {
	const { id } = useParams<{ id?: string }>();
	const [{ patientsInfo, diagonsisList }, dispatch] = useStateValue();

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	if (!id) {
		return null;
	}

	React.useEffect(() => {
		console.log('DisplayPatientInfo -> UseEffect()');
		if (!patientsInfo[id]) {
			const fetchPatientById = async () => {
				try {
					const { data: patientsInfoFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
					dispatch(setPatientInfo(patientsInfoFromApi));
				} catch (e) {
					console.error(e);
				}
			};
			void fetchPatientById();
		}
	});


	if (Object.entries(patientsInfo).length === 0 || patientsInfo[id] === undefined) {
		return null;
	}

	const genderSymbol = (param: string) => {
		switch (param) {
			case 'male':
				return <MaleIcon />;
			case 'female':
				return <FemaleIcon />;
			case 'other':
				return <TransgenderIcon />;
			default:
				return null;
		}
	};

	const submitNewPatientEntry = async (values: PatientEntryFormValues) => {
		try {
			const { data: newPatientEntry } = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			console.log('newPatientEntry:', newPatientEntry);
			dispatch(updatePatient(newPatientEntry));
			closeModal();
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				console.error(e?.response?.data || "Unrecognized axios error");
				setError(String(e?.response?.data?.error) || "Unrecognized axios error");
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};

	return (
		<div>
			{console.log('patientsInfo', patientsInfo)}
			{console.log('diagonsisList', diagonsisList)}
			<h3>{patientsInfo[id].name}{genderSymbol(patientsInfo[id].gender)}</h3>
			SSN: {patientsInfo[id].ssn}<br />
			Occupation: {patientsInfo[id].occupation}
			<PatientEntry id={id} />
			<AddPatientEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewPatientEntry}
				error={error}
				onClose={closeModal}
			/>
			<Button variant="contained" onClick={() => openModal()}>
				Add New Entry
			</Button>
		</div>
	);
};


export default DisplayPatientInfo;