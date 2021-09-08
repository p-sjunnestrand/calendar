import Day from "./day";
import { useState, useEffect } from "react";

const DaysGrid = (props) => {

    //Get the number of days in current displayed month.
    const daysInMonth = props.days.daysInMonth();
    const [monthlyHolidays, setMonthlyHolidays] = useState([]);

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
    useEffect(() => {
        // console.log(daysArray);
        setMonthlyHolidays([]);
        if(props.holidays) {
            for(const day in daysArray){
                if(daysArray[day] > 0){
                    console.log(daysArray[day]-1);
                    console.log(props.holidays[daysArray[day] -1]);
                    setHolidayState(props.holidays[daysArray[day]-1], day);
                    
                }
            }
        }
        
    }, [props.holidays]);
    
    const setHolidayState = (array, day) => {
        if("helgdagsafton" in array){
            setMonthlyHolidays(prevState => { return [...prevState, {date: parseInt(day), holiday: array.helgdagsafton}]})
        }
        if("helgdag" in array){
            setMonthlyHolidays(prevState => { return [...prevState, {date: parseInt(day), holiday: array.helgdag}]})
        }
    }
    return (
        <section>

            <ul className="dayGrid">
                {daysArray.map((day) => {
                    return (<Day key={day} day={day} days={props.days} holidays={monthlyHolidays ? monthlyHolidays : null} deadlines={props.deadlines}  dayClick={props.dayClick}/>)
                })}
            </ul>
        </section>
    )
}

export default DaysGrid;