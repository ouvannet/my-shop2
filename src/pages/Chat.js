import React,{useState,useEffect} from 'react';
import axios from "axios";
import './Chat.css';
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {set} from "firebase/database";
import {toast} from "react-toastify";

const initialState = {
  type:"usertext",
  text: "",
}

const Chat = () => {
  const [data, setData]=useState({});
  const [state,setState]=useState(initialState);
  const{text}=state;

  const handleInputChange55=(e)=>{
    const {name, value}=e.target;
    setState({...state,[name]: value});
    
  };
  console.log(state);
  var userchattext = (e)=>{
        
    e.preventDefault();
    if(!text){
      toast.error("Please provide value in each input field");
    }else{
      fireDb.child(sessionStorage.getItem("Username")).push(state,(err)=>{
        if(err){
          toast.error(err);
        }else{
          toast.success("Contact Added Successfully");
        }
      });
    //   setTimeout(()=> history.push("/"),500);
    }
  }


  useEffect(()=>{
    fireDb.child(sessionStorage.getItem("Username")).on("value", (snapshot)=>{
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

  console.log(data);
  return (
    <div className='bodychat'>
      {Object.keys(data).map((id, index)=>{
              var prod=data[id].product;
              var ll=Object.assign({}, prod);
              console.log(ll);
              console.log(data);
        return(
          (data[id].type=="user")?(
            <table className='userbuy' cellSpacing="2px" border="1px">
              
              {Object.keys(ll).map((id, index)=>{
                return(
                  <tr>
                    <td width="25.2px"><img src={ll[id].url} height="25.2px"></img></td>
                    <td>{ll[id].name}</td>
                    <td>{ll[id].price}</td>
                    <td>{ll[id].quantity}</td>
                  </tr>
                )
              })}
              <tr>
                <td colSpan={4}><img src={data[id].url} width="200px" /></td>
              </tr>
              <tr>
                <td colSpan={4}>{data[id].name}</td>
              </tr>
              <tr>
                <td colSpan={4}>{data[id].phone}</td>
              </tr>
            
            </table>

          ):(
              <div className='showtext'>
                {data[id].text}
              </div>
          )
          

        )
      })}
        <div className='userChat'>
          <form style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <input type="text" name='text' style={{border:"2px solid #00d5ff"}} onChange={handleInputChange55} className='message'  placeholder="Your text..."></input>
              <button onClick={userchattext}  className="btn_sub">send</button>
          </form>
        </div>
    </div>
  )
}

export default Chat