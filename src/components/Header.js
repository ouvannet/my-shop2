import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location=useLocation();
console.log(localStorage.getItem("login"));


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
        <p className='logo'>Contact App</p>
        <div className='header-right'>
            <Link to="/">
                <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={()=>setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            {sessionStorage.getItem("login")=="123"?(
                <Link to="/add">
                    <p className={`${activeTab === "AddContact" ? "active" : ""}`} onClick={()=>setActiveTab("AddContact")}>
                        Add Contact
                    </p>
                </Link>
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