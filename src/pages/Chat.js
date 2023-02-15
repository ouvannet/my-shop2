import React,{useState,useEffect} from 'react';
import axios from "axios";
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {set} from "firebase/database";
import {toast} from "react-toastify";

const Chat = () => {
  const [data, setData]=useState({});


  useEffect(()=>{
    fireDb.child("chat").on("value", (snapshot)=>{
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
    <div>
      {Object.keys(data).map((id, index)=>{
              var prod=data[id].product;
              var ll=Object.assign({}, prod);
              console.log(ll);
        return(

          <table border="1px">
            {Object.keys(ll).map((id, index)=>{
              // console.log(prod);
              return(
                <tr>

                  <td width="25.2px"><img src={ll[id].url} height="25.2px"></img></td>
                  <td>{ll[id].name}</td>
                  <td>{ll[id].price}</td>
                  <td>{ll[id].quantity}</td>
                  
                </tr>
              )
            })}
          </table>
          

        )
      })}
        
    </div>
  )
}

export default Chat