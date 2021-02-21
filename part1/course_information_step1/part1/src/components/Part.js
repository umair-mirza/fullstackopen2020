import React from 'react';

const Part = ({p1, p2, p3, e1, e2, e3}) => {
    return (
        <>
            <p>
                {p1} {e1}
            </p>
            <p>
                {p2} {e2}
            </p>
            <p>
                {p3} {e3}
            </p>
        </>
    )
}

export default Part