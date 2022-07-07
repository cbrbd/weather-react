import React from 'react';

import { WeatherForecast4Days } from './WeatherForecast4Days';
import { CustomForm } from './CustomForm';
import { WeatherReport } from './WeatherReport';


export class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            exist: false,
            data: null,
            error: null,
            search: localStorage.getItem("city") || "Paris",
            value: '',
            predictionData: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.predictionButtonHandleClick = this.predictionButtonHandleClick.bind(this);
    }

    predictionButtonHandleClick(e){
      e.preventDefault();
      fetch('/api/weather/forecast?city='+ this.state.search)
        .then(function(result){
            return result.json();
        })
        .then(
          (result) => {
            this.setState({
              predictionData: result,
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }

    handleChange(value){
        this.setState({value:value})
    }

    handleClick(e){
        e.preventDefault();
        let city = this.state.value;
        if(city === ''){
          return
        }
        e.preventDefault();
        fetch('/api/weather/current?city='+ city)
        .then(function(result){
            return result.json();
        })
        .then(
          (result) => {
            this.setState({
              exist: true,
              data: result,
              search: city,
              value: '',
              predictionData: null
            });
          },
          
          (error) => {
            this.setState({
              error
            });
          }
        )
    }

    componentDidMount(){
        fetch('/api/weather/current?city=' + this.state.search)
        .then(function(result){
            return result.json();
        })
        .then(
          (result) => {
            this.setState({
              exist: true,
              data: result
            });
          },
          
          (error) => {
            this.setState({
              error
            });
          }
        )
    }

    render(){

        
        if(this.state.data && this.state.data.message){
            return(
              <div 
                className='weather'
              >
                <CustomForm
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  value={this.state.value}
                />
                <h2><strong>{this.state.search}</strong> : This city is not in the database</h2>
                
              </div>)
        }
    
        return(
            <div
              className='weather'
            >
                <CustomForm
                  handleChange = {this.handleChange}
                  handleClick = {this.handleClick}
                  value = {this.state.value}
                />
                {this.state.data !== null && (
                  <React.Fragment>
                    <WeatherReport
                      city = {this.state.search}
                      data = {this.state.data}  
                    />
                    <button
                        className='show-more'
                        onClick={this.predictionButtonHandleClick}
                      >
                        Prédictions pour les 4 prochains jours
                    </button>
                    {this.state.predictionData && (
                      <WeatherForecast4Days
                        city = {this.state.search}
                        data = {this.state.predictionData}
                      />
                    )}
                  </React.Fragment>
                )}
            </div>
        )
    }
}