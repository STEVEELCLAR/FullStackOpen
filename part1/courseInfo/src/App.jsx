
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
      <Part partName={part[0].name} exercises={part[0].exercise} />
      <Part partName={part[1].name} exercises={part[1].exercise} />
      <Part partName={part[2].name} exercises={part[2].exercise} /> 
    </div>
  );
};

const App = () => {

  const course  = {
    name: 'Half Stack application development',
  }

  const part = [
    {name: 'Fundamentals of React' , exercise: 10},
    {name: 'Using props to pass data', exercise: 7},
    {name: 'State of a component', exercise: 14},
  ] 
  console.log(part[0].exercise)
  return (
    <div>
      <Header course = {course} />
      <Content part = {part} />
      <p>Number of exercises {part[0].exercise + part[1].exercise  + part[2].exercise }</p>
    </div>
  )
}

export default App