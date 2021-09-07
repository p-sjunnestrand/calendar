import { useEffect } from "react";

const Day = (props) => {

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
    // useEffect(() => {
    //     if(props.holidays) {
    //         console.log(props.holidays);
    //         // if(helgdag in props.holidays[props.day -1]){
    //         //     console.log(props.holidays[props.day -1].helgdag);
    //         // }
    //     }
    // }, [props.holidays]);
    

    
    //If a day is not part of the current month, it is greyed out and has no click event.
    return (
        <li id={props.day} className={props.day < 1 ? "lastMonth" : "currentMonth"} onClick={props.day < 1 ? null : () => props.dayClick(currentDay)}>
            <strong>{currentDay.format("D")}</strong>
            {/* {todaysHoliday} */}
            {/* {todaysDeadlines.length > 0 ? <h4>Deadlines:</h4> : null} */}
            <ul style={todaysDeadlines.length < 1 ? {display:"none"} : null}>
            {taskList.map(item => {
                return(<li key={item._id} className="dayTask">{item.task}</li>)
            })}
            </ul>
            {extraTasks > 0 ? <p>+{extraTasks} deadlines</p> : null}
        </li>
    )
}

export default Day;