
const Day = (props) => {

    const currentDay = props.days.clone().date(props.day);
    const todaysDeadlines = props.deadlines.filter(item => parseInt(item.day) === props.day);

    let taskList = []
    let extraTasks = 0;

    
    todaysDeadlines.forEach(item => {
        if(taskList.length === 5){
            extraTasks++;
        } else {
            taskList.push(item)
        }
    })   
    
    // console.log(taskList);
    // console.log(extraTasks);
    // console.log("day:", props.day, todaysDeadlines)

    //If a day is not part of the current month, it is greyed out and has no click event.
    return (
        <li id={props.day} className={props.day < 1 ? "lastMonth" : "currentMonth"} onClick={props.day < 1 ? null : () => props.dayClick(currentDay)}>
            <strong>{currentDay.format("D")}</strong>
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