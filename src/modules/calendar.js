import Year from "./year";
import Month from "./month";
import DaysGrid from "./daysGrid";
import DayView from "./dayView";
import { useState } from "react";

const Calendar = (props) => {

    const [chosenDay, setChosenDay] = useState();
    // const [deadlines, setDeadlines] = useState([]);

    //Opens full view of clicked day.
    const openDay = (param) => {
        setChosenDay(param);
        props.changeScroll();
    }
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
            <DaysGrid days={props.currentMoment} deadlines={props.deadlines} chosenDay={chosenDay} dayClick={openDay}/>
            {chosenDay ? <DayView day={chosenDay} closeDay={closeDay} addNewDeadline={props.addNewDeadline}/> : null}
        </>
    )
}

export default Calendar;