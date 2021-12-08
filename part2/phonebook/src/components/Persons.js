/* import React from 'react' */

const Persons = ({ persons }) => {

    const displayNames = persons.map((person, index) => <DisplayNames key={index} person={person} />);

    return (
        <div>
            {displayNames}
        </div>
    )
}

const DisplayNames = ({ person }) => {
    return (
        <div>{person.name} {person.number}</div>
    )
}

export default Persons