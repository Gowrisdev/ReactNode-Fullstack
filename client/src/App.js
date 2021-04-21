import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {useState,useEffect} from 'react';
import Axios from 'axios';

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
    grandtotal:0,
    id:0
 });
 const [customerList, setCustomerList] = useState([]);


 const {name,surname,email,mobile,unit,cost,totalprice,gst,grandtotal} = state;

  console.log(state);

  /*
  const [name, setName] = useState('');
  const[age,setAge] = useState(0);
  const[country,setCountry] = useState('');
  const [position,setPosition] = useState('');
  const [wage, setWage] = useState(0);  */
const urlId = (event) =>{
  const id = event.target.value;
  setState({
    ...state, id: id
  })
  
};





   const displayFields = ()=>{
     console.log(state.name +state.age + state.country + state.position + state.wage);
   } 
  const calTotalPrice = () => {
    setState({
      ...state, totalprice: unit*cost
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

  // calculating Grand Total
  const calGrandTotal = () => {
    setState({
      ...state, grandtotal: state.totalprice + state.gst
    })
    document.getElementById('grandtotal').value = grandtotal;
  }
  // Handling Event on Change
const handler = (event) =>{
  const value = event.target.value;
  setState({
    ...state,
    [event.target.name] : value
  });
}

// Saving customer data into DB
const onSubmitting = () => {
  Axios.post('http://localhost:3001/create', {
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
      console.log("Successfully Saved in Database -- ", response);
    });
    document.getElementById("formId").value = "";
};

// get Customer based on ID

const getCustomer = () => {
  
  const url = 'http://localhost:3001/customer/${state.id}';
  Axios.get(url)
  .then( (response) => {
       console.log(response, "Inside .then");
    setCustomerList(response.data);
  }).catch((error)=>console.log(error.message))
}
console.log(customerList, "After getCustomer")

return (
    <div className="App">
     <h1>Registering Details</h1>
     <div className="info" id="formId">
       <label> Name : </label>
       <input type="text" name="name" value={state.name} onChange={handler}/>
       <label>Surname :</label> 
       <input type='text' name='surname' value = {state.surname} onChange={handler} />
       <label>Email : </label>
       <input type="text" name='email' value = {state.email} onChange={handler}/>
       <lable>Mobile :</lable>
       <input type='number' name='mobile' value = {state.mobile} onChange={handler}/>
       <label>Unit : </label>
       <input type="number" name="unit" value = {state.unit} onChange={handler}/>
       <label>Cost : </label>
       <input type="number" name="cost" value = {state.cost} onChange={handler}/>
       <label>Total Price : </label>
       <input type="number" name="totalprice" value = {state.totalPrice} id='totalprice' onFocus={calTotalPrice}/>
       <label>GST 10% : </label>
       <input type="number" name="gst" value = {state.gst} id="gst" onFocus={calGst}/>
       <label>Grand Total : </label>
       <input type="number" name="grandtotal" value = {state.grandTotal} id="grandtotal" onClick={calGrandTotal}/>

       <button onClick={onSubmitting}> Submit </button>
       </div>
        
        <div className="employee">
          <input type="text" id="id" placeholder="Enter ID " onChange={urlId} value={state.id}/>
         <button onClick={getCustomer}> Get Cutomer Details </button>
          
         { customerList.map((customer) => {
              return (
                <div className="data">
                    <h3>Name :{customer.name}</h3>
                    <h3>Surname : {customer.surname}</h3>
                    <h3>Email : {customer.email}</h3>
                    <h3>Mobile : {customer.mobile}</h3>
                    <h3>Unit : {customer.unit}</h3>
                    <h3>Cost : {customer.cost}</h3>
                    <h3>Total Price : {customer.totalprice}</h3>
                    <h3>GST 10% : {customer.gst}</h3>
                    <h3>Grand Total : {customer.grandtotal}</h3>
                </div>
              )
          })
        }
        
        </div>


    </div>
  );
}

export default App;
