import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
    const {userInfo, setUserInfo} = useContext(UserContext);
    useEffect(()=> {
        fetch('http://localhost:4000/profile',{
            credentials:'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, []);

    function logout(){
        fetch('http://localhost:4000/logout',{
            credentials: 'include',
            method:'POST',
        });
        setUserInfo(null);
    }

    const userName = userInfo?.username;
    return (
        <header>
            <Link to="/" className='logo'>MyBlog</Link>
        <nav>
          {userName && (
            <>
                <span>Hello, {userName}!</span>
                <br></br>
                <Link to="/create">Create new post</Link>
                <a onClick={logout}>Logout</a>
            </>
        )} 

          {!userName && (
            <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </>
        )} 
        </nav>
      </header>
    );
}