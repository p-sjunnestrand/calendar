const Year = (props) => {

    return(
        <h3>{props.year.format("YYYY").toString()}</h3>
    )
}

export default Year;