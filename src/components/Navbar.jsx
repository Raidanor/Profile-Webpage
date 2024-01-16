import { Link } from "react-router-dom"

function Navbar()
{
    return(

        <>
        <nav class="navbar navbar-expand navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">Navbar</a>

                <div class="collapse navbar-collapse">
                
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page"><Link to="/">Home</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"><Link to="/Europe">Europe Quiz</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"><Link to="/English">English Quiz</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"><Link to="/CustomQuiz">Custom Quiz</Link></a>
                        </li>
                    </ul>
                    {/* <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
            </nav>
        </>
    )
}

export default Navbar;