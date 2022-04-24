import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}

const Part = (props) => {
  return (
    <p> {props.parts} {props.exercises}</p>
  )
}

const Content = (props) => {
  const courseParts = props.course.parts
  return (
    <div>
      {courseParts.map(courseParts =>
        <Part key={courseParts.id} parts={courseParts.name} exercises={courseParts.exercises}/>
        )}
    </div>
  )
}


const Total = (props) => {
  const courseParts = props.course.parts
  const total = courseParts.reduce ((sum , courseParts)=> sum +courseParts.exercises, 0)
  return (
    <b>Number of exercises {total}</b>
  )
}
const Course = ({course}) => {
  return (
    <div>
      <h1>Web Developement Curriculum</h1>
      {course.map(course =>
        <div key={course.id}>
      < Header course={course}/>
      < Content course={course}/>
      < Total course={course}/> 
      
      </div>
    )}
</div>
  )
}
export default Course