import React from 'react'

const Numbers = ({filteredPersons, deleteHandler}) => {

    return (
        <>
            <h2>Numbers</h2>
            {filteredPersons.map(person => {
                return (
                <div key={person.id}>
                    {person.name}  {person.number} <button onClick={() => deleteHandler(person.id)}>Delete</button>
                </div>
                )
            })}
        </>
    )
}

export default Numbers