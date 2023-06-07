import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({ setLineColor, setLineWidth, 
  setLineOpacity }) => {
    const navigate = useNavigate();
    function handleExit(){
      navigate('/dashboard');
    }
    return (
      <div className="Menu">
        <label>Color </label>
        <input
          type="color"
          onChange={(e) => {
            setLineColor(e.target.value);
          }}
        />
        <label>Tamaño </label>
        <input
          type="range"
          min="3"
          max="20"
          onChange={(e) => {
            setLineWidth(e.target.value);
          }}
        />
        <label>Opacidad</label>
        <input
          type="range"
          min="1"
          max="100"
          onChange={(e) => {
            setLineOpacity(e.target.value / 100);
          }}
        />
        <button onClick={handleExit}> Salir</button>
      </div>
    );
  };
    
  export default Menu;