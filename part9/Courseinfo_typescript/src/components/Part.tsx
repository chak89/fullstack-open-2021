import CoursePart from "../types";

const Part = ({ courseParts }: { courseParts: CoursePart }) => {

	/**
 * Helper function for exhaustive type checking
 */
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};


	let displayPart;

	switch (courseParts.type) {
		case 'normal':
			displayPart =
				<div>
					<p><b>{courseParts.name} {courseParts.exerciseCount}</b><br />
						{courseParts.description}
					</p>
				</div>
			break;
		case 'groupProject':
			displayPart =
				<div>
					<p><b>{courseParts.name} {courseParts.exerciseCount}</b><br />
						Project exercises: {courseParts.groupProjectCount}
					</p>
				</div>
			break;
		case 'submission':
			displayPart =
				<div>
					<p><b>{courseParts.name} {courseParts.exerciseCount}</b><br />
						{courseParts.description}<br />
						Submit to: {courseParts.exerciseSubmissionLink}
					</p>
				</div>
			break;
		case 'special':
			displayPart =
				<div>
					<p><b>{courseParts.name} {courseParts.exerciseCount}</b><br />
						{courseParts.description}<br />
						Required skills: {courseParts.requirements.join(', ')}
					</p>
				</div>
			break;
		default:
			assertNever(courseParts);
			break;
	}

	return (
		<div>
			{displayPart}
		</div>
	);
}

export default Part;