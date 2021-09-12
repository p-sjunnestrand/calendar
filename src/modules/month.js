

function Month(props) {
    
    return(
        <div className="monthDiv">
            <div id="minus" className="changeMonth" onClick={ () => props.addMonth(-1) }>&lt;</div>
            <h2>{props.month.format("MMMM").toString()}</h2>
            <div id="plus" className="changeMonth" onClick={ () => props.addMonth(+1) }>&gt;</div>
        </div>
    )
}

export default Month;