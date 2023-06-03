import { useEffect, useState } from "react";
import { auth, userExists,} from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegisterted}) {
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, async (user) =>{
        if(user){
          const isResgistred = await userExists(user.uid);
          if(isResgistred){
            onUserLoggedIn(user); 
          }else{
            onUserNotRegisterted(user);
          }  
          console.log(user.displayName);
        }else{
          onUserNotLoggedIn();
        }
    });
}, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegisterted]);

  return <div>{children}</div>;
}
