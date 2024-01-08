const CountryCard = ({ c }) =>
{
    return(
        <div className="container border rounded my-3 py-1" style={{color:'lightblue'}}>
            
            <div className="row">
                <div className="col">
                    <h2>{c.name}</h2>
                </div>
                <div className="col">
                    {c.flag}
                </div>
            </div>
            <center>
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