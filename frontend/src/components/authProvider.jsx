import { useEffect, useState } from "react";
import { auth, getUserInfo, registerNewUser, userExists,} from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegisterted}) {
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, async (user) =>{
        if(user){
          const isResgistred = await userExists(user.uid);
          if(isResgistred){
            const userInfo = await getUserInfo(user.uid);
            if(userInfo.processCompleted){
              onUserLoggedIn(userInfo);
            }else{
              onUserNotRegisterted(userInfo);
            }
          }else{
            await registerNewUser({
              uid: user.uid,
              displayName: user.displayName,
              profilePicture: '',
              username: '',
              processCompleted: false,
              last: '',
              lastid: 0
            });
            onUserNotRegisterted(user);
          }  
        }else{
          onUserNotLoggedIn();
        }
        
    });
}, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegisterted]);

  return <div>{children}</div>;
}

