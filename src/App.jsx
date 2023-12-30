import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createClient } from "@supabase/supabase-js";

//Components
import CountryCard from './components/CountryCard';

//Pages imports
// import Create from "./pages/Create"

const supabase = createClient("https://siaceazxpjivwwhasjnb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpYWNlYXp4cGppdnd3aGFzam5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzNjEwMDMsImV4cCI6MjAxODkzNzAwM30.-b-nuanq4_M5pJ3DhFS0rfjhEVfriM2z71u-KmtdqB0");



function App()
{
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);

    const handleResize = () =>
    {
        setwindowWidth(window.innerWidth);
    };

    useEffect(() => 
    {
        window.addEventListener('resize', handleResize);

        return () =>
        {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    

    const [countries, setCountries] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => { getCountries();}, [] );

    async function getCountries()
    {
        const {data, error} = await supabase
            .from('countries')
            .select('*')
            .or('lan.neq.English')
            .or('continent.neq.Europe')
            
        if (error)
        {
            setFetchError("Could not fetch data");
            setCountries(null);
            console.log(error);
        }

        if (data)
        {
            setCountries(data);
            setFetchError(null);
        }

    }

    const [deleteID, setDeleteID] = useState();
    
    const deleteRow = async (e) =>
    {
        e.preventDefault();

        console.log("Deleting row " + deleteID);

        const { error } = await supabase
            .from('countries')
            .delete()
            .eq('id', deleteID)

    }

    const [deleteCountry, setDeleteCountry] = useState('');
    
    const deleteName = async (e) =>
    {
        e.preventDefault();

        console.log("Deleting country where name = " + deleteCountry);

        const { error } = await supabase
            .from('countries')
            .delete()
            .eq('name', deleteCountry)

    }


    const [fruit] = ["Apples", "Oranges", "Bananas"];


    return(
        <>
            <div>
                Window Width: {windowWidth}
            </div>
            

            {fetchError && (<p>{fetchError}</p>)}
            {countries &&
                <>
                    {countries.map(country =>

                        <>
                            <CountryCard key={country.id} c={country}/>
                        </>
                    )}
                </>
            }

            <Create />
            <br />

            <form onSubmit={deleteRow}>
                <label htmlFor="deleterow">Row number for deletion</label>
                <input
                    type = "number"
                    id="deleterow"
                    onChange= {(e) => setDeleteID(e.target.value)}
                />
                <button>DELETE!</button>
            </form>

            <form onSubmit={deleteName}>
                <label htmlFor="deletename">Name for deletion</label>
                <input
                    type = "text"
                    id = "deletename"
                    onChange= {(e) => setDeleteCountry(e.target.value)}
                />
                <button>DELETE!</button>
            </form>

            


        </>
    )
}

function Create()
{
    const[id, setId] = useState();
    const[name, setName] = useState('');
    const[lan, setLan] = useState('');
    const[continent, setContinent] = useState('');
    
    const[formError, setFormError] = useState('');
    

    const handleSubmit = async (e) => 
    {
        e.preventDefault();

        if (!id || !name || !lan || !continent)
        {
            setFormError("Please fill in all the fields correctly")
            return
        }

        console.log(name, lan, continent);

        const {data, error} = await supabase
            .from('countries')
            .insert({ id: id, name: name, lan: lan, continent: continent})

        console.log("Success!!!")

        
        

    }


    return(
        <div class="page create">
            <h2>Create</h2>

            <form onSubmit={handleSubmit}>

                <label htmlFor="id">Id:</label>
                <input
                    type="number"
                    id="id"
                    value={id}
                    onChange= {(e) => setId(e.target.value)}
                />

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange= {(e) => setName(e.target.value)}
                />

                <label htmlFor="lan">Language</label>
                <input
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
export default App
