import { useState } from "react";

const Form = (props) => {

    // console.log(props.date);

    const [taskInput, setTaskInput] = useState();

    const handleChange = (e) => {setTaskInput(e.target.value);}

    const addTask = (e) => {
        e.preventDefault();
        const newDeadline = {
            task: taskInput,
            day: props.date.format("D"),
        }
        props.addNewDeadline(newDeadline, props.date.format("YYYYMM"));
    }

    return(
        <form onSubmit={addTask}>
            <h3>Add a new deadline for this day:</h3>
            <label>Task
                <input onChange={handleChange}/>
            </label>
            <button type="submit">Add</button>
        </form>
    )
}

export default Form;