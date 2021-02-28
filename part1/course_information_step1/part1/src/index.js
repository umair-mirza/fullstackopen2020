import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Total from './components/Total'
import Content from './components/Content'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const {name, parts} = course;

  return (
    <div>
      <Header course={name} />
      <Content p1={parts[0].name} p2={parts[1].name} p3={parts[2].name} e1={parts[0].exercises} e2={parts[1].exercises} e3={parts[2].exercises} />
      <Total e1={parts[0].exercises} e2={parts[1].exercises} e3={parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))