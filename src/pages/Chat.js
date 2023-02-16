import React,{useState,useEffect} from 'react';
import axios from "axios";
import './Chat.css';
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {set} from "firebase/database";
import {toast} from "react-toastify";

const Chat = () => {
  const [data, setData]=useState({});


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
    <div>
      {Object.keys(data).map((id, index)=>{
              var prod=data[id].product;
              var ll=Object.assign({}, prod);
              console.log(ll);
              console.log(data);
        return(
          (data[id].type=="user")?(
            <table className='userbuy' border="1px">
              
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
            <table className='adminsell' border="1px">
              
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
          )
          

        )
      })}
        
    </div>
  )
}

export default Chat