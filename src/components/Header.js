import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location=useLocation();
console.log(sessionStorage.getItem("Login"));


    useEffect(() => {
        if(location.pathname === "/"){
            setActiveTab("Home")
        }else if(location.pathname === "/add"){
            setActiveTab("AddContact");
        }else if(location.pathname === "/about"){
            setActiveTab("About");
        }
    }, [location]);
  return (
    <div className='header'>
        <p className='logo'>My Shop</p>
        <div className='header-right'>
            <Link to="/">
                <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={()=>setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            {sessionStorage.getItem("Login")!=null?(

                (sessionStorage.getItem("Login") =="vannet123"?(
                    <Link to="/add">
                        <p className={`${activeTab === "AddContact" ? "active" : ""}`} onClick={()=>setActiveTab("AddContact")}>
                            Add Product
                        </p>
                    </Link>
                ):(
                    <Link to="/chat">
                            <p className={`${activeTab === "Chat" ? "active" : ""}`} onClick={()=>setActiveTab("Chat")}>
                                Chat
                            </p>
                    </Link>
                ))
                
            ):(
                <Link to="/login">
                    <p className={`${activeTab === "AddContact" ? "active" : ""}`} onClick={()=>setActiveTab("AddContact")}>
                        Login
                    </p>
                </Link>
            )}
            <Link to="/about">
                <p className={`${activeTab === "About" ? "active" : ""}`} onClick={()=>setActiveTab("About")}>
                    About
                </p>
            </Link>
        </div>
    </div>
  )
}

export default Header