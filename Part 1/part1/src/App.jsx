function Hello (props) {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

function App () {
  const name = 'Peter'
  const age = 10
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  
  return (
    <div>
      <div>
        <h1>Greetings</h1>
        <Hello name='Maya' age={26 + 10} />
        <Hello name={name} age={age} />
      </div>
      <div>
        <p>{friends[0].name} {friends[0].age}</p>
        <p>{friends[1].name} {friends[1].age}</p>
      </div>
    </div>
  )
}

export default App
