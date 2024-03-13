const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    let sum = 0
    parts.map((part) => {
        sum += part.exercises
    })
    console.log(sum)
    return (
        <b>total of {sum} exercises</b>
    )
}



const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map((part,) => <Part key={part.id } part= {part} />)


const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course