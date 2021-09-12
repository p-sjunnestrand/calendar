import Form from "./form";

const DayView = (props) => {

    const todaysDeadlines = props.deadlines.filter(item => parseInt(item.day-1) === props.day);

    return (
        <article id="dayViewBackground">
            <div id="dayViewWrapper">
                <h2>{props.day.format("dddd MMMM Do")}</h2>
                <h3>Deadlines</h3>

                <ul>
                    {todaysDeadlines.map(item => {
                        return (
                            <li key={item._id}>{item.task}</li>
                        )
                    })}
                </ul>

                <Form addNewDeadline={props.addNewDeadline} date={props.day}/>
                <button onClick={props.closeDay}>Close</button>
            </div>
        </article>
    )
}

export default DayView;