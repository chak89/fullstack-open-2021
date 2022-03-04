import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { setPatientInfo, useStateValue } from "../state";
import {
	useParams
} from 'react-router-dom';

import {
	Patient,
} from "../types";

import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';



const DisplayPatientInfo = () => {
	const { id } = useParams<{ id?: string }>();
	const [{ patientsInfo, diagonsisList }, dispatch] = useStateValue();

	if (!id) {
		return null;
	}

	if (!patientsInfo[id]) {
		React.useEffect(() => {
			console.log('DisplayPatientInfo -> UseEffect()');
			const fetchPatientById = async () => {
				try {
					const { data: patientsInfoFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
					dispatch(setPatientInfo(patientsInfoFromApi));
				} catch (e) {
					console.error(e);
				}
			};
			void fetchPatientById();
		});
	}

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

	const displayEntries = (): JSX.Element | null => {
		if (patientsInfo[id].entries.length === 0) {
			return null;
		}

		/**
* Helper function for exhaustive type checking
*/
		const assertNever = (value: never): never => {
			throw new Error(
				`Unhandled discriminated union member: ${JSON.stringify(value)}`
			);
		};

		const mapEntryDetails = patientsInfo[id].entries.map(entry => {
			switch (entry.type) {
				case 'Hospital':
					return <HospitalEntry key={entry.id} entry={entry} />;
				case 'OccupationalHealthcare':
					return <OccupationalHealthcareEntry key={entry.id} entry={entry} />;
				case 'HealthCheck':
					return <HealthCheckEntry key={entry.id} entry={entry} />;
				default:
					assertNever(entry);
					break;
			}
		});

		return (
			<div>
				<h4>Entries:</h4>
				{mapEntryDetails}
			</div>
		);
	};

	return (
		<div>
			{console.log('patientsInfo', patientsInfo)}
			{console.log('diagonsisList', diagonsisList)}
			<h3>{patientsInfo[id].name}{genderSymbol(patientsInfo[id].gender)}</h3>
			SSN: {patientsInfo[id].ssn}<br />
			Occupation: {patientsInfo[id].occupation}
			{displayEntries()}
		</div>
	);
};


export default DisplayPatientInfo;