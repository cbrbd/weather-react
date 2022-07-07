import React from 'react';

export class WeatherReport extends React.Component{
    constructor(props){
      super(props);
      this.formatDate = this.formatDate.bind(this);
      this.setDefaultLocation = this.setDefaultLocation.bind(this);
      this.removeLocalStorage = this.removeLocalStorage.bind(this);
    }
  
    setDefaultLocation(){
      localStorage.setItem('city', this.props.city);
    }

    removeLocalStorage(){
      localStorage.removeItem('city');
    }

    formatDate(dateSeconds){
      let date = new Date(dateSeconds * 1000);
      return(date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes())
    }
  
    render(){
      const data = this.props.data;
      return(
        <div>
          <h1 className='report-title'>Météo à {this.props.city} <img alt={data.sys.coutry} src={"https://flagcdn.com/w40/"+ data.sys.country.toLowerCase() + ".png"}/>
          <div className='icon-wrapper'>
            <svg
              onClick={this.setDefaultLocation}
              title="épingler cette localisation"
              className='icon pin-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M32 32C32 14.33 46.33 0 64 0H320C337.7 0 352 14.33 352 32C352 49.67 337.7 64 320 64H290.5L301.9 212.2C338.6 232.1 367.5 265.4 381.4 306.9L382.4 309.9C385.6 319.6 383.1 330.4 377.1 338.7C371.9 347.1 362.3 352 352 352H32C21.71 352 12.05 347.1 6.04 338.7C.0259 330.4-1.611 319.6 1.642 309.9L2.644 306.9C16.47 265.4 45.42 232.1 82.14 212.2L93.54 64H64C46.33 64 32 49.67 32 32zM224 384V480C224 497.7 209.7 512 192 512C174.3 512 160 497.7 160 480V384H224z"/>
            </svg>
            <svg
              onClick={this.removeLocalStorage}
              title="supprimer cette localisation"
              className='icon trash-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/>
            </svg>
          </div> 
          
          </h1>
          <div className="report">
            <div className="report-main">
              <div className="img-container">
              <img title={data.weather[0].description} alt={data.weather[0].icon} src={"http://openweathermap.org/img/wn/"+ data.weather[0].icon + "@4x.png"}/>
              </div>
              
  
              <div className="report-temperature">{data.main.temp}°C</div>
  
              <div className="report-details">
                <ul>
                  <li>Vent: {data.wind.speed}m/s</li>
                  <li>Pression: {data.main.pressure}hPa</li>
                  <li>Humidité: {data.main.humidity}%</li>
                  <li>Ressenti {data.main.feels_like}°C</li>
                </ul>
              </div>
              <div className="report-sun">
                <div>Levé de Soleil: {this.formatDate(data.sys.sunrise)}</div>
                <div>Couché de soleil: {this.formatDate(data.sys.sunset)}</div>
            </div>
              
  
            </div> 
               
          </div>
          
        </div>
      )
    }
  }
  