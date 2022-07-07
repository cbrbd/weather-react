import React from "react";
import { DaySelector } from "./DaySelector";
import { DayForecast } from './DayForecast';

export class WeatherForecast4Days extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      availableDays: null
    }
    this.selectDay = this.selectDay.bind(this);
  }

  selectDay(day){
    this.setState({selected: day})
  }

  componentDidMount(){
    let currentTime = new Date();
    let availableDays=[];
    for(let i = 1; i<5; ++i){
      availableDays.push(new Date(currentTime.getTime()+(i*24*60*60*1000)))
    }
    if(this.state.selected === null || this.state.availableDays === null){
      this.setState({
        selected: availableDays[0],
        availableDays: availableDays
      })
    }
  }

  render(){
    let availableDays = this.state.availableDays; 
    return(
      <div className="container">
          <div className="forecast-header">
          {availableDays !== null && availableDays.map((day)=>{
            return(
                <DaySelector
                  key={day}
                  day={day}
                  selectDay={this.selectDay}
                  selected={this.state.selected}
                />
            )
          })}
        </div>
        {this.state.selected !== null && (
          <DayForecast
            day={this.state.selected}
            data={this.props.data}
          />
        )}
      </div>  
    )
  }
}
