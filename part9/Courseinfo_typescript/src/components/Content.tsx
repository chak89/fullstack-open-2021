import CoursePart from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {

	const displayCourse = courseParts.map(course =>
		<Part key={course.name} courseParts={course} />
	)

	return (
		<div>
			{displayCourse}
		</div>
	)
}

export default Content;