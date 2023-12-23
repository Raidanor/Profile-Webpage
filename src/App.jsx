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
        const {data} = await supabase
            .from('countries')
            .select('name')
            .eq('Canada')
        
        setCountries(data);
    }
    


    return(
        <>
            <div>
                Window Width: {windowWidth}
            </div>
            

            <ul>
                {countries.map((country) => (
                <li key={country.name}>{country.name}</li>
                ))}
            </ul>

        </>
    )
}

export default App
