const CountryCard = ({ c }) =>
{
    return(
        <div>
            <h3>{c.name}</h3>
            <a>{c.lan}<br />
            {c.continent}<br /></a>
        </div>
    )
}

export default CountryCard;