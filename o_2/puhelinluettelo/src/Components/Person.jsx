import React from 'react'
import pbService from '../services/phonebookService'

const Person = ({person, remove}) => {

    const handleRemoving = (event) => {
        event.preventDefault()
        remove(person)
    }

    return (
        <div>
            <p>Name: {person.name} </p>
            <p>Number: {person.number}</p>
            <button onClick={handleRemoving}>Delete</button>
            <br />
        </div>
    )
}

export default Person