import { Component } from 'react';
import '../styles/NavBar.css';
import { MenuItens } from './MenuItens';


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
                                <a className={item.cName} href='/'>
                                <i className={item.icone}></i> {item.titulo}</a>
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