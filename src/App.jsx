import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import './App.css'

import { createClient } from "@supabase/supabase-js";

//Components
import CountryCard from './components/CountryCard';
import Navbar from './components/Navbar';


// React Router import
import { BrowserRouter, Route, Routes } from "react-router-dom"


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
            .eq('continent', 'Europe')
            
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

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Creating routing


    
   

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    return(
        <BrowserRouter>
            <Navbar />
            <div className='d-flex justify-content-center'>
                Window Width: {windowWidth}
            </div>

            <Routes>
                <Route exact path="" element={<Home fetchError={fetchError} countries={countries}/>}/>
                <Route exact path="/" element={<Home fetchError={fetchError} countries={countries}/>}/>
                <Route exact path="/Europe" element = {<QuizEurope />} />
                <Route exact path="/English" element = {<QuizEnglish />} />
                <Route exact path="/CustomQuiz" element = {<Custom />} />
                
                
            </Routes>
            <MyComponent />
        </BrowserRouter>
    )
}

// ---------------------------------------------------------------------------------------------------------------------------------------
// Components
export const MyComponent = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  )



function Home(props)
{
    return(
        <>
            {props.fetchError && (<p>{props.fetchError}</p>)}
            {props.countries &&
                <>
                    <div class="container-fluid">
                        <div class="row d-flex">
                            {props.countries.map(country =>
                                <div class="col-4">
                                <CountryCard key={country.id} c={country}/>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            }
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

function QuizEurope()
{
    return(
        <>
            <center><h1>Enter as many countries as you can that are in Europe</h1></center>
            <QuizCustom param1="continent" param2="Europe" />
        </>
    )
}

function QuizEnglish()
{
    return(
        <>
            <center><h1>Enter as many countries as you can that have english as their official language</h1></center>
            <QuizCustom param1="lan" param2="English" />
        </>
    )
}
function Custom()
{
    return(
        <>
            <center><h1>Want to make your own Quiz?</h1></center>
            <h3>Enter your parameters</h3>
            <QuizCustom param1="lan" param2="English" />
        </>
    )
}

function QuizCustom( props )
{
    const [list, setList] = useState([]);
    const [found, setFound] = useState([]);
    

    useEffect(() => { InitialiseList()}, [] );

    async function InitialiseList()
    {
        const {data, error} = await supabase
            .from('countries')
            .select()
            .or(props.param1 + '.eq.' + props.param2);
        setList(data);
    }

    const [answer, setAnswer] = useState('');
    const handleQuiz = async(e) =>
    {
        e.preventDefault();

        GetAnswer(answer);

        event.target.reset();
    }

    async function GetAnswer(n)
    {
        var flag = false;
        var index = -1;

        //checking through found array before looking it up in the listt array
        for (var i = 0; i < found.length; ++i)
        {
            if (found[i].name == n)
            {
                console.log(found[i].name + " has already been found");
                return;
            }
        }

        //going through list to find a matching country name
        //flag is flipped if found
        for (var i = 0; i < list.length; ++i)
        {
            if (list[i].name == n)
            {
                flag = true;
                index = i;

                setScore(score + 1);
            }
        }

        //if found, item is added to a array "found" and then removed
        if (flag)
        {
            console.log("Correct");
            setFound( previous =>[...previous, list[index]])

            if (index > -1)
            {
                setList(list.filter(item => item.name !== n));
            }   
        }
        else {   console.log("Incorrect! Try again!");   }
    }

    const [score, setScore] = useState(0);

    return(
        <>
            <div className="container">
                <div className="row justify-content-center quiz-title">
                    <div className="col-6">
                        <center>
                            <form onSubmit={handleQuiz}>
                                <label htmlFor="quiz">Enter Name &nbsp;</label>
                                <input
                                    id="quiz"
                                    type = "text"
                                    onChange= {(e) => setAnswer(e.target.value)}
                                />
                                <button>GO!</button>
                            </form>
                        </center>
                    </div>
                </div>
            </div>

            {/* displaying the list of found countries */}
            {found &&
                <>
                    <div class="container-fluid">
                        <div class="row d-flex">
                            {found.map(f =>
                                <div class="col-4">
                                <CountryCard key={f.id} c={f}/>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            }
            <div className='align-bottom'>
                <h3>Score = {score}</h3>
            </div>
        </>
    )    
}


export default App;