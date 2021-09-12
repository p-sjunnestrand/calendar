import { useState } from "react";
import moment from "moment";

const Day = (props) => {

    const [todaysMoment] = useState(moment());

    //Gets the deadlines of the current day.
    const currentDay = props.days.clone().date(props.day+1);
    // console.log(currentDay);
    const todaysDeadlines = props.deadlines.filter(item => parseInt(item.day-1) === props.day);

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

    let todaysHoliday = undefined;
    if(props.day > -1){
        todaysHoliday = props.holidays.filter(item => item.date === props.day +1);
        // console.log("todaysHoliday: ", todaysHoliday, "day: ", props.day +1);

    }
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
        <li id={props.day} className={`calendarDay ${props.day < 0 ? "lastMonth" : "currentMonth"}`} onClick={props.day < 0 ? null : () => props.dayClick(currentDay, props.day)}>
            <p className="dayNumber">{currentDay.format("D")}</p>
            {todaysHoliday ? todaysHoliday.length > 0 ? <p className="holiday">{todaysHoliday[0].holiday}</p> : null : null}
            <ul style={todaysDeadlines.length < 1 ? {display:"none"} : null}>
                {deadlinesThisDay}
            </ul>
            {extraTasks > 0 ? <p>+{extraTasks} deadlines</p> : null}
        </li>
    )
}

export default Day;