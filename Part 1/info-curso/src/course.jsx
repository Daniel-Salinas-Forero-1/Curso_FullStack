const Header = (props) => {
  
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
      {props.parts.parts.map(parts => (
        <Part key={parts.id} name={parts.name} exercises = {parts.exercises}/>
      ))}
    </div>
  )
}

const  Total = (props) => {
  
  const suma = props.total.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <h2>Number of exercises {suma}</h2>
    </div>
  )
}

const  Course = (course) => {
  
  return (
    
    <div>
      <Header course={course.course}/>
      <Content parts={course.course}/>
      <Total total={course.course}/>  
    </div>
  )
}

export default Course

