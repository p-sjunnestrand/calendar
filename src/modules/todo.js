const Todo = (props) => {
    return(
        <>
            <h2>Todo</h2>
            <ul>
                {props.deadlines.map(item => {
                    return(
                        <li key={item._id} className="todo"><p>{item.task}</p> <button onClick={() => props.deleteTask(item)}>X</button></li>
                    )
                })}
            </ul>
        </>
    )
}

export default Todo;