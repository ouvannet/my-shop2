import React,{useState,useEffect} from 'react';
import "./AddPay.css";
import fireDb from "../firebase";
import {toast} from "react-toastify";
import { storage } from '../firebase';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";


const initialState = {
    type:"user",
    product:"",
    name: "",
    phone: "",
  }
const AddPay = () => {
    var Productbuy=JSON.parse(localStorage.getItem("buypro"));
    var product=Productbuy;
    console.log(Productbuy);
    const [state,setState]=useState(initialState);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [loca,setloca]=useState();
    const{name,phone,urlpay}=state;


    // {Object.keys(Productbuy).map((id, index)=>{


    // })}

    const handleInputChange1=(e)=>{
        const {name, value}=e.target;
        setState({...state,[name]: value,product});
        
    };
    console.log(state);

    function genRandonString(length) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charLength = chars.length;
        var result = '';
        for ( var i = 0; i < length; i++ ) {
           result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
      }
    const handleImageChange1 = (e) =>{
        if(e.target.files[0]){
          setImage(e.target.files[0]);
         }
         const {name,value}=e.target;
         setloca(value);
         alert(name);
         alert(value);
         console.log(state);
         // const result = Math.random().toString(36).substring(1,100);
         // console.log(result);
         console.log(genRandonString(60));
         
       }

       const uploadImage1 = () =>{
        alert(this);
        const imageRef = ref(storage, genRandonString(60));
        uploadBytes(imageRef, image).then(() =>{
          getDownloadURL(imageRef).then((url) =>{
            setUrl(url);
            setState({...state, url});

            
            
          }).catch(error =>{
            console.log(error.message, "error image url");
          });
          setImage(null);
          
        })
        .catch(error =>{
          console.log(error.message);
        });
        
      };


       var userchat = (e)=>{
        
        e.preventDefault();
        if(!name || !phone){
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
        // window.location.reload(false);
    }
    return (
        <div className='cardpay'>
            <table border="1px" width="100%">
                <tr>
                    <td colSpan="2">Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                </tr>
                {Productbuy != null?(
                    Object.keys(Productbuy).map((id, index)=>{
                        console.log(Productbuy[id].name);
                        return(
                            <tr>
                                <td width="25.2px"><img src={Productbuy[id].url} height="25.2px"></img></td>
                                <td>{Productbuy[id].name}</td>
                                <td>{Productbuy[id].price}</td>
                                <td>{Productbuy[id].quantity}</td>
                            </tr>
                        )
                    })
                ):(
                    ""
                )}
                
            </table>
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center",}}>

            <label htmlFor='name'>Name</label>
            <input 
                type="text"
                id="name"
                name="name"
                placeHolder="Your Name..."
                // value={sessionStorage.getItem("Username")}
                onChange={handleInputChange1}
             />

             <label htmlFor='Phone'>Phone</label>
            <input 
                type="number"
                id="phone"
                name="phone"
                placeHolder="Your phone..."
                // value={phone || ""}
                onChange={handleInputChange1}
             />

              <label htmlFor='img'>Your pay</label>
            <div className='imgup'>
              <input 
                  type="file"
                  id="img"
                  className='imgs'
                  name="img"
                  placeHolder="Your Image..."
                //   value={img || ""}
                  onChange={handleImageChange1}
              /><div className='imgss'
               onClick={uploadImage1} 
               >click</div>

            </div>
            <div className='show_img'>
              <img alt="Wait your img before click add product" 
              src={url}
               width="100%"/>
            </div>
            {url?(
              <button 
              onClick={userchat} 
              className="btn_submit">Add Product</button>
            ):("")} 
             
        </form>

    </div>
  )
}

export default AddPay