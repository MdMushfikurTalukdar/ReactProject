import React from 'react'
import './Navbar.css';

export default function Navbar(props) {
    // const mystyle = { 
    //     backgroundColor : /e3f2fd,
    // };
  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary" >
        <div className="container-fluid">
            <a className="navbar-brand" href="/">{props.platform}</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link" href="/">{props.home}</a>
                    <a className="nav-link" href="/">{props.aboutUs}</a>
                    <a className="nav-link" href="/">{props.login}</a>
                </div>
            </div>
        </div>
    </nav>
  )
}
