import React from 'react'
import Part from './Part'

const Content = ({p1, p2, p3, e1, e2, e3}) => {
   return (
    <>
        <Part p1={p1} e1={e1} />
        <Part p2={p2} e2={e2} />
        <Part p3={p3} e3={e3} />
    </>
   )
}

export default Content