
const Day = (props) => {

    const currentDay = props.days.clone().date(props.day)

    
    return (
        <li id={props.day} className={props.day < 1 ? "lastMonth" : "currentMonth"} onClick={() => props.dayClick(currentDay)}>{currentDay.format("D")}</li>
    )
}

export default Day;