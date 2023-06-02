import Slider from '../components/Slider.jsx';
import './Login.css';
import { auth } from '../firebase/firebase.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Login(){
    async function handleGoogleLogin(){
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider);
    }
    async function signInWithGoogle(googleProvider){
        try {
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }
    return (
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