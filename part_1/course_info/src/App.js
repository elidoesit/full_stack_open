const Header = (props) => {
 
  return (
    <div><h1>{props.course.name}</h1></div>
  )
}

const Part = (props) => {
  return (
    <p> {props.parts} {props.exercises}</p>
  )
}

const Content = (props) => {
  const courseParts = props.course.parts
  console.log(props)
  return (
    <div>
      {courseParts.map(courseParts =>
        <Part parts={courseParts.name} exercises={courseParts.exercises}/>
        )}
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      < Header course={props.course} />
      < Content course={props.course} />
      < Total course={props.course} /> 
    </div>
  )
}

const Total = (props) => {
  const courseParts = props.course.parts
  const total = courseParts.reduce ((sum , courseParts )=> sum +courseParts.exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}
 const App = () => {
  const course = {
    name: 'Half Stack Application Development',
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

  return (
    <div>
    < Course course={course} />
    </div>
  )
}

export default App

