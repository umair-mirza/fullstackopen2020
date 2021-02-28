import React from 'react'

const Statistic = ({text, value}) => {
    return (
        <>
            <td>{text}</td>
            <td>{value}</td>
        </>
    )
}

export default Statistic;