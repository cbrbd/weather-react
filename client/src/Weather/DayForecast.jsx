import React from 'react';
import { TimeSelector } from './TimeSelector';
import { ForecastReport } from './ForecastReport';

export class DayForecast extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newData: null,
            timeArray: null,
            selectedTime: null,
            displayedData: null,
            city: null
        }
        this.compareDate = this.compareDate.bind(this);
        this.selectTime = this.selectTime.bind(this);

    }    

    selectTime(time){
        // this.setState({selectedTime: time});
        const newData = this.state.newData;
        let newDisplayedData;
        for(let i = 0; i < newData.length; ++i){
            if(newData[i].dt === time){
                newDisplayedData = newData[i];
                break;
            }
        }
        this.setState({
            selectedTime: time,
            displayedData: newDisplayedData
        })
    }

    compareDate(datedt, dayMonth, timezone){
        datedt=(datedt+timezone)*1000;
        datedt = new Date(datedt).getDate();
        return(dayMonth.getDate() === datedt);
    }


    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.day !== this.props.day || this.props.data !== prevProps.data){
            const data = this.props.data.list;
            let newData = [];
            let newTimeArray = [];
            for(let i = 0; i<data.length; ++i){
                if(this.compareDate(data[i].dt, this.props.day, this.props.data.city.timezone)){
                    newData.push(data[i]);
                    newTimeArray.push(data[i].dt);
                }
            }
        
            // this.selectTime(defaultSelectedTime);
            this.setState({
                newData: newData, 
                displayedData: newData[0],
                timeArray: newTimeArray,
                selectedTime: newTimeArray[0],
                city: this.props.data.city
            });
        }
    }

    componentDidMount(){
        if(this.state.newData === null){
            const data = this.props.data.list;
            let newData = [];
            let newTimeArray = [];
            for(let i = 0; i<data.length; ++i){
                if(this.compareDate(data[i].dt, this.props.day, this.props.data.city.timezone)){
                    newData.push(data[i]);
                    newTimeArray.push(data[i].dt);
                }
            }
        
            let defaultSelectedTime = newTimeArray[0];
            // this.selectTime(defaultSelectedTime);
            this.setState({
                newData: newData, 
                displayedData: newData[0],
                timeArray: newTimeArray,
                selectedTime: defaultSelectedTime,
                city: this.props.data.city
            });
            // this.selectTime(defaultSelectedTime);
        }
    }

    render(){
        let displayedData = this.state.displayedData;
        let timeArray = this.state.timeArray;
        return(
            <React.Fragment>
                <div className="forecast-header">
                    {timeArray != null && timeArray.map((time)=>{
                        return(
                        <TimeSelector
                            key={time}
                            time = {time}
                            selectTime = {this.selectTime}
                            selected = {this.state.selectedTime}
                            timezone = {this.props.data.city.timezone}
                        />
                    )})}
                </div>
                {displayedData !== null && (
                    <ForecastReport
                        city = {this.state.city}
                        data = {this.state.displayedData}
                    />
                )}
            </React.Fragment>
        )
    }
}