import { Component } from 'react';
import '../styles/NavBar.css';
import { MenuItens } from './MenuItens';


//componente da classe
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '' // Estado para armazenar o termo de pesquisa
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }
    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">UnityHub</h1>
                {/* Barra de navegação e pesquisa */}
                <div className="nav-search">
                    <input 
                        type="text" 
                        placeholder="Pesquisar..." 
                        value={this.state.searchTerm} 
                        onChange={this.handleSearchChange} 
                        className="search-input"
                    />
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                </div>
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