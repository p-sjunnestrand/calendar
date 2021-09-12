import Day from "./day";
import { useState, useEffect } from "react";

const DaysGrid = (props) => {

    //Get the number of days in current displayed month.
    const daysInMonth = props.days.daysInMonth();
    const [monthlyHolidays, setMonthlyHolidays] = useState([]);

    //Creates array of days based on the number of days in displayed month.
    let daysArray = []
    for(let i = 0; i < daysInMonth; i++) {
        daysArray.push(i);
    }

    //Creates buffer days for the beginning of the month so that the placement of the first day always matches its weekday.
    //It's a bit ugly, but works.
    const firstDay = props.days.startOf("month")
    if(firstDay.isoWeekday() !== 1){
        const pastMonthDays = (firstDay.isoWeekday() -1) * -1;
        for(let i = -1; i >= pastMonthDays; i--){
            daysArray.unshift(i);
        }
    }
    // console.log("daysArray: ", daysArray);
    useEffect(() => {
        
        //Grabs only holidays and nights before holidays from the "holidays"-props and pushes only holidays for current month to state.
        if(props.holidays && props.holidays.length > 0) {
            const newHolidayState = []
            for(let day = 0; day < daysArray.length; day++){
                if(props.holidays[daysArray[day]]){
                    if("helgdag" in props.holidays[daysArray[day]]){
                        newHolidayState.push({date: parseInt(daysArray[day]+1), holiday: props.holidays[daysArray[day]].helgdag})
                    }
                    if("helgdagsafton" in props.holidays[daysArray[day]]){
                        newHolidayState.push({date: parseInt(daysArray[day]+1), holiday: props.holidays[daysArray[day]].helgdagsafton})
                    }
                } 
            }
            setMonthlyHolidays(newHolidayState);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.holidays]);
    
    return (
        <section>

            <ul className="dayGrid">
                {daysArray.map((day) => {
                    return (<Day key={day} day={day} days={props.days} deadlines={props.deadlines} holidays={monthlyHolidays} dayClick={props.dayClick}/>)
                })}
            </ul>
        </section>
    )
}

export default DaysGrid;