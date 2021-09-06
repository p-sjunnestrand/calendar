import Calendar from "./calendar";

const CalendarView = (props) => {
    return (
        <section>
            <Calendar currentMoment={props.currentMoment} addMonth={props.addMonth}/>
            {/* <NewTodo/> */}
        </section>
    )
}

export default CalendarView;