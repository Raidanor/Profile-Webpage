import { useState } from 'react';


const Create = () =>
{
    const[name, setName] = useState('');
    const[lan, setLan] = useState('');
    const[continent, setContinent] = useState('');
    
    const[formError, setFormError] = useState('');
    

    const handleSubmit = async (e) => 
    {
        e.preventDefault();

        if (!name || !lan || !continent)
        {
            setFormError("Please fill in all the fields correctly")
            return
        }

        

    }


    return(
        <div class="page create">
            <h2>Create</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange= {(e) => setName(e.target.value)}
                />

                <label htmlFor="lan">Language</label>
                <textarea
                    id="lan"
                    value={lan}
                    onChange= {(e) => setLan(e.target.value)}
                />

                <label htmlFor="continent">Continent:</label>
                <input
                    type="text"
                    id="continent"
                    value={continent}
                    onChange= {(e) => setContinent(e.target.value)}
                />

                <button>Add country to table</button>

                {formError && <p>{formError}</p>}
            </form>

        </div>
    )
}

export default Create;