import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {useState,useEffect} from 'react';

function App() {
  const [state,setState] = useState({
    name: "",
    surname: '',
    email: "",
    mobile: 0 ,
    unit : 0,
    cost: 0,
    totalprice: 0,
    gst:0,
    grandtotal:0

    
  });

  console.log(state);

  /*
  const [name, setName] = useState('');
  const[age,setAge] = useState(0);
  const[country,setCountry] = useState('');
  const [position,setPosition] = useState('');
  const [wage, setWage] = useState(0);  */
   const displayFields = ()=>{
     console.log(state.name +state.age + state.country + state.position + state.wage);
   } 
  const calTotalPrice = () => {
    setState({
      ...state, totalprice: state.unit*state.cost
    })
    document.getElementById('totalprice').value = state.totalprice;
  } 
  
  //calculating gst
  const calGst = () => {
    setState({
      ...state, gst:  (state.totalprice*10)/100
    })
    document.getElementById('gst').value = state.gst;
  }

  const calGrandTotal = () => {
    setState({
      ...state, grandtotal: state.totalprice + state.gst
    })
  }

const handler = (event) =>{
  const value = event.target.value;
  setState({
    ...state,
    [event.target.name] : value
  });
}

const onSubmitting = () => {
  axios.post('http://localhost:3001/create', {
    name: name,
    surname: surname,
    email: email,
    mobile: mobile ,
    unit : unit,
    cost: cost,
    totalprice: totalprice,
    gst: gst,
    grandtotal : grandtotal
    }).then(response => {
      console.log("Successfully Saved in Database");
    });
};

return (
    <div className="App">
     <h1>Registering Details</h1>
     <div className="info">
       <label> Name : </label>
       <input type="text" name="name" value={state.name} onChange={handler}/>
       <label>Surname :</label> 
       <input type='text' name='surname' value = {state.surname} onChange={handler} />
       <label>Email : </label>
       <input type="text" name='email' value = {state.email} onChange={handler}/>
       <lable>Mobile :</lable>
       <input type='number' name='mobile' value = {state.mobile} onChange={handler}/>
       <label>Unit : (year)</label>
       <input type="number" name="unit" value = {state.unit} onChange={handler}/>
       <label>Cost : (year)</label>
       <input type="number" name="cost" value = {state.cost} onChange={handler}/>
       <label>Total Price : </label>
       <input type="number" name="totalprice" value = {state.totalPrice} id='totalprice' onFocus={calTotalPrice}/>
       <label>GST 10% : (year)</label>
       <input type="number" name="gst" value = {state.gst} id="gst" onFocus={calGst}/>
       <label>Gran Total : (year)</label>
       <input type="number" name="grandtotal" value = {state.grandTotal} id="grandtotal" onFocus={calGrandTotal}/>

       <button onClick={displayFields}> Submit </button>
       </div>

    </div>
  );
}

export default App;
