import { useEffect, useState } from "react";
import { Weather } from "./Weather/WeatherAPI";
import { ThemeSwitch } from "./Components/ThemeSwitch/ThemeSwitch";
import './App.css'



function App() {

  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(localStorage.getItem("dark")==="true" ? true : false);

  useEffect(()=>{
    if(checked){
      setTheme("dark");
    } else {
      setTheme("light");
    }
  },[checked])

  function handleChange(e){
    setChecked(e.target.checked);
    if(e.target.checked){
      localStorage.setItem("dark", "true");
    } else {
      localStorage.removeItem("dark");
    }
  }

  return (
    <div id="theme-provider" className={theme}>
      <ThemeSwitch handleChange={handleChange} checked={checked}/>
      <div className="weather-container">
        <Weather/>
      </div>
      
      <footer>Donnée fournie par <a href="https://openweathermap.org">OpenWeatherData</a></footer>
    </div>
    
  );
}

export default App;
