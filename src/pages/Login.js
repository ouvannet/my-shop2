import React from 'react';
import { useState } from 'react';
import fireDb from "../firebase";
import {useEffect} from 'react';
import {toast} from "react-toastify";

const initialState = {
    name: "",
    password:"",
  }

const Login = () => {
    const [state,setState]=useState(initialState);
    const [userinput1, setUserinput1] = useState('');
    const [userinput2, setUserinput2] = useState('');
    const [getinput, setGetinput] = useState(userInput1);
    const [data, setData]=useState({});
    const{name,password}=state;
    var countUser=0;
    useEffect(()=>{
      fireDb.child("user").on("value", (snapshot)=>{
        console.log(snapshot);
        if(snapshot.val()!==null){
          setData({...snapshot.val() });
        }else{
          setData({});
        }
      });
      return()=>{
        setData({});
      }
    },[]);
    console.log("dadat");
    console.log(data);
    console.log(state);

    var userInput1 = (e)=>{
        const {name, value}=e.target;
        setState({...state,[name]: value});
        console.log(state);

        setUserinput1(e.target.value);
    }
    var userInput2 = (e)=>{
        const {name, value}=e.target;
        setState({...state,[name]: value});
        console.log(state);

        setUserinput2(e.target.value);
    }

    var userLogin = (e)=>{
        console.log(userinput1);
        console.log(userinput2);
        sessionStorage.setItem("Login", userinput1+userinput2);
        sessionStorage.setItem("Username",userinput1);

        e.preventDefault();
        if(!name || !password){
          toast.error("Please provide value in each input field");
        }else{
          {Object.keys(data).map((id, index)=>{
            if(data[id].name==state.name){
              countUser++;
            }
          })}
          if(countUser==0){
            // alert(countUser);
            fireDb.child("user").push(state,(err)=>{
              if(err){
                toast.error(err);
              }else{
                toast.success("Contact Added Successfully");
              }
            });
          }else{
            alert("User aready");
          }

        //   setTimeout(()=> history.push("/"),500);
        }
        // window.location.reload(false);
    }
  return (
    <div style={{marginTop:"10px"}}>
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center",}}>
            <label htmlFor='name'>Name</label>
            <input type="text" id="name" name='name' onChange={userInput1} placeholder="Your name..."></input>

            <label htmlFor='password'>Password</label>
            <input type="text" id="password" name='password' onChange={userInput2} placeholder="Your password..."></input>

            <button onClick={userLogin} className="btn_submit">click</button>
        </form>
    </div>
  )
}

export default Login