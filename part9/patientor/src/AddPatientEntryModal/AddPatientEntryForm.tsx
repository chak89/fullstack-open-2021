
import EntryFormHealthCheck from "./EntryFormHealthCheck";
import EntryFormHospital from "./EntryFormHospital";
import EntryFormOccupationalHealthcare from "./EntryFormOccupationalHealthcare";

import {
	HospitalEntryInterface,
	OccupationalHealthcareEntryInterface,
	HealthCheckEntryInterface
} from "../types";


type PatientEntryFormHospital = Omit<HospitalEntryInterface, "id">;
type PatientEntryOccupationalHealthcare = Omit<OccupationalHealthcareEntryInterface, "id">;
type PatientEntryHealthCheck = Omit<HealthCheckEntryInterface, "id">;

export type PatientEntryFormValues =
	| PatientEntryFormHospital
	| PatientEntryOccupationalHealthcare
	| PatientEntryHealthCheck;


interface Props {
	entryType: string;
	onClose: () => void;
	onSubmit: (values: PatientEntryFormValues) => void;
}

const displayEntryForm = (
	entryType: string,
	onClose: { (): void; },
	onSubmit: { (values: PatientEntryFormValues): void; }
) => {
	switch (entryType) {
		case 'Hospital':
			return <EntryFormHospital onSubmit={onSubmit} onCancel={onClose} />;
		case 'OccupationalHealthCare':
			return <EntryFormOccupationalHealthcare onSubmit={onSubmit} onCancel={onClose} />;
		case 'Healthcheck':
			return <EntryFormHealthCheck onSubmit={onSubmit} onCancel={onClose} />;
		default:
			return undefined;
	}
};

export const AddPatientEntryForm = ({ entryType, onClose, onSubmit }: Props) => {

	return (
		<div>
			{displayEntryForm(entryType, onClose, onSubmit)}
		</div>
	);
};

export default AddPatientEntryForm;
