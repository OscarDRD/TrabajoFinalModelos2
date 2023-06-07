import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthProvider from '../components/authProvider.jsx';
import LoadingComponent from '../components/LoadingComponent.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {v4 as uuidv4} from 'uuid';
import './Dashboard.css'
import { getProjects, updateUser, insertNewProject } from "../firebase/firebase.js";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export default function Dashboard(){

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState([]);
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [projects, setProjects] = useState([]);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleInputName(e){
        setNombreProyecto(e.target.value);
    }
    async function handleUserLoggedIn(user){
        setCurrentUser(user);
        setState(2);
        setUsername(user.username)
        const resProjects = await getProjects(user.uid);
        setProjects([...resProjects]);
    }
    function handleUserNotLoggedIn(){
        navigate('/');
    }
    function handleUserNotRegistered(user){
        navigate('/');
    }
    function handSave(){
        addProject();
    }
    async function addProject(){
        if(nombreProyecto !== ''){
            const newProject = {
                id: uuidv4(),
                name: nombreProyecto,
                uid: currentUser.uid,
                data: ''
            };
            const res  = insertNewProject(newProject);
            newProject.docId=res.Id;

            const tmp = currentUser;  
            tmp.username = username;
            tmp.processCompleted = true;
            tmp.last = nombreProyecto;
            tmp.lastid = newProject.id;
            await updateUser(tmp);
            navigate('/lienzo'); 
        }
    }
    function handEditar(){
        navigate('/lienzo'); 
    }

    if(state === 2){
        return(
            <>
                <h1>Hola,{username}</h1>
                <Link to="/signout">Sign out</Link>
                 <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
                    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                    crossorigin="anonymous"
                 />
                <div id="contenedor2">
                <button id="continue-button" onClick={handleShow}>
                </button>
                
                <>
    
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nombre del Proyecto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                        className="username-input"
                        type="text"
                        onChange={handleInputName}
                        placeholder="Ingresa el nombre del proyecto"
                    />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                        </Button>
                        <Button variant="primary" onClick={handSave}>
                        Guardar
                        </Button>
                    </Modal.Footer>
                    </Modal>
                </>
                <div>
                    {projects.map((project) =>(
                        <div key ={project.id}>
                            <Card style={{ width: '18rem' }} className="cartas">
                                <Card.Body>
                                    <Card.Title>{project.name}</Card.Title>
                                    <Button variant="primary" onClick={handEditar}>Editar</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                </div>
            </> 
        );  
    }
    
    return(
        <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotLoggedIn={handleUserNotLoggedIn} onUserNotRegisterted={handleUserNotRegistered}>
            <LoadingComponent/>
        </AuthProvider>
    );
}
