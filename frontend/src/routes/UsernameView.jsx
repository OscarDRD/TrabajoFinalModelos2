import AuthProvider from '../components/authProvider.jsx';
import LoadingComponent from '../components/LoadingComponent.jsx';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './UsernameView.css';
import { existsUsername, updateUser } from '../firebase/firebase.js';

export default function UsernameView(){
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState([]);
    const [username, setUsername] = useState('');


    function handleUserLoggedIn(user){
        navigate('/dashboard');
    }
    function handleUserNotLoggedIn(){
        navigate('/');
    }
    function handleUserNotRegistered(user){
        setCurrentUser(user);
        setState(3);
    }
    function handleInputUsername(e){
        setUsername(e.target.value);
    }
    async function handleContinue(){
        if(username !== ''){
            const exists = await existsUsername(username);
            console.log("XD")
            if(exists){
                setState(5);
            }else{
                console.log("Actualizar comando");
                const tmp = currentUser; 
                tmp.username = username;
                tmp.processCompleted = true;
                tmp.last = '';
                tmp.lastid = 0;
                await updateUser(tmp);
                navigate('/dashboard');
            }
        }
    }
    if(state === 3 || state === 5){
        return (
            <div className="username-input-container">
              <h1 className="welcome-text">Bienvenido {currentUser.displayName}, por favor escoge tu nombre de usuario</h1>
              {state === 5? <p>El nombre de usuario ya existe, escoge otro :)</p>: ""}
              <input
                className="username-input"
                type="text"
                onChange={handleInputUsername}
                placeholder="Ingresa tu nombre de usuario"
              />
                <button className="continue-button" onClick={handleContinue}>
                    Continuar
                </button>
            </div>
          );
    }
    return(
        <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotLoggedIn={handleUserNotLoggedIn} onUserNotRegisterted={handleUserNotRegistered}>
            <LoadingComponent/>
        </AuthProvider>
    );
}