import { useState } from "react";
import moment from "moment";

const Todo = (props) => {

    const [todaysMoment] = useState(moment());

    // console.log("sorted deadlines: ", props.deadlines);

    // Gives each deadline in list different text & className based on whether the deadline has passed or not.
    const checkDeadline = (day, type) => {
        const calculatedDeadline = parseInt(day) - todaysMoment.format("D");

        if(type === "content"){
            if(calculatedDeadline === 0){
                return "today!"
            }
            if(calculatedDeadline < 0){
                return calculatedDeadline * -1 + " days ago.";
            }
            return "in " + calculatedDeadline + " days.";
        } else {
            if(calculatedDeadline === 0){
                return "sameDay";
            }
            if(calculatedDeadline < 0){
                return "passedDay";
            }
            return "futureDay";
        }
    }

    const deadlinesThisMonth = props.deadlines.map(item => {
        return(
            <li key={item._id} className={`todo ${checkDeadline(item.day)}`}><p>{item.task}</p> <p>Deadline {checkDeadline(item.day, "content")}</p><button onClick={() => props.deleteTask(item)}>X</button></li>
        )
    })
    return(
        <article className="deadlinesArticle">
            <h2>Deadlines</h2>
            <ul>
                {deadlinesThisMonth}
                {/* {props.deadlines.map(item => {
                    return(
                        <li key={item._id} className="todo"><p>{item.task}</p> <p>Deadline in {parseInt(item.day) - todaysMoment.format("D")}</p><button onClick={() => props.deleteTask(item)}>X</button></li>
                    )
                })} */}
            </ul>
        </article>
    )
}

export default Todo;