import Form from "./form";

const DayView = (props) => {

    return (
        <article id="dayViewBackground">
            <div id="dayViewWrapper">
                <h2>{props.day.format("dddd MMMM Do")}</h2>
                <h3>Deadlines</h3>

                <ul>
                    
                </ul>

                <Form addNewDeadline={props.addNewDeadline} date={props.day}/>
                <button onClick={props.closeDay}>Close</button>
            </div>
        </article>
    )
}

export default DayView;