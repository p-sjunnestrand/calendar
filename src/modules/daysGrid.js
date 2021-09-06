import Day from "./day";

const DaysGrid = (props) => {

    //Get the number of days in current displayed month.
    const daysInMonth = props.days.daysInMonth();

    //Creates array of days based on the number of days in displayed month.
    let daysArray = []
    for(let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
    }

    //Creates buffer days for the beginning of the month so that the placement of the first day always matches its weekday.
    //It's a bit ugly, but works.
    const firstDay = props.days.startOf("month")
    if(firstDay.isoWeekday() !== 1){
        const pastMonthDays = (firstDay.isoWeekday() -2) * -1;
        // console.log(pastMonthDays);
        for(let i = 0; i >= pastMonthDays; i--){
            // console.log(i);
            daysArray.unshift(i);
        }
    }
    // console.log("first day", firstDay.isoWeekday());
    // console.log(daysArray);
    // for(let i = 1; i < 8; i++){
    //    return props.days.clone().isoWeekday(i);
    // }
    
    
    return (
        <section>

            <ul className="dayGrid">
                {daysArray.map((day) => {
                    return (<Day key={day} day={day} days={props.days} deadlines={props.deadlines} dayClick={props.dayClick}/>)
                })}
            </ul>
        </section>
    )
}

export default DaysGrid;