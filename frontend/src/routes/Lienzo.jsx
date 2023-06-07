import { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu.jsx";
import "./Lienzo.css";
import { useNavigate } from "react-router-dom";
import AuthProvider from '../components/authProvider.jsx';
import LoadingComponent from '../components/LoadingComponent.jsx';
import { getProject, updateProject } from "../firebase/firebase.js";

export default function Lienzo(){
   const navigate = useNavigate();
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(0.1);
    const [canvasData, setCanvasData] = useState('');
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState([]);
    const [project, setProject] = useState([]);
    const [username, setUsername] = useState('');

    function handleUserLoggedIn(user){
      setCurrentUser(user);
      setState(2);
      setUsername(user.username);
   }
    function handleUserNotLoggedIn(){
        navigate('/');
    }
    function handleUserNotRegistered(user){
        navigate('/');
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);
    
    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
          e.nativeEvent.offsetX, 
          e.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };
    
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
      };

      const draw = (e) => {
        if (!isDrawing) {
          return;
        }
        ctxRef.current.lineTo(
          e.nativeEvent.offsetX, 
          e.nativeEvent.offsetY
        );
          
        ctxRef.current.stroke();
    };
    async function saveCanvas() {
      const laaast= await getProject(currentUser.lastid);
      setProject(laaast);

     const canvas = canvasRef.current;
     const dataURL = canvas.toDataURL();
      setCanvasData(dataURL);
      const tmp = project; 
      tmp.data=canvasData;
      console.log(canvasData);
      await updateProject(tmp);
    }

    async function loadCanvas() {
      const laaast = await getProject(currentUser.lastid);
      if (laaast && laaast.data) {
        setProject(laaast);
        setCanvasData(laaast.data);
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const loadImage = new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => {
            resolve(image);
          };
          image.onerror = (error) => {
            reject(error);
          };
          image.src = laaast.data;
        });
    
        loadImage.then((image) => {
          context.drawImage(image, 0, 0, 1280, 700);
        }).catch((error) => {
          console.error('Error al cargar la imagen:', error);
        });
      }
    }
    
      return(
        
        <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotLoggedIn={handleUserNotLoggedIn} onUserNotRegisterted={handleUserNotRegistered}>
        <div className="App">
          <h1> {currentUser.last} </h1>
          <div className="draw-area">
            <Menu
              setLineColor={setLineColor}
              setLineWidth={setLineWidth}
              setLineOpacity={setLineOpacity}
            />
            <canvas
              onMouseDown={startDrawing}
              onMouseUp={endDrawing}
              onMouseMove={draw}
              ref={canvasRef}
              width={`1280px`}
              height={`700px`}
            />
            <button onClick={saveCanvas}> Guardar</button>
            <button onClick={loadCanvas}> Cargar</button>
          </div>
        </div>
        </AuthProvider>
      );

}