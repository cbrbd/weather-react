import React from 'react';

export class DaySelector extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.selectDay(this.props.day)
    }

    render(){
        const day = this.props.day;
        return(
            <div 
                className="forecast-day-select"
                onClick={this.handleClick}
                style={this.props.selected===day?{backgroundColor:'#0d6efd', color: 'white'}:{}}
            >
                {day.getDate()}/{day.getMonth()+1}
            </div>
        )
    }

}