import React,{useState,useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './AddEdit.css';
import fireDb from "../firebase";
import {toast} from "react-toastify";
import { storage } from '../firebase';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { from } from 'form-data';

// sessionStorage.setItem("Login", "");

const initialState = {
  count:0,
  category:"Food",
  name: "",
  price: "",
  quantity: "",
}

const AddEdit = () => {
  const [state,setState]=useState(initialState);
  const [data,setData]=useState({});

  const{name,price,quantity,img}=state;
  const history=useNavigate();
  const {id}=useParams();



  const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [loca,setloca]=useState();
    function genRandonString(length) {
      var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charLength = chars.length;
      var result = '';
      for ( var i = 0; i < length; i++ ) {
         result += chars.charAt(Math.floor(Math.random() * charLength));
      }
      return result;
    }
  const handleImageChange = (e) =>{
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
   console.log(loca);


  const uploadImage = () =>{
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
  console.log(state);
    console.log(url);
    useEffect(()=>{
      fireDb.child("contacts").on("value", (snapshot)=>{
        if(snapshot.val()!==null){
          setData({...snapshot.val() });
        }else{
          setData({});
        }
      });
      return()=>{
        setData({});
      }
    },[id]);

  useEffect(()=>{
    if(id){
      setState({...data[id]});
    }
    else{
      setState({...initialState});
    }

    return () => {
      setState({...initialState});
    }
  },[id, data])
  const handleInputChange=(e)=>{
    const {name, value}=e.target;
    setState({...state,[name]: value});
  };
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name || !price || !quantity){
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
    // window.location.reload(false);
  };
  return (
    <div style={{marginTop:"10px"}}>
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center",}}>
            <label htmlFor='category'>Category</label>
            <select name="category" id="category" onChange={handleInputChange}>
              <option value="Food">Food</option>
              <option value="Drink">Drink</option>
              <option value="Cloth">Cloth</option>
              <option value="Car">Car</option>
              <option value="Phone">Phone</option>
            </select>

            <label htmlFor='name'>Name</label>
            <input 
                type="text"
                id="name"
                name="name"
                placeHolder="Your Name..."
                value={name || ""}
                onChange={handleInputChange}
             />

             <label htmlFor='price'>Price</label>
            <input 
                type="number"
                id="price"
                name="price"
                placeHolder="Your Price..."
                value={price || ""}
                onChange={handleInputChange}
             />

             <label htmlFor='quantity'>Quantity</label>
            <input 
                type="number"
                id="quantity"
                name="quantity"
                placeHolder="Your Quantity..."
                value={quantity || ""}
                onChange={handleInputChange}
             />

              <label htmlFor='img'>Image</label>
            <div className='imgup'>
              <input 
                  type="file"
                  id="img"
                  className='imgs'
                  name="img"
                  placeHolder="Your Image..."
                  value={img || ""}
                  onChange={handleImageChange}
              /><div className='imgss' onClick={uploadImage} >click</div>

            </div>
            <div className='show_img'>
              <img alt="Wait your img before click add product" src={url} width="100%"/>
            </div>
            {url?(
              <button onClick={handleSubmit} className="btn_submit">Add Product</button>
            ):("")}
             
        </form>
    </div>
  )
}

export default AddEdit
