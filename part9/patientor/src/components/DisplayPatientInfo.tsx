import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { setPatientInfo, useStateValue } from "../state";

import { Patient } from "../types";

import {
	useParams
} from 'react-router-dom';


import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';


const DisplayPatientInfo = () => {
	const { id } = useParams<{ id?: string }>();
	const [{ patientsInfo }, dispatch] = useStateValue();

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

	return (
		<div>
			{console.log('patientsInfo', patientsInfo)}
			<h3>{patientsInfo[id].name}{genderSymbol(patientsInfo[id].gender)}</h3>
			<p>SSN: {patientsInfo[id].ssn}</p>
			<p>Occupation: {patientsInfo[id].occupation}</p>
		</div>
	);
};


export default DisplayPatientInfo;