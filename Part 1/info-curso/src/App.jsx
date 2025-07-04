const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts.parts[0].name} exercises={props.parts.parts[0].exercises} />
      <Part name={props.parts.parts[1].name} exercises={props.parts.parts[1].exercises} />
      <Part name={props.parts.parts[2].name} exercises={props.parts.parts[2].exercises} />
    </div>
  )
}

const  Total = (props) => {
  const suma = props.total.parts[0].exercises + props.total.parts[1].exercises + props.total.parts[2].exercises
  console.log(suma)
  return (
    <div>
      <p>Number of exercises {suma}</p>
    </div>
  )
}



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

  return (
    <div>
      <Header course={course}/>
      <Content parts={course}/>
      <Total total={course}/>  
    </div>
  )
}


export default App