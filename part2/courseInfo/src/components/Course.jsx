
const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {

    const initialValue = 0;
    const total = parts.reduce(
        (s, p) => s + p.exercises,
        initialValue,
    );
    return <b>total of {total} exercises</b>
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