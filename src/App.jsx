import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createClient } from "@supabase/supabase-js";

//Components
import CountryCard from './components/CountryCard';
import Navbar from './components/Navbar';
import Alpha from './components/Alpha.jsx';


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

    useEffect(() => { getCountries()}, [] );

    async function getCountries()
    {
        const {data, error} = await supabase
            .from('countries')
            .select('*')
            .eq('name', 'France')
            
        if (error)
        {
            setCountries(null);
            setFetchError("Could not fetch data");
        
            console.log(error);
        }

        if (data)
        {
            setCountries(data);
            setFetchError(null);
        }

    }

    
    
    const [answer, setAnswer] = useState('');
    const handleQuiz = async(e) =>
    {
        e.preventDefault();


        GetAnswer(answer);

        setScore(score+1)
    }

    async function GetAnswer(n)
    {
        
        const {data, error} = await supabase
            .from('countries')
            .select('*')
            .or('name.eq.' + n)

        
        
        if (data)
        {
            console.log("Correct!")
            setCountries(data);
        }

        if (error)
        {
            console.log("Not found!")
        }
    }

    const [score, setScore] = useState(0);

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    return(
        
        <div>
            <Navbar />
            <div className='d-flex justify-content-center'>
                Window Width: {windowWidth}
            </div>
            

            {fetchError && (<p>{fetchError}</p>)}
            {countries &&
                <>
                    <div class="container-fluid">
                        <div class="row d-flex">
                            {countries.map(country =>
                                <div class="col-4">
                                <CountryCard key={country.id} c={country}/>
                                </div>

                            )}
                        </div>
                    </div>
                </>
            }


            
            {/* <Create /> */}
            
            <QuizEurope answer={answer} setAnswer={setAnswer} handleQuiz={handleQuiz} score={score}/>
        </div>
    )
}

// ---------------------------------------------------------------------------------------------------------------------------------------

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

function QuizEurope( props )
{

    return(
        <>
            <center><h1>Enter as many countries as you can that are in Europe</h1></center>


            <form onSubmit={props.handleQuiz}>
                <label htmlFor="quiz">Enter Name</label>
                <input
                    id="quiz"
                    type = "text"
                    onChange= {(e) => props.setAnswer(e.target.value)}
                />
                <button>GO!</button>
            </form>

            <h3>Score = {props.score}</h3>
        </>
    )    
}


export default App;