const CountryCard = ({ c }) =>
{
    return(
        <div>
            <h3>{c.name}</h3>
            {c.lan}<br />
            {c.continent}<br />
        </div>
    )
}

export default CountryCard;