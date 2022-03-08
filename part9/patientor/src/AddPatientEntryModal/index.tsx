import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Button } from "@material-ui/core";

import AddPatientEntryForm, { PatientEntryFormValues } from "./AddPatientEntryForm";


interface Props {
	modalOpen1: boolean;
	onClose: () => void;
	onSubmit: (values: PatientEntryFormValues) => void;
	error?: string;
}

const AddPatientEntryModal = ({ modalOpen1, onClose, onSubmit, error }: Props) => {

	const [entryType, setEntryType] = React.useState<string>("");

	const openModal2 = (formType: string): void => {
		setEntryType(formType);

		if (formType === "Hospital") {
			console.log('Clicked button: Hospital');
		}
		if (formType === "OccupationalHealthCare") {
			console.log('Clicked button: OccupationalHealthCare');
		}
		if (formType === "Healthcheck") {
			console.log('Clicked button: Healthcheck');
		}
	};

	return (
		<Dialog fullWidth={true} open={modalOpen1} onClose={() => onClose()}>
			<DialogTitle>Select entry type:</DialogTitle>
			<Divider />
			<DialogContent>
				<Grid>
					<Grid item>
						<Button
							variant="contained"
							style={{ marginBottom: 10, }}
							type="button"
							onClick={() => openModal2("Hospital")}
						>
							New Hospital entry
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							style={{ marginBottom: 10, }}
							type="button"
							onClick={() => openModal2("OccupationalHealthCare")}
						>
							New Occupational HealthCare entry
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							style={{ marginBottom: 10, }}
							type="button"
							onClick={() => openModal2("Healthcheck")}
						>
							New Healthcheck entry
						</Button>
					</Grid>
				</Grid>
				{error && <Alert severity="error">{`Error: ${error}`}</Alert>}
				{<AddPatientEntryForm entryType={entryType} onClose={onClose} onSubmit={onSubmit} />}
			</DialogContent>
		</Dialog>
	);
};

export default AddPatientEntryModal;