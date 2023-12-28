const CountryCard = ({ c }) =>
{
    return(
        <div>
            <h3>{c.name}    <button>Hello</button></h3>
            <a>{c.lan}<br />
            {c.continent}<br /></a>
        </div>
    )
}

export default CountryCard;