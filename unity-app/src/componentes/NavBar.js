import { Component } from 'react';
import '../styles/NavBar.css';
import { MenuItens } from './MenuItens';
import { Link } from 'react-router-dom';


//componente da classe
class Navbar extends Component {
    state = {clicked:false};
    handleClick = () =>{
        this.setState({ clicked: !this.state.clicked})
    }
    render(){
        return(
            <nav className="NavbarItems">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 className="navbar-logo">UnityHub</h1>
                </Link>
                <div className='menu-icons' onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
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