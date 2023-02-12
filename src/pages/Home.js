import React,{useState,useEffect} from 'react';
import axios from "axios";
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
// import Telegram from 'telegram-send-message';
// import {Link} from "telegram-send-message";
import "./Home.css";
import {set} from "firebase/database";
import {toast} from "react-toastify";


const Home = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location=useLocation();
  const [data, setData]=useState({});
  const [disable, setDisable]=React.useState(false);
  const [count,setCount]=useState(0);
  const [total,settotal]=useState(0);
  const [state, setState]=React.useState([]);
  const [arr, setArr] = React.useState([]);
  const [newrandom,setNewrandom]=useState();
  console.log(state);

  const boots=(tota)=>{
    axios({
      method: 'post',
      url: `https://api.telegram.org/bot5757025610:AAEUWeXpkq2HtgP_kRh_xJqbMmlRaVQREXQ/sendMessage`,
      data:{chat_id:-825548717,text: "\nTotal=> "+tota},
    })
    
  }
//   useEffect(() => {
//     if(location.pathname === "/"){
//         setActiveTab("Home")
//     }else if(location.pathname === "/add"){
//         setActiveTab("AddContact");
//     }else if(location.pathname === "/about"){
//         setActiveTab("About");
//     }
// }, [location]);

  window.onbeforeunload = function(e){
    localStorage.clear();
  };
  console.log("data");
  console.log(data);

  const handleIncrement=(pri,id,name,quan,cou,url)=>{
    setCount(count+1);
    var pri=parseInt(pri);
    console.log(pri);
    
    var gget=localStorage.getItem(url);
    var vall=parseInt(gget);
    if(vall>=0){
      
    }else{
      vall=0;
      
    }
    localStorage.setItem(url, vall+=1);
    
    const initialState = {
      count: 1,
      name: name,
      price: pri,
      quantity: 1,
      url:url,
    }
    
    setState({...state, initialState});
    console.log(pri);
    settotal(total+pri);
    console.log(total);
    var arrr=initialState;
    console.log(arrr.name);
    console.log(arrr.price);

    arr.push(initialState);

    console.log(`price/${id}`);
    // fireDb.child(`price/${id}`).set(initialState, (err) => {
    //   if(err){
    //     toast.error(err);
    //     alert();
    //   }else{
      //     toast.success("Contact Added Successfully");
    //   }
    // });
  }
      console.log(state);
      console.log(arr);
      localStorage.setItem("buypro",JSON.stringify(arr));
      console.log(arr[1]);
  const handleDecrement=(pri,id,name,quan,cou,url)=>{
    setCount(count-1);
    var pri=parseInt(pri);

    var gget=localStorage.getItem(url);
    var vall=parseInt(gget);
    if(vall>=0){
      
    }else{
      vall=0;
      
    }
    localStorage.setItem(url, vall-=1);

    settotal(total-pri)

    for (let i = 0; i < arr.length; i++) {
      if(arr[i].name==name){
        
        console.log(arr[i]);
        arr.splice(i,1);
        

        break;
      }
      
    }
    console.log(`price/${id}`);
    // console.log(initialState);
    // fireDb.child(`price/${id}`).set(initialState, (err) => {
    //   if(err){
    //     toast.error(err);
    //     alert();
    //   }else{
    //     toast.success("Contact Added Successfully");
    //   }
    // });
  }
  console.log(total);
  localStorage.setItem("total",total);
  useEffect(()=>{
    fireDb.child("contacts").on("value", (snapshot)=>{
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

  const onDelete=(id)=>{
    if(window.confirm("Are you sure to delete it!")){
      fireDb.child(`contacts/${id}`).remove((err)=>{
        if(err){
          toast.error(err)
        }else{
          toast.success("Contact success delete!");
        }
      })
    }
  }

  // var newar=Object.keys(data).map((id, index)=>{

  //   return data[id];  
  //   console.log(data[id]);
  // });
  // console.log(newar);
  // function shuffle(newar) {
  //   var ctr = newar.length, temp, index;
  //   while (ctr > 0) {
  //         index = Math.floor(Math.random() * ctr);
  //         ctr--;
  //         temp = newar[ctr];
  //         newar[ctr] = newar[index];
  //         newar[index] = temp;
  //   }
  //   return newar;
  // }
      
      // var reloadnew=()=>{
        
      //   setNewrandom(shuffle(newar));
      // }
      // console.log(newrandom);
      
      // // data=Object.assign({}, newrandom);
      // console.log(data);
  



  return (
    <div className='out_card'>
      <div className='category'>
        <Link to="/">
          <p className={`cate ${activeTab === "Food" || activeTab === "Home" ? "active" : ""}`} onClick={()=>setActiveTab("Food")}>
            Food
          </p>
        </Link>
        <Link to="/">
          <p className={`cate ${activeTab === "Drink" ? "active" : ""}`} onClick={()=>setActiveTab("Drink")}>
            Drink
          </p>
        </Link>
        <Link to="/">
          <p className={`cate ${activeTab === "Cloth" ? "active" : ""}`} onClick={()=>setActiveTab("Cloth")}>
            Cloth
          </p>
        </Link>
        <Link to="/">
          <p className={`cate ${activeTab === "Car" ? "active" : ""}`} onClick={()=>setActiveTab("Car")}>
            Car
          </p>
        </Link>
        <Link to="/">
          <p className={`cate ${activeTab === "Phone" ? "active" : ""}`} onClick={()=>setActiveTab("Phone")}>
            Phone
          </p>
        </Link>
      </div>

      
      {count !==0 ?(
                  <Link to="/addpay">
                    <button className='btn btn-view' onClick={()=>boots(total)}>{count}= ${total}</button>
                  </Link>
                ): (
                    ""
                )}

            {Object.keys(data).reverse().map((id, index)=>{
              
              return(
              
                <div className='card1' style={{"display":`${(activeTab=="Home")?"":(data[id].category!=activeTab?"none":"")}`}}>
                    <div className='quan1'>{data[id].quantity-localStorage.getItem(data[id].name)}</div><div className='quan2'>{data[id].price} $</div>
                  <div className='card2' style={{"background":`url(${data[id].url})`,"background-size":"cover"}}>
                      {/* <img  height="100%" src={data[id].url}></img> */}
                    </div>
                    <span>{data[id].name}</span><br />
                    <div className='f-btn'>
                      {localStorage.getItem(data[id].url)< parseInt(data[id].quantity) ?(
                        <button className='btn btn-view' onClick={() => handleIncrement(data[id].price,id,data[id].name,data[id].quantity,data[id].count,data[id].url)} >+</button>
                      ): (
                        ""
                      )}
                      {localStorage.getItem(data[id].url)>0 ?(
                          <button className='btn btn-view' onClick={() => handleDecrement(data[id].price,id,data[id].name,data[id].quantity,data[id].count,data[id].url)}>-</button>
                      ): (
                          ""
                      )}
                  </div>
                </div>
              )

            })}
    </div>
  )
}

export default Home