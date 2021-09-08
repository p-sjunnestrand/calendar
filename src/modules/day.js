// import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const Day = (props) => {

    const [todaysMoment] = useState(moment());

    //Gets the deadlines of the current day.
    const currentDay = props.days.clone().date(props.day);
    const todaysDeadlines = props.deadlines.filter(item => parseInt(item.day) === props.day);

    //Creates an array that contains max 5 deadlines to be displayed on each day. Any deadlines exceeding that number
    //are added to the extraTask var and displayed as a number.
    let taskList = []
    let extraTasks = 0;

    todaysDeadlines.forEach(item => {
        if(taskList.length === 5){
            extraTasks++;
        } else {
            taskList.push(item)
        }
    });
    
    const todaysHoliday = props.holidays.filter(item => item.date === props.day);
    // console.log(todaysHoliday.holiday);
    // console.log(todaysHoliday[0].holiday);

    const checkDeadline = (day, type) => {
        const calculatedDeadline = parseInt(day) - todaysMoment.format("D");

        if(calculatedDeadline === 0){
            return "sameDay";
        }
        if(calculatedDeadline < 0){
            return "passedDay";
        }
        return "futureDay";
    }
    

    const deadlinesThisDay = taskList.map(item => {
        return(
            <li key={item._id} className={`dayTask ${checkDeadline(item.day)}`}><p>{item.task}</p></li>
        )
    })
    //If a day is not part of the current month, it is greyed out and has no click event.
    return (
        <li id={props.day} className={`calendarDay ${props.day < 1 ? "lastMonth" : "currentMonth"}`} onClick={props.day < 1 ? null : () => props.dayClick(currentDay)}>
            <p className="dayNumber">{currentDay.format("D")}</p>
            {todaysHoliday.length > 0 ? <p>{todaysHoliday[0].holiday}</p> : null}
            <ul style={todaysDeadlines.length < 1 ? {display:"none"} : null}>
                {deadlinesThisDay}
            {/* {taskList.map(item => {
                return(<li key={item._id} className="dayTask">{item.task}</li>)
            })} */}
            </ul>
            {extraTasks > 0 ? <p>+{extraTasks} deadlines</p> : null}
        </li>
    )
}

export default Day;