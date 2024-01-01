const CountryCard = ({ c }) =>
{
    return(
        <div className="justify-content-center ">
            <center>
                <h3>{c.name}</h3>
                <a>{c.lan}<br />
                {c.continent}<br /></a>
            </center>
        </div>
    )
}

export default CountryCard;