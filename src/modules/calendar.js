import Year from "./year";
import Month from "./month";
import DaysGrid from "./daysGrid";
import DayView from "./dayView";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Calendar = (props) => {

    const [chosenDay, setChosenDay] = useState();
    const [holidays, setHolidays] = useState();
    // const [deadlines, setDeadlines] = useState([]);

    //Fetches holiday API and sets data as state whenever displayed month i changed.
    useEffect(() => {
        const year = props.currentMoment.format('YYYY');
        const month = props.currentMoment.format('MM');
        console.log(`http://sholiday.faboul.se/dagar/v2.1/${year}/${month}`);
        fetch(`http://sholiday.faboul.se/dagar/v2.1/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.dagar);
            setHolidays(data.dagar);
        });
    }, [props.currentMoment]);

    //Opens full view of clicked day.
    const openDay = (param) => {
        setChosenDay(param);
        props.changeScroll();
    }

    //Closes full view of day.
    const closeDay = () => {
        setChosenDay(undefined);
        props.changeScroll();
    }

    // const addNewDeadline = (param) => {
    //     setDeadlines([...deadlines, param])
    // }

    return (
        <>
            <Year year={props.currentMoment}/>
            <Month month={props.currentMoment} addMonth={props.addMonth}/>
            <DaysGrid days={props.currentMoment} deadlines={props.deadlines} chosenDay={chosenDay} holidays={holidays ? holidays : null} dayClick={openDay}/>
            {chosenDay ? <DayView day={chosenDay} closeDay={closeDay} addNewDeadline={props.addNewDeadline}/> : null}
        </>
    )
}

export default Calendar;