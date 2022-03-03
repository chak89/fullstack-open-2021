import * as React from 'react';

import { useStateValue } from "../state";

import { OccupationalHealthcareEntryInterface } from '../types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcareEntryInterface }) => {

	const [{ diagonsisList }] = useStateValue();

	return (
		<Card sx={{ minWidth: 275 }} style={{ marginTop: "5px", marginBottom: "5px" }}>
			<CardContent>
			<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Type: {entry.type}
				</Typography>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Date: {entry.date}
				</Typography>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Diagnosed by: {entry.specialist} 
				</Typography>
				<Typography variant="body2" component="div">
					Description: <br />
					{entry.description}
				</Typography>
				<ul>
					{entry.diagnosisCodes?.
						map((code: string) =>
							<li key={code}>
								<Typography
									variant="body2">{code} - {diagonsisList[code].name}
								</Typography>
							</li>)
					}
				</ul>
				<Typography variant="body2">
					Employer: {entry.employerName}
				</Typography>
				<br />
				<Typography variant="body2">
					Sick Leave: <br />
						{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default OccupationalHealthcareEntry;