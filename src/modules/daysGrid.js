import Day from "./day";

const DaysGrid = (props) => {

    const daysInMonth = props.days.daysInMonth();

    //Creates array of days based on the number of days in displayed month.
    let daysArray = []
    for(let i = 0; i < daysInMonth; i++) {
        daysArray.push(i + 1);
    }

    //Creates buffer days for the beginning of the month so that the placement of the first day always matches its weekday.
    //It's a bit ugly, but works.
    const firstDay = props.days.startOf("month")
    if(firstDay.isoWeekday() !== 1){
        const pastMonthDays = -1 + firstDay.isoWeekday();
        for(let i = 0; i < pastMonthDays; i++){
            daysArray.unshift(null);
        }
    }
    
    return (
        <section>
            <ul>
                {daysArray.map((day, index) => {
                    //Yeeeeaaaaah, I don't know about this key part, but it works. It is what it is. Take it or leave it.
                    //The -5 part is so that two items get the same key.
                    return (<Day key={day === null ? index -5 : day} id={ day === null ? index : day} day={day}/>)
                })}
            </ul>
        </section>
    )
}

export default DaysGrid;