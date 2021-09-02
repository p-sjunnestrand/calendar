

function Month(props) {
    
    return(
        <div>
            <h2>{props.month.format("MMMM").toString()}</h2>
            <button id="minus" onClick={ () => props.addMonth(-1) }>–</button>
            <button id="plus" onClick={ () => props.addMonth(+1) }>+</button>
        </div>
    )
}

export default Month;