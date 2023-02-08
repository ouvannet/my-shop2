import React,{useState,useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './AddEdit.css';
import fireDb from "../firebase";
import {toast} from "react-toastify";


const initialState = {
  name:"",
  email:"",
  contact:""
}

const AddEdit = () => {
  const [state,setState]=useState(initialState);
  const [data,setData]=useState({});



  const{name,email,contact}=state;
  const history=useNavigate();

  const handleInputChange=(e)=>{
    const {name, value}=e.target;
    setState({...state,[name]: value});
  };
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email || !contact){
      toast.error("Please provide value in each input field");
    }else{
      fireDb.child("contacts").push(state,(err)=>{
        if(err){
          toast.error(err);
        }else{
          toast.success("Contact Added Successfully");
        }
      });
      setTimeout(()=> history.push("/"),500);
    }
  };
  return (
    <div style={{marginTop:"100px"}} onSubmit={handleSubmit}>
      <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}>
         <label htmlFor='name'>Name</label>
         <input type="text" id="name" name='name' placeholder='Your name....' value={name} onChange={handleInputChange}></input>

         <label htmlFor='email'>Email</label>
         <input type="email" id="email" name='email' placeholder='Your email....' value={email} onChange={handleInputChange}></input>

         <label htmlFor='contact'>Contact</label>
         <input type="number" id="contact" name='contact' placeholder='Your contact....' value={contact} onChange={handleInputChange}></input>

         <input type="submit" value="Save" />
      </form>
    </div>
  )
}

export default AddEdit
