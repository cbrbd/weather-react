import React from 'react';

export class TimeSelector extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date, timezone){
        let newDate = new Date((date + timezone)*1000);
        let hours = newDate.getHours() >= 10 ? newDate.getHours() : "0" + newDate.getHours();
        let minutes = newDate.getMinutes() > 10 ? newDate.getMinutes() : "0" + newDate.getMinutes();
        return(hours + ":" + minutes);
    }

    handleClick(){
        this.props.selectTime(this.props.time);
    }

    render(){
        const time = this.props.time;
        const timezone = this.props.timezone;
        // let date = new Date(time)
        return(
            <div 
                className="forecast-day-select"
                onClick={this.handleClick}
                style={this.props.selected===time?{backgroundColor:'#0d6efd', color: 'white'}:{}}
            >
                {/* {new Date(time*1000).getHours()} */}
                {this.formatDate(time, timezone)}
            </div>
        )
    }
}