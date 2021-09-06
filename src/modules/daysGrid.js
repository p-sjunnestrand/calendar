import Day from "./day";

const DaysGrid = (props) => {

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

    
    
    return (
        <section>
            <ul>
                {daysArray.map((day) => {
                    return (<Day key={day} day={day} days={props.days} dayClick={props.dayClick}/>)
                })}
            </ul>
        </section>
    )
}

export default DaysGrid;