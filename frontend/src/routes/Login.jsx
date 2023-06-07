import Slider from '../components/Slider.jsx';
import { useEffect, useState } from "react";
import './Login.css';
import { auth, userExists } from '../firebase/firebase.js';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import AuthProvider from '../components/authProvider.jsx';
import LoadingComponent from '../components/LoadingComponent.jsx';

/*
  Stages:
  0: initiated
  1: loading
  2: login completed
  3: login but no username
  4: not logged
*/

export default function Login(){
    
    let navigate = useNavigate();
    //const [currentUser, setCurrentUser] = useState(null);
    const [state, setCurrentState] = useState(0);

    /*useEffect(()=>{
        setCurrentState(1);
        onAuthStateChanged(auth, async (user) =>{
            if(user){
                const isResgistred = await userExists(user.uid);
                if(isResgistred){
                    navigate('/dashboard');
                    setCurrentState(2);
                }else{
                    navigate('/choose-username');
                    setCurrentState(3);
                }
                
                console.log(user.displayName);
            }else{
                setCurrentState(4);
                console.log("No esta autenticado...");
            }
        });
    }, [navigate]);*/


    async function handleGoogleLogin(){
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider);

        async function signInWithGoogle(googleProvider){
            try {
                const res = await signInWithPopup(auth, googleProvider);
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }
    }
    function handleUserLoggedIn(user){
        navigate('/dashboard');
    }
    function handleUserNotLoggedIn(){
        setCurrentState(4);
    }
    function handleUserNotRegistered(user){
        navigate('/choose-username');
    }


    if(state === 4){
        return(
            <div>
                <div className="login-container">
                    <div className="login-form">
                        <h2>Paint :)</h2>
                        <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
                    </div>
                </div>
                <Slider/>
            </div> 
        );
    }
    return(
        <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotLoggedIn={handleUserNotLoggedIn} onUserNotRegisterted={handleUserNotRegistered}>
            <LoadingComponent/>
        </AuthProvider>
    );

    

}