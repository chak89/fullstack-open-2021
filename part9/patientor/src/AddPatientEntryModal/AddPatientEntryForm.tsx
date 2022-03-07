import React from "react";
import { useStateValue } from "../state";

import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, HealthRatingOption } from "./FormField";
import { HealthCheckRating, HealthCheckEntryInterface } from "../types";
import { DiagnosisSelection } from "../AddPatientEntryModal/FormField";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientEntryFormValues = Omit<HealthCheckEntryInterface, "id">;

interface Props {
	onSubmit: (values: PatientEntryFormValues) => void;
	onCancel: () => void;
}

const healthRatingOptions: HealthRatingOption[] = [
	{ value: HealthCheckRating["Healthy"], label: "Healthy" },
	{ value: HealthCheckRating["LowRisk"], label: "LowRisk" },
	{ value: HealthCheckRating["HighRisk"], label: "HighRisk" },
	{ value: HealthCheckRating["CriticalRisk"], label: "CriticalRisk" },
];

export const AddPatientEntryForm = ({ onSubmit, onCancel }: Props) => {

	const [{ diagonsisList }] = useStateValue();
	return (
		<Formik
			initialValues={{
				type: "HealthCheck",
				specialist: "",
				date: "",
				description: "",
				healthCheckRating: HealthCheckRating["Healthy"],
				diagnosisCodes: [],
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
				if(!values.healthCheckRating) {
					errors.healthCheckRating;
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
						<SelectField label="HealthCheckRating" name="healthCheckRating" options={healthRatingOptions} />
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagonsisList)}
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

export default AddPatientEntryForm;
