
const Header = ({course}) =>{
  return (
    <h1>{course.name}</h1>
  );

};

const Part = ({partName, exercises}) => {
  return(
    <p>{partName} {exercises}</p>
  );

};

const Content = ({part}) => {
  console.log({part})
  return (
    <div>
      <Part partName={part.name} exercises={part.exercises} />
    </div>
  );
};

const App = () => {

  const course  = 'Half Stack application development'

  const part1 = {
    name:'Fundamentals of React',
    exercises: 10 
  }  

  const part2 = {
    name:'Using props to pass data',
    exercises: 7 
  }

  const part3 = {
    name:'State of a component',
    exercises: 14 
  }


  return (
    <div>
      <Header course = {course} />
      <Content part = {part1} />
      <Content part = {part2} />
      <Content part = {part3} />

      <p>Number of exercises {part1.exercises + part2.exercises  + part3.exercises }</p>
    </div>
  )
}

export default App