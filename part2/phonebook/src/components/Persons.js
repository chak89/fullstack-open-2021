/* import React from 'react' */

const Persons = ({ persons, deletePerson }) => {
    const displayNames = persons.map((person, index) => <DisplayNames key={person.id} person={person} deletePerson={deletePerson} />);

    return (
        <div>
            {displayNames}
        </div>
    )
}

const DisplayNames = ({ person, deletePerson}) => {
    return (
        <div>{person.name} {person.number}&nbsp;
        <button onClick={() => deletePerson(person)}> delete</button>
        </div>
    )
}

export default Persons