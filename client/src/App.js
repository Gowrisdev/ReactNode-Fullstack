import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {useState,useEffect} from 'react';

function App() {
  const [state,setState] = useState({
    name: "",
    age: 0,
    country: "",
    position: "",
    wage : 0
    
  });

  console.log(state.name);

  /*
  const [name, setName] = useState('');
  const[age,setAge] = useState(0);
  const[country,setCountry] = useState('');
  const [position,setPosition] = useState('');
  const [wage, setWage] = useState(0);  */
   const displayFields = ()=>{
     console.log(state.name +state.age + state.country + state.position + state.wage);
   }  

const handler = (event) =>{
  const value = event.target.value;
  setState({
    ...state,
    [event.target.name] : value
  });
}

return (
    <div className="App">
     <h1>Registering Details</h1>
     <div className="info">
       <label> Name : </label>
       <input type="text" name="name" value={state.name} onChange={handler}/>
       <label>Age :</label> 
       <input type='number' name='age' value = {state.age} onChange={handler} />
       <label>Country : </label>
       <input type="text" name='country' value = {state.country} onChange={handler}/>
       <lable>Position :</lable>
       <input type='text' name='position' value = {state.position} onChange={handler}/>
       <label>Wage (year)</label>
       <input type="number" name='wage' value = {state.wage}onChange={handler}/>
       <button onClick={displayFields}> Submit </button>
       </div>

    </div>
  );
}

export default App;
