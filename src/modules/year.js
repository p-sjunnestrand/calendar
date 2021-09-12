const Year = (props) => {

    return(
        <h3 className="yearHeader">{props.year.format("YYYY").toString()}</h3>
    )
}

export default Year;