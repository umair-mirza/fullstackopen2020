import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({parts}) => {

    const total = parts.map(part => part.exercises).reduce((acc, current) => acc + current, 0)

   return (
    <>
        {parts.map(part => 
        <Part key={part.name} name={part.name} exercises={part.exercises} />
        )}
        
        <Total total={total} />
    </>
   )
}

export default Content