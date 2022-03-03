import * as React from 'react';

import { HealthCheckEntryInterface } from "../types";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntryInterface }) => {
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
				<br />
				<Typography variant="body2">
					Health Rating: {entry.healthCheckRating}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default HealthCheckEntry;