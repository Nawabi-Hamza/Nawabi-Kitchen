import React from 'react'
import { useCookies } from 'react-cookie'
import { Link, Outlet,useNavigate } from 'react-router-dom'


export default function Navbar() {
    const [ cookies , setCookies ] = useCookies(["access_token"])
    const navigate = useNavigate()
    const handleLogout = (e)=>{
        e.preventDefault();
        setCookies("access_token","")
        window.localStorage.removeItem("userId")
        navigate("/auth")
    }
  return (
    <div><nav className="navbar  navbar-expand-md navbar-light bg-light">
          <div className="container">
            <img src="https://th.bing.com/th/id/OIP.wWR6MmWMazbtlRKqdxCU0AHaIe?w=152&h=180&c=7&r=0&o=5&dpr=2.5&pid=1.7" alt="" style={{height:"40px" , width:"40px"}} />
            <button className="navbar-toggler d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="collapsibleNavId">
                <ul className="navbar-nav ps-4 ">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/" aria-current="page">Home <span className="visually-hidden">(current)</span></Link>
                    </li>
                    {cookies.access_token? 
                    <li className="nav-item">
                        <Link className="nav-link" to="savePosts">SavePosts</Link>
                    </li>:null
                    }
                    {cookies.access_token? 
                    <li className="nav-item">
                        <Link className="nav-link" to="write">Write</Link>
                    </li>:null
                    }
                    {!cookies.access_token ?
                    <li className="nav-item">
                        <Link className="nav-link" to="auth">Login/SignIn</Link>
                    </li>:
                    <li className="nav-item">
                        <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                    </li>
                    }
                </ul>
            </div>
      </div>
    </nav>
    <Outlet/>
    </div>
  )
}
