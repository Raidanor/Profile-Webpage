import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createClient } from "@supabase/supabase-js";

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

    useEffect(() => { getCountries();}, [] );

    async function getCountries()
    {
        const {data, error} = await supabase
            .from('countries')
            .select('*')
            .or('lan.neq.English')
            .or('continent.eq.Europe')
            
            
        
        setCountries(data);
    }


    const [fruit] = ["Apples", "Oranges", "Bananas"];


    return(
        <>
            <div>
                Window Width: {windowWidth}
            </div>
            

            {/* <ol>
                {countries.map((country) => (
                <li key={country.id}>{country}</li>
                ))}
            </ol> */}
            
            <div>
                {fruit.map((f) => <li>{f}</li>)}
            </div>
            

            {/* <form className="login-form" onSubmit={(c) => addCountry(c)}>
                <input name="country" type="text" placeholder="country" />
                <button className="button" type="submit">Submit</button>
            </form> */}



        </>
    )
}

export default App
