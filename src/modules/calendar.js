import Year from "./year";
import Month from "./month";
import DaysGrid from "./daysGrid";
import DayView from "./dayView";
import { useState } from "react";

const Calendar = (props) => {

    const [chosenDay, setChosenDay] = useState();

    //Opens full view of clicked day.
    const openDay = (param, day) => {
        console.log(day);
        setChosenDay(param);
        props.changeScroll();
    }

    //Closes full view of day.
    const closeDay = () => {
        setChosenDay(undefined);
        props.changeScroll();
    }

    return (
        <article className="calendarArticle">
            <Year year={props.currentMoment}/>
            <Month month={props.currentMoment} addMonth={props.addMonth}/>
            <DaysGrid days={props.currentMoment} deadlines={props.deadlines} holidays={props.holidays} chosenDay={chosenDay} dayClick={openDay}/>
            {chosenDay ? <DayView day={chosenDay} closeDay={closeDay} addNewDeadline={props.addNewDeadline}/> : null}
        </article>
    )
}

export default Calendar;