import React from 'react';

export class ForecastReport extends React.Component{

    constructor(props){
        super(props);
        this.formatDate = this.formatDate.bind(this);
        this.kelvinToCelcius = this.kelvinToCelcius.bind(this);
      }

      kelvinToCelcius(kelvin){
          return Math.floor((kelvin -273.15)*10)/10
      }
    
      formatDate(dateSeconds){
        let date = new Date(dateSeconds * 1000);
        return(date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes())
      }
    
      render(){
        const data = this.props.data;
        const city = this.props.city;
        
        if(data !== null && city !== null){
            return(
                <div className='report'>
                    <div className="report-main">
                        <div className='img-container'>
                            <img title={data.weather[0].description} alt={data.weather[0].icon} src={"http://openweathermap.org/img/wn/"+ data.weather[0].icon + "@4x.png"}/> 
                        </div>
                        <div className="report-temperature">{data.main.temp}°C</div>
                        <div className="report-details standalone">
                            <ul>
                                <li>Vent: {data.wind.speed}m/s</li>
                                <li>Pression: {data.main.pressure}hPa</li>
                                <li>Humidité: {data.main.humidity}%</li>
                                <li>Ressenti {data.main.feels_like}°C</li>
                            </ul>
                        </div>
                    </div>
                </div>

                  
                
              )
        }
        else {
            return(<div>Loading...</div>)
        }
        
      }
}