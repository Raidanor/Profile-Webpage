const CountryCard = ({ c }) =>
{
    return(
        <div className="container border my-3 py-1" style={{color:'lightblue'}}>
            <center>
            <div className="row">
                <center><h2>{c.name}</h2></center>
            </div>

            <div className="row my-3" style={{color:'red'}}>
                <div className="col">
                    {c.lan}
                </div>
                <div className="col">
                    {c.continent}
                </div>
            </div>

            </center>
        </div>
    )
}

export default CountryCard;