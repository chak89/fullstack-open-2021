import React from "react";
import { useStateValue } from "../state";

import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { HospitalEntryInterface } from "../types";
import { DiagnosisSelection } from "../AddPatientEntryModal/FormField";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientEntryFormValues = Omit<HospitalEntryInterface, "id">;

interface Props {
	onSubmit: (values: PatientEntryFormValues) => void;
	onCancel: () => void;
}

export const EntryFormHospital = ({ onSubmit, onCancel }: Props) => {

	const [{ diagonsisList }] = useStateValue();
	return (
		<Formik
			initialValues={{
				type: "Hospital",
				specialist: "",
				date: "",
				description: "",
				diagnosisCodes: [],
				discharge: {
					date: "",
					criteria: "",
				}
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				const errors: { [field: string]: string } = {};
				if (!values.type) {
					errors.type = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.discharge.date || !values.discharge.criteria) {
					errors.discharge = requiredError;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<Field
							label="Type"
							placeholder="Type"
							name="type"
							readonly={true}
							variant="filled"
							component={TextField}
						/>
						<Field
							label="Specialist"
							placeholder="Specialist"
							name="specialist"
							component={TextField}
						/>
						<Field
							label="Date"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<Field
							label="Description"
							placeholder="Description"
							name="description"
							component={TextField}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagonsisList)}
						/>
						<Field
							label="Discharge Date"
							placeholder="YYYY-MM-DD"
							name="discharge.date"
							component={TextField}
						/>
						<Field
							label="Discharge Criteria"
							placeholder="Discharge Criteria"
							name="discharge.criteria"
							component={TextField}
						/>
						<Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="contained"
									style={{ float: "left" }}
									type="button"
									onClick={onCancel}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									style={{
										float: "right",
									}}
									type="submit"
									variant="contained"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default EntryFormHospital;
