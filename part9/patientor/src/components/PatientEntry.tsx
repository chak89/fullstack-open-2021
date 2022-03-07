import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import { useStateValue } from "../state";

const PatientEntry = ({ id }: { id: string }) => {
	const [{ patientsInfo }] = useStateValue();

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
			{displayEntries()}
		</div>
	);
};

export default PatientEntry;