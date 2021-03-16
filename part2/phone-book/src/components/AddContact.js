import React from 'react'

const AddContact = ({handleSubmit, newName, handleNewName, newPhone, handleNewPhone}) => {
    return (
        <>
            <h2>Add new contact</h2>
            <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={(e) => handleNewName(e)} />
            </div>
            <div>
                number: <input value={newPhone} onChange={(e) => handleNewPhone(e)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>
        </>
    )
}

export default AddContact