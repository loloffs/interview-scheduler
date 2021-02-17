import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem 
        key={day.name}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.selectedDay}
        setDay={props.setDay}  
      />
    )
  }) 
  return (
    <ul>{days}</ul>
  )
}

// Our DayList component will take in three props.

// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
