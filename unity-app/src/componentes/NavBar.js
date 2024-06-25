import { Component } from 'react';
import '../styles/NavBar.css';
import { MenuItens } from './MenuItens';
import { Link } from 'react-router-dom';


//componente da classe
class Navbar extends Component {
    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">UnityHub</h1>
                <ul className="nav-menu">
                    {MenuItens.map((item, index) =>{
                        return(
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                <i className={item.icone}></i> {item.titulo}</Link>
                            </li>
                        )
                    })}
                    <button>Sign In</button>
                </ul>
                </nav>
        )
    }
}


export default Navbar;