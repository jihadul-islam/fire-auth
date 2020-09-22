import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './config';


firebase.initializeApp(firebaseConfig)
function App() {

const [user,setUser] = useState({
  isSignedIn:false,
  name:'',
  email:'',
  photo:''

});
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignin = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const  {displayName , photoURL , email} =res.user;
      const signedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(signedInUser);
    })
    .catch(err => {

    })
  }
//signOut
  const handleSignOut = () => {
     firebase.auth().signOut
      .than(res => {
        const signOutUser = {
          isSignedIn:false,
          name:'',
          email:'',
          photo:''
        }
        setUser(signOutUser)
      })
      .catch(err =>{

      })
  }
  
  return (
    <div className="App">
    {
      user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
      <button onClick={handleSignin}>Sign in</button>
    
    
    }
      {
        user.isSignedIn &&<div>
           <p>Welcome,{user.name}</p>
          <p>Your email:{user.email}</p>
          <img src={user.photo} alt=""/>
           
           </div>
      }
    </div>
  );
}

export default App;
