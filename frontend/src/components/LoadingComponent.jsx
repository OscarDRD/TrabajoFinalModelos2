import { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import './LoadingComponent.css';


export default function LoadingComponent(){
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
        setLoading(true);
        setTimeout(() =>{
            setLoading(false)
        }, 8000)
    }, [])

    return (
        <div className='Component'>
            <PacmanLoader
            color={'#FFFFFF'}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
             data-testid="loader"
              />
        </div>
      );
    
}