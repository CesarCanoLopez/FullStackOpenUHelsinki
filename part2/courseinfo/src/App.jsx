const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => (
  <div>
    {
      props.parts.map(
        p => <Part key={p.id} part={p} />
      )
    }
  </div>
)

const Part = (props) => {
  return(
  <p>
    {props.part.name} {props.part.exercises}
  </p>
  )
}

const Total = (props) => <p><b>total of {props.total} exercises </b></p>

const Course = ({course}) => {
  const result = course.parts.reduce((s,p) => {
    return s += p.exercises
  }, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={
          result
        }
      />
    </div>
  )
}
const Courses = ({courses}) => {
  return(courses.map(c => <Course key={c.id} course={c} />))
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}


export default App